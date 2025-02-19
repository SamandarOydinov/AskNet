import { Injectable } from '@nestjs/common';
import { CreateSurveyStatusDto } from './dto/create-survey_status.dto';
import { UpdateSurveyStatusDto } from './dto/update-survey_status.dto';

@Injectable()
export class SurveyStatusService {
  create(createSurveyStatusDto: CreateSurveyStatusDto) {
    return 'This action adds a new surveyStatus';
  }

  findAll() {
    return `This action returns all surveyStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} surveyStatus`;
  }

  update(id: number, updateSurveyStatusDto: UpdateSurveyStatusDto) {
    return `This action updates a #${id} surveyStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} surveyStatus`;
  }
}
