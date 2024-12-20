import {getTeamPromptResponsesByMeetingId} from '../../../postgres/queries/getTeamPromptResponsesByMeetingIds'
import {TeamPromptMeeting} from '../../../postgres/types/Meeting'
import OpenAIServerManager from '../../../utils/OpenAIServerManager'
import {DataLoaderWorker} from '../../graphql'
import canAccessAISummary from './canAccessAISummary'

const generateStandupMeetingSummary = async (
  meeting: TeamPromptMeeting,
  dataLoader: DataLoaderWorker
) => {
  const [facilitator, team] = await Promise.all([
    dataLoader.get('users').loadNonNull(meeting.facilitatorUserId!),
    dataLoader.get('teams').loadNonNull(meeting.teamId)
  ])
  const isAISummaryAccessible = await canAccessAISummary(
    team,
    facilitator.id,
    'standup',
    dataLoader
  )

  if (!isAISummaryAccessible) return
  const responses = await getTeamPromptResponsesByMeetingId(meeting.id)

  const contentToSummarize = responses.map((response) => response.plaintextContent)
  if (contentToSummarize.length === 0) return

  const manager = new OpenAIServerManager()
  const summary = await manager.getStandupSummary(contentToSummarize, meeting.meetingPrompt)
  if (!summary) return
  return summary
}

export default generateStandupMeetingSummary
