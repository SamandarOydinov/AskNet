import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schemas/admin.schema';
import { Model } from 'mongoose';
import * as bcrypt from "bcrypt"

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;
    if (password !== confirm_password) {
      throw new BadRequestException('Passwordlar mos emas!');
    }
    const hashed_password = await bcrypt.hash(password, 7);

    return this.adminModel.create({ ...createAdminDto, hashed_password });
  }

  async updateRefreshToken(id: any, hashed_token: string | null) {
    const updateAdmin = await this.adminModel.findByIdAndUpdate(id, {
      hashed_token,
    }, {new: true});
    return updateAdmin;
  }

  async findAll() {
    return this.adminModel.find();
  }

  async findOne(id: number) {
    return this.adminModel.findById(id);
  }

  async findByEmail(email: string) {
    return this.adminModel.findOne({ email });
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminModel.findByIdAndUpdate(id, updateAdminDto);
  }

  async remove(id: string) {
    return this.adminModel.findByIdAndDelete(id);
  }
}
