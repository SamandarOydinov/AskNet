import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Payment } from "../../payments/schemas/payment.schema";
import { SurveyStatus } from "../../survey_status/schemas/survey_status.schema";

export type BotDocument = HydratedDocument<Bot>;

@Schema()
export class Bot {
  @Prop()
  user_id: string;

  @Prop()
  user_name: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  phone_number: string;

  @Prop()
  status: boolean;

  @Prop()
  user_lang: string;

  @Prop()
  real_name: string;

  @Prop()
  gender: string;

  @Prop()
  birth_year: string;

  @Prop()
  balance: number;

  @Prop()
  offer_code: string;

  @Prop()
  last_state: string;

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Payment' }] })
  payments: Payment[];

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Response' }] })
  responses: Response[];

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'SurveyStatus' }] })
  surveyStatus: SurveyStatus[];
}

export const BotSchema = SchemaFactory.createForClass(Bot);
