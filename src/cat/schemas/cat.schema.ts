import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Owner } from '../../owner/schemas/owner.schema';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop({type: mongoose.Schema.ObjectId, ref: "Owner"})
  owner: Owner
}

export const CatSchema = SchemaFactory.createForClass(Cat);
