import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Bot } from '../../bot/schemas/bot.schema';
import { Survey } from '../../surveys/schemas/survey.schema';

export type SurveyStatusDocument = HydratedDocument<SurveyStatus>;

@Schema()
export class SurveyStatus {
  @Prop()
  id: number;

  @Prop()
  participant_id: number;

  @Prop()
  survey_id: number;

  @Prop()
  status: string;

  @Prop()
  last_question__id: number;

  @Prop()
  progress: string;

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Bot' }] })
  bot: Bot;

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Survey' }] })
  survey: Survey;
}

export const SurveyStatusSchema = SchemaFactory.createForClass(SurveyStatus);