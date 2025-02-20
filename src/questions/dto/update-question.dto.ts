import { PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
    survey_id?: number | undefined;
    field_type?: string | undefined;
    questions_rus?: string | undefined;
    questions_uzb?: string | undefined;
    input_method?: string | undefined;
    parent_questions_id?: number | undefined;
    iamge?: string | undefined;
}