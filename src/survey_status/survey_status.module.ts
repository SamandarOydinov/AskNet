import { Module } from '@nestjs/common';
import { SurveyStatusService } from './survey_status.service';
import { SurveyStatusController } from './survey_status.controller';

@Module({
  controllers: [SurveyStatusController],
  providers: [SurveyStatusService],
})
export class SurveyStatusModule {}
