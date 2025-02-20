import { PartialType } from '@nestjs/swagger';
import { CreateAnswerOptionDto } from './create-answer_option.dto';

export class UpdateAnswerOptionDto extends PartialType(CreateAnswerOptionDto) {
    question_id?: number | undefined;
    option_uzb?: string | undefined;
    option_rus?: string | undefined;
}