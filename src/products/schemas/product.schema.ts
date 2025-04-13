import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Decimal128, HydratedDocument } from 'mongoose';
import { Client } from '../../client/schemas/client.schema';
import { Statistics } from '../../statistics/schemas/statistic.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: bigint;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
