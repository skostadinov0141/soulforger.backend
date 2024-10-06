import { Injectable } from '@nestjs/common';
import { CreateRulebookDto } from './dto/create-rulebook.dto';
import { UpdateRulebookDto } from './dto/update-rulebook.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Rulebook } from './entities/rulebook.entity';
import { Model } from 'mongoose';

@Injectable()
export class RulebookService {
  constructor(
    @InjectModel(Rulebook.name) private readonly rulebookModel: Model<Rulebook>,
  ) {}

  async create(createRulebookDto: CreateRulebookDto): Promise<Rulebook> {
    const doc = await this.rulebookModel.create(createRulebookDto);
    return doc.save();
  }

  findAll(): Promise<Rulebook[]> {
    return this.rulebookModel.find().exec();
  }

  findOne(id: string): Promise<Rulebook> {
    return this.rulebookModel.findById(id).exec();
  }

  update(id: string, updateRulebookDto: UpdateRulebookDto): Promise<Rulebook> {
    return this.rulebookModel.findByIdAndUpdate(id, updateRulebookDto).exec();
  }

  remove(id: string): Promise<Rulebook> {
    return this.rulebookModel.findByIdAndDelete(id).exec();
  }
}
