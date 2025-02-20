import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Bot } from '../../bot/schemas/bot.schema';
import { Question } from '../../questions/schemas/question.schema';

export type ResponseDocument = HydratedDocument<Response>;

@Schema()
export class Response {
  @Prop()
  id: number;

  @Prop()
  participant_id: number;

  @Prop()
  question_id: number;

  @Prop()
  selected_options: string[];

  @Prop()
  text_response: string;

  @Prop()
  numeric_response: string;

  @Prop()
  iamge: string;

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Bot' })
  bot: Bot;

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Question' })
  question: Question;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);