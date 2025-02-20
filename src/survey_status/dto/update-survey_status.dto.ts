import { PartialType } from '@nestjs/swagger';
import { CreateSurveyStatusDto } from './create-survey_status.dto';

export class UpdateSurveyStatusDto extends PartialType(CreateSurveyStatusDto) {
    participant_id?: number | undefined;
    survey_id?: number | undefined;
    status?: string | undefined;
    last_question__id?: number | undefined;
    progress?: string | undefined;
}