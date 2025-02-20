import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Question } from '../../questions/schemas/question.schema';

export type AnswerOptionDocument = HydratedDocument<AnswerOption>;

@Schema()
export class AnswerOption {
  @Prop()
  id: number;

  @Prop()
  question_id: number;

  @Prop()
  option_uzb: string;

  @Prop()
  option_rus: string;

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Question' })
  question: Question;
}

export const AnswerOptionSchema = SchemaFactory.createForClass(AnswerOption);
