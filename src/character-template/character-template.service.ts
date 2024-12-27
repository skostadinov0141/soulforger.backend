import { Injectable } from '@nestjs/common';
import { CreateCharacterTemplateDto } from './dto/create-character-template.dto';
import { UpdateCharacterTemplateDto } from './dto/update-character-template.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CharacterTemplate } from './entities/character-template.entity';
import { Model } from 'mongoose';
import { RulebookService } from '../rulebook/rulebook.service';
import { TagService } from '../tag/tag.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Tag } from '../tag/entities/tag.entity';

@Injectable()
export class CharacterTemplateService {
  constructor(
    @InjectModel(CharacterTemplate.name)
    private characterTemplateModel: Model<CharacterTemplate>,
    @InjectModel(Tag.name) private tagModel: Model<Tag>,
    private readonly rulebookService: RulebookService,
    private readonly tagService: TagService,
    private readonly i18nService: I18nService,
  ) {}

  translate(key: string) {
    return this.i18nService.translate(key, {
      lang: I18nContext.current().lang || 'en',
    });
  }

  async setCharacterTemplateTags(model: CharacterTemplate) {
    model.tags = await this.tagModel
      .find({
        _id: { $in: model.tags },
      })
      .exec();
  }

  async setCharacterTemplateAttributeTags(model: CharacterTemplate) {
    model.attributes = await Promise.all(
      model.attributes.map(async (attribute) => {
        attribute.tags = await this.tagModel
          .find({
            _id: { $in: attribute.tags },
          })
          .exec();
        return attribute;
      }),
    );
  }

  async setCharacterTemplatePropertyTags(model: CharacterTemplate) {
    model.properties = await Promise.all(
      model.properties.map(async (property) => {
        property.tags = await this.tagModel
          .find({
            _id: { $in: property.tags },
          })
          .exec();
        return property;
      }),
    );
  }

  async setCharacterTemplateDerivedAttributeTags(model: CharacterTemplate) {
    model.derivedAttributes = await Promise.all(
      model.derivedAttributes.map(async (derivedAttribute) => {
        derivedAttribute.tags = await this.tagModel
          .find({
            _id: { $in: derivedAttribute.tags },
          })
          .exec();
        return derivedAttribute;
      }),
    );
  }

  async create(
    createCharacterTemplateDto: CreateCharacterTemplateDto,
  ): Promise<CharacterTemplate> {
    const rulebook = await this.rulebookService.findOne(
      createCharacterTemplateDto.rulebook,
    );
    const characterTemplate = new this.characterTemplateModel();
    characterTemplate.set(createCharacterTemplateDto);
    await this.setCharacterTemplateTags(characterTemplate);
    await this.setCharacterTemplateAttributeTags(characterTemplate);
    await this.setCharacterTemplatePropertyTags(characterTemplate);
    await this.setCharacterTemplateDerivedAttributeTags(characterTemplate);
    characterTemplate.rulebook = rulebook;
    return characterTemplate.save();
  }

  async findAll(
    rulebookId: string,
    page = 1,
    limit = 10,
  ): Promise<CharacterTemplate[]> {
    return this.characterTemplateModel
      .find({ rulebook: rulebookId }, null, {
        skip: (page - 1) * limit,
        limit,
      })
      .exec();
  }

  async findOne(id: string): Promise<CharacterTemplate> {
    return this.characterTemplateModel.findById(id).exec();
  }

  async update(
    id: string,
    updateCharacterTemplateDto: UpdateCharacterTemplateDto,
  ): Promise<CharacterTemplate> {
    await this.rulebookService.findOne(updateCharacterTemplateDto.rulebook);
    const characterTemplate = await this.characterTemplateModel
      .findById(id)
      .exec();
    characterTemplate.set(updateCharacterTemplateDto);
    await this.setCharacterTemplateTags(characterTemplate);
    await this.setCharacterTemplateAttributeTags(characterTemplate);
    await this.setCharacterTemplatePropertyTags(characterTemplate);
    await this.setCharacterTemplateDerivedAttributeTags(characterTemplate);
    return characterTemplate.save();
  }

  async remove(id: string): Promise<CharacterTemplate> {
    return this.characterTemplateModel.findByIdAndDelete(id).exec();
  }
}
