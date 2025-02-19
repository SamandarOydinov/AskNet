import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ClientDocument = HydratedDocument<Client>;

@Schema()
export class Client {
  @Prop()
  full_name: string;

  @Prop()
  company: string;

  @Prop()
  phone_number: number;

  @Prop()
  description: string;
  
}

export const ClientSchema = SchemaFactory.createForClass(Client);
