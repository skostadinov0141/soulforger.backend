import { Injectable } from '@nestjs/common';
import { CreateRulebookDto } from './dto/create-rulebook.dto';
import { UpdateRulebookDto } from './dto/update-rulebook.dto';

@Injectable()
export class RulebookService {
  create(createRulebookDto: CreateRulebookDto) {
    return 'This action adds a new rulebook';
  }

  findAll() {
    return `This action returns all rulebook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rulebook`;
  }

  update(id: number, updateRulebookDto: UpdateRulebookDto) {
    return `This action updates a #${id} rulebook`;
  }

  remove(id: number) {
    return `This action removes a #${id} rulebook`;
  }
}
