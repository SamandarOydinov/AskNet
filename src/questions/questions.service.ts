import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
import { Model } from 'mongoose';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<Question>,
  ) {}
  create(createQuestionDto: CreateQuestionDto) {
    return this.questionModel.create(createQuestionDto);
  }

  findAll() {
    return this.questionModel.find();
  }

  findOne(id: number) {
    return this.questionModel.findById(id);
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return this.questionModel.findByIdAndUpdate(id, updateQuestionDto);
  }

  remove(id: number) {
    return this.questionModel.findByIdAndDelete(id);
  }
}
