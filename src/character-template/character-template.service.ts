import { Injectable } from '@nestjs/common';
import { CreateCharacterTemplateDto } from './dto/create-character-template.dto';
import { UpdateCharacterTemplateDto } from './dto/update-character-template.dto';

@Injectable()
export class CharacterTemplateService {
  create(createCharacterTemplateDto: CreateCharacterTemplateDto) {
    return 'This action adds a new characterTemplate';
  }

  findAll() {
    return `This action returns all characterTemplate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} characterTemplate`;
  }

  update(id: number, updateCharacterTemplateDto: UpdateCharacterTemplateDto) {
    return `This action updates a #${id} characterTemplate`;
  }

  remove(id: number) {
    return `This action removes a #${id} characterTemplate`;
  }
}
