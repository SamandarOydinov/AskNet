import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AnswerOption } from '../../answer_options/schemas/answer_option.schema';
import { Survey } from '../../surveys/schemas/survey.schema';

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
  @Prop()
  id: number;

  @Prop()
  survey_id: number;

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Survey' })
  survey: Survey;

  @Prop()
  field_type: string;

  @Prop()
  questions_rus: string;

  @Prop()
  questions_uzb: string;

  @Prop()
  input_method: string;

  @Prop()
  parent_questions_id: number;

  @Prop()
  iamge: string;

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'AnswerOption' }] })
  answerOptions: AnswerOption[];

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Response' }] })
  responses: Response[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
