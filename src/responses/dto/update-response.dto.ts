import { PartialType } from '@nestjs/swagger';
import { CreateResponseDto } from './create-response.dto';

export class UpdateResponseDto extends PartialType(CreateResponseDto) {
  participant_id?: number | undefined;
  question_id?: number | undefined;
  selected_options?: string[] | undefined;
  text_response?: string | undefined;
  numeric_response?: string | undefined;
  iamge?: string | undefined;
}
