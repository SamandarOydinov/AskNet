import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Survey } from "../../surveys/schemas/survey.schema";

export type StatisticsDocument = HydratedDocument<Statistics>;

@Schema()
export class Statistics {
  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: "Survey" }] })
  survey: Survey;

  @Prop()
  total_responses: bigint;

  @Prop()
  average_rating: bigint;
}

export const StatisticsSchema = SchemaFactory.createForClass(Statistics);
