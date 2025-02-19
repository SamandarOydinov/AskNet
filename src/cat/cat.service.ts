import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './schemas/cat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Owner } from '../owner/schemas/owner.schema';

@Injectable()
export class CatService {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
    @InjectModel(Owner.name) private readonly ownerModel: Model<Owner>,
  ) {}
  async create(createCatDto: CreateCatDto) {

    const {owner: ownerId} = createCatDto
    const owner = await this.ownerModel.findById(ownerId)
    if(!owner){
      throw new BadRequestException("Bunday owner yo'q")
    }
    const cat = await this.catModel.create(createCatDto)
    owner.cats.push(cat)
    owner.save()
    return cat;
  }

  findAll() {
    return this.catModel.find().populate("owner")
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
