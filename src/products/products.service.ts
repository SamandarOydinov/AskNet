import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly surveyModel: Model<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    return this.surveyModel.create(createProductDto);
  }

  findAll() {
    return this.surveyModel.find().populate('Client');
  }

  findOne(id: number) {
    return this.surveyModel.findById(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.surveyModel.findByIdAndUpdate(id, updateProductDto);
  }

  remove(id: number) {
    return this.surveyModel.findByIdAndDelete(id);
  }
}
