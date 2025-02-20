import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Decimal128, HydratedDocument } from 'mongoose';
import { Client } from '../../client/schemas/client.schema';
import { Statistics } from '../../statistics/schemas/statistic.schema';

export type SurveyDocument = HydratedDocument<Survey>;

@Schema()
export class Survey {
  @Prop()
  title_uzb: string;

  @Prop()
  title_rus: string;

  @Prop()
  description_uzb: string;

  @Prop()
  description_rus: string;

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Client' }] })
  client: Client;

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Statistic' }] })
  payments: Statistics[];

  @Prop()
  location: bigint;

  @Prop()
  radius: bigint;

  @Prop()
  reward_per_participant: string;

  @Prop()
  total_budget: bigint;

  @Prop()
  start_age: bigint;

  @Prop()
  finish_age: bigint;

  @Prop()
  start_date: Date;

  @Prop()
  finish_date: Date;

  @Prop()
  target_lang: string;

  @Prop()
  status: string;
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
