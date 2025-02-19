import { Injectable } from "@nestjs/common";
import { CreateStatisticDto } from "./dto/create-statistic.dto";
import { UpdateStatisticDto } from "./dto/update-statistic.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Statistics } from "./schemas/statistic.schema";
import { Model } from "mongoose";

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Statistics.name)
    private readonly statisticsModel: Model<Statistics>
  ) {}
  create(createStatisticDto: CreateStatisticDto) {
    return this.statisticsModel.create(createStatisticDto);
  }

  findAll() {
    return this.statisticsModel.find().populate("Survey");
  }

  findOne(id: number) {
    return this.statisticsModel.findById(id);
  }

  update(id: number, updateStatisticDto: UpdateStatisticDto) {
    return this.statisticsModel.findByIdAndUpdate(id, updateStatisticDto);
  }

  remove(id: number) {
    return this.statisticsModel.findByIdAndDelete(id);
  }
}
