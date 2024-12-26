import { Injectable } from '@nestjs/common';
import { CreateCharacterTemplateDto } from './dto/create-character-template.dto';
import { UpdateCharacterTemplateDto } from './dto/update-character-template.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CharacterTemplate } from './entities/character-template.entity';
import { Model } from 'mongoose';
import { RulebookService } from '../rulebook/rulebook.service';
import { TagService } from '../tag/tag.service';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class CharacterTemplateService {
  constructor(
    @InjectModel(CharacterTemplate.name)
    private characterTemplateModel: Model<CharacterTemplate>,
    private readonly rulebookService: RulebookService,
    private readonly tagService: TagService,
    private readonly i18nService: I18nService,
  ) {}

  translate(key: string) {
    return this.i18nService.translate(key, {
      lang: I18nContext.current().lang || 'en',
    });
  }

  create(
    createCharacterTemplateDto: CreateCharacterTemplateDto,
  ): Promise<CharacterTemplate> {
    return 'This action adds a new characterTemplate';
  }

  findAll(): Promise<CharacterTemplate> {
    return `This action returns all characterTemplate`;
  }

  findOne(id: string): Promise<CharacterTemplate> {
    return `This action returns a #${id} characterTemplate`;
  }

  update(
    id: string,
    updateCharacterTemplateDto: UpdateCharacterTemplateDto,
  ): Promise<CharacterTemplate> {
    return `This action updates a #${id} characterTemplate`;
  }

  remove(id: string): Promise<CharacterTemplate> {
    return `This action removes a #${id} characterTemplate`;
  }
}
