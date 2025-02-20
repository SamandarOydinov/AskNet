import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Survey } from '../../surveys/schemas/survey.schema';
import { Bot } from '../../bot/schemas/bot.schema';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment {
  @Prop()
  id: number;

  @Prop()
  survey_id: number;

  @Prop()
  participant_id: number;

  @Prop()
  amount: number;

  @Prop()
  payment_status: boolean;

  @Prop()
  payment_date: Date;

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Survey' }] })
  survey: Survey;
  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Participant' }] })
  participant: Bot;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);