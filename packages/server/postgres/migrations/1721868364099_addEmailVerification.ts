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
    CREATE TABLE "EmailVerification" (
      "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      "email" "citext" NOT NULL,
      "expiration" TIMESTAMP WITH TIME ZONE NOT NULL,
      "token" VARCHAR(100) NOT NULL,
      "hashedPassword" VARCHAR(100),
      "invitationToken" VARCHAR(100),
      "pseudoId" VARCHAR(100)
    );

    CREATE INDEX IF NOT EXISTS "idx_EmailVerification_email" ON "EmailVerification"("email");
    CREATE INDEX IF NOT EXISTS "idx_EmailVerification_token" ON "EmailVerification"("token");
  `.execute(pg)

  const rData = await r.table('EmailVerification').coerceTo('array').run()
  const insertData = rData.map((row) => {
    const {email, expiration, hashedPassword, token, invitationToken, pseudoId} = row
    return {
      email,
      expiration,
      hashedPassword,
      token,
      invitationToken,
      pseudoId
    }
  })
  if (insertData.length === 0) return
  await pg.insertInto('EmailVerification').values(insertData).execute()
}

export async function down() {
  const client = new Client(getPgConfig())
  await client.connect()
  await client.query(`
    DROP TABLE IF EXISTS "EmailVerification";
  `)
  await client.end()
}