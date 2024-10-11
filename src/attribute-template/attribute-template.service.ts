import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateAttributeTemplateDto } from './dto/create-attribute-template.dto';
import { UpdateAttributeTemplateDto } from './dto/update-attribute-template.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AttributeTemplate } from './entities/attribute-template.entity';
import { Model } from 'mongoose';
import { TextValueService } from '../text-value/text-value.service';
import { FixedNumericValueService } from '../fixed-numeric-value/fixed-numeric-value.service';
import { CalculatedNumericValueService } from '../calculated-numeric-value/calculated-numeric-value.service';
import { TagService } from '../tag/tag.service';
import { GroupService } from '../group/group.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { UpdateTagDto } from '../tag/dto/update-tag.dto';
import { CreateTagDto } from '../tag/dto/create-tag.dto';
import { CreateGroupDto } from '../group/dto/create-group.dto';
import { UpdateGroupDto } from '../group/dto/update-group.dto';
import { RulebookService } from '../rulebook/rulebook.service';
import { CreateFixedNumericValueDto } from '../fixed-numeric-value/dtos/create-fixed-numeric-value.dto';
import { CreateCalculatedNumericValueDto } from '../calculated-numeric-value/dtos/create-calculated-numeric-value.dto';
import { CreateTextValueDto } from '../text-value/dtos/create-text-value.dto';

@Injectable()
export class AttributeTemplateService {
  constructor(
    @InjectModel(AttributeTemplate.name)
    private readonly attributeTemplateModel: Model<AttributeTemplate>,
    @Inject() private readonly textValueService: TextValueService,
    @Inject()
    private readonly fixedNumericValueService: FixedNumericValueService,
    @Inject()
    private readonly calculatedNumericValueService: CalculatedNumericValueService,
    @Inject() private readonly tagService: TagService,
    @Inject() private readonly groupService: GroupService,
    @Inject() private readonly rulebookService: RulebookService,
    @Inject() private readonly i18n: I18nService,
  ) {}

  translate(path: string): string {
    return this.i18n.t(path, { lang: I18nContext.current().lang });
  }

  private async createOrUpdateTag(tag: UpdateTagDto | CreateTagDto) {
    if ((tag as UpdateTagDto)._id) {
      return await this.tagService.update(
        (tag as UpdateTagDto)._id,
        tag as UpdateTagDto,
      );
    } else {
      return await this.tagService.create(tag as CreateTagDto);
    }
  }

  private async createOrUpdateGroup(group: UpdateGroupDto | CreateGroupDto) {
    if ((group as UpdateGroupDto)._id) {
      return await this.groupService.update(
        (group as UpdateGroupDto)._id,
        group as UpdateGroupDto,
      );
    } else {
      return await this.groupService.create(group as CreateGroupDto);
    }
  }

  async create(
    payload: CreateAttributeTemplateDto,
  ): Promise<AttributeTemplate> {
    const rulebook = await this.rulebookService.findOne(payload.rulebook);
    if (!rulebook) {
      throw new HttpException(
        this.translate('rulebook.errors.rulebookNotFound'),
        404,
      );
    }
    payload.rulebook = rulebook._id;
    const attributeTemplate = new this.attributeTemplateModel(payload);
    attributeTemplate.tags = await Promise.all(
      payload.tags.map((tag) => {
        return this.createOrUpdateTag(tag);
      }),
    );
    attributeTemplate.group = await this.createOrUpdateGroup(payload.group);
    switch (payload.attributeType) {
      case 'TextValue':
        attributeTemplate.attributeValue = await this.textValueService.create(
          payload.attributeValue as CreateTextValueDto,
        );
        break;
      case 'FixedNumericValue':
        attributeTemplate.attributeValue =
          await this.fixedNumericValueService.create(
            payload.attributeValue as CreateFixedNumericValueDto,
          );
        break;
      case 'CalculatedNumericValue':
        attributeTemplate.attributeValue =
          await this.calculatedNumericValueService.create(
            payload.attributeValue as CreateCalculatedNumericValueDto,
          );
        break;
    }
    return await attributeTemplate.save();
  }

  findAll() {
    return `This action returns all attributeTemplate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attributeTemplate`;
  }

  update(id: number, updateAttributeTemplateDto: UpdateAttributeTemplateDto) {
    return `This action updates a #${id} attributeTemplate`;
  }

  remove(id: number) {
    return `This action removes a #${id} attributeTemplate`;
  }
}
