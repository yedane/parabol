import {Kysely, PostgresDialect, sql} from 'kysely'
import {Client} from 'pg'
import {r} from 'rethinkdb-ts'
import connectRethinkDB from '../../database/connectRethinkDB'
import getPg from '../getPg'
import getPgConfig from '../getPgConfig'

export async function up() {
  await connectRethinkDB()
  const pg = new Kysely<any>({
    dialect: new PostgresDialect({
      pool: getPg()
    })
  })
  await sql`
  DO $$
  BEGIN
    CREATE TABLE IF NOT EXISTS "PushInvitation" (
      "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      "userId" VARCHAR(100) NOT NULL,
      "teamId" VARCHAR(100) NOT NULL,
      "denialCount" SMALLINT NOT NULL DEFAULT 0,
      "lastDenialAt" TIMESTAMP WITH TIME ZONE,
      CONSTRAINT "fk_userId"
        FOREIGN KEY("userId")
          REFERENCES "User"("id")
          ON DELETE SET NULL,
      CONSTRAINT "fk_teamId"
        FOREIGN KEY("teamId")
          REFERENCES "Team"("id")
          ON DELETE SET NULL
    );
    CREATE INDEX IF NOT EXISTS "idx_PushInvitation_userId" ON "PushInvitation"("userId");
    CREATE INDEX IF NOT EXISTS "idx_PushInvitation_teamId" ON "PushInvitation"("teamId");
  END $$;
`.execute(pg)

  const rRequests = await r.table('PushInvitation').coerceTo('array').run()

  await Promise.all(
    rRequests.map(async (row) => {
      const {userId, teamId, denialCount, lastDenialAt} = row
      try {
        return await pg
          .insertInto('PushInvitation')
          .values({
            userId,
            teamId,
            denialCount,
            lastDenialAt
          })
          .execute()
      } catch (e) {
        if (e.constraint === 'fk_teamId') {
          console.log(`Skipping ${row.id} because it has no valid teamId`)
          return
        }
        if (e.constraint === 'fk_userId') {
          console.log(`Skipping ${row.id} because it has no valid userId`)
          return
        }
        console.log(e, row)
      }
    })
  )
}

export async function down() {
  const client = new Client(getPgConfig())
  await client.connect()
  await client.query(`
    DROP TABLE IF EXISTS "PushInvitation";
    ` /* Do undo magic */)
  await client.end()
}
