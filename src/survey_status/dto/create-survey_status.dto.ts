export class CreateSurveyStatusDto {
  participant_id: number;
  survey_id: number;
  status: string;
  last_question__id: number;
  progress: string;
}