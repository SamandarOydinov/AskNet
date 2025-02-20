export class CreateQuestionDto {
  survey_id: number;
  field_type: string;
  questions_rus: string;
  questions_uzb: string;
  input_method: string;
  parent_questions_id: number;
  iamge: string;
}