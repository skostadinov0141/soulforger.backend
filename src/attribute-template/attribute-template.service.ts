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
import { SearchAttributeTemplateDto } from '../attribute-template-search/dto/search-attribute-template.dto';
import { AttributeTemplateSearchService } from '../attribute-template-search/attribute-template-search.service';
import { DiceRoll } from '../dice-roll/entities/dice-roll.entity';
import { GetPathRegistryDto } from './dto/get-path-registry.dto';

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
    @Inject()
    private readonly attributeTemplateSearchService: AttributeTemplateSearchService,
    @Inject() private readonly i18n: I18nService,
  ) {}

  translate(path: string): string {
    return this.i18n.t(path, { lang: I18nContext.current().lang });
  }

  private async createOrUpdateTag(
    tag: UpdateTagDto | CreateTagDto,
    rulebookId: string,
  ) {
    if ((tag as UpdateTagDto)._id) {
      return await this.tagService.update(
        (tag as UpdateTagDto)._id,
        tag as UpdateTagDto,
      );
    } else {
      const createPayload = tag as CreateTagDto;
      tag.rulebook = rulebookId;
      return await this.tagService.create(createPayload);
    }
  }

  private async createOrUpdateGroup(
    group: UpdateGroupDto | CreateGroupDto,
    rulebookId: string,
  ) {
    if ((group as UpdateGroupDto)._id) {
      return await this.groupService.update(
        (group as UpdateGroupDto)._id,
        group as UpdateGroupDto,
      );
    } else {
      const createPayload = group as CreateGroupDto;
      createPayload.rulebook = rulebookId;
      return await this.groupService.create(createPayload);
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
        return this.createOrUpdateTag(tag, rulebook._id);
      }),
    );
    attributeTemplate.group = await this.createOrUpdateGroup(
      payload.group,
      rulebook._id,
    );
    payload.attributeValue.rulebook = rulebook._id;
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
        (
          payload.attributeValue as CreateCalculatedNumericValueDto
        ).variables.forEach((variable) => (variable.rulebook = rulebook._id));
        (
          payload.attributeValue as CreateCalculatedNumericValueDto
        ).diceRolls.forEach((diceRoll) => (diceRoll.rulebook = rulebook._id));
        attributeTemplate.attributeValue =
          await this.calculatedNumericValueService.create(
            payload.attributeValue as CreateCalculatedNumericValueDto,
          );
        break;
    }
    console.log('attributeTemplate', attributeTemplate);
    return attributeTemplate.save();
  }

  async update(
    id: string,
    payload: UpdateAttributeTemplateDto,
  ): Promise<AttributeTemplate> {
    const rulebook = await this.rulebookService.findOne(payload.rulebook);
    if (!rulebook) {
      throw new HttpException(
        this.translate('rulebook.errors.rulebookNotFound'),
        404,
      );
    }
    const attributeTemplate = await this.attributeTemplateModel.findById(id);
    if (!attributeTemplate) {
      throw new HttpException(
        this.translate('attributeTemplate.errors.attributeTemplateNotFound'),
        404,
      );
    }
    payload.rulebook = rulebook._id;
    attributeTemplate.set(payload);
    attributeTemplate.tags = await Promise.all(
      payload.tags.map((tag) => {
        return this.createOrUpdateTag(tag, rulebook._id);
      }),
    );
    attributeTemplate.group = await this.createOrUpdateGroup(
      payload.group,
      rulebook._id,
    );
    return await attributeTemplate.save();
  }

  async findAll(): Promise<AttributeTemplate[]> {
    return this.attributeTemplateModel
      .find({}, { __v: 0 })
      .populate('tags', { __v: 0 })
      .populate('group', { __v: 0 })
      .populate('rulebook', { __v: 0 })
      .populate({
        path: 'attributeValue',
        select: { __v: 0 },
        populate: [
          {
            path: 'variables',
            strictPopulate: false,
            model: AttributeTemplate.name,
            select: { __v: 0 },
          },
          {
            path: 'diceRolls',
            strictPopulate: false,
            model: DiceRoll.name,
            select: { __v: 0 },
          },
        ],
      })
      .exec();
  }

  async findOne(id: string): Promise<AttributeTemplate> {
    const result = await this.attributeTemplateModel.findById(id).exec();
    if (!result) {
      throw new HttpException(
        this.translate('attributeTemplate.errors.attributeTemplateNotFound'),
        404,
      );
    }
    return this.attributeTemplateModel
      .findById(id, { __v: 0 })
      .populate('tags', { __v: 0 })
      .populate('group', { __v: 0 })
      .populate('rulebook', { __v: 0 })
      .populate({
        path: 'attributeValue',
        select: { __v: 0 },
        populate: [
          {
            path: 'variables',
            strictPopulate: false,
            model: AttributeTemplate.name,
            select: { __v: 0 },
          },
          {
            path: 'diceRolls',
            strictPopulate: false,
            model: DiceRoll.name,
            select: { __v: 0 },
          },
        ],
      })
      .exec();
  }

  remove(id: string) {
    return `This action removes a #${id} attributeTemplate`;
  }

  async getPathRegistry(rulebookId: string): Promise<GetPathRegistryDto[]> {
    const attributeTemplates = await this.attributeTemplateModel
      .find({ rulebook: rulebookId })
      .exec();
    return attributeTemplates.map((attributeTemplate) => {
      const registry: GetPathRegistryDto = {
        name: attributeTemplate.name,
        path: `character%attributes%[name="${attributeTemplate.name}"]%value`,
      };
      return registry;
    });
  }

  search(payload: SearchAttributeTemplateDto): Promise<AttributeTemplate[]> {
    return this.attributeTemplateSearchService.searchAttributeTemplates(
      payload,
    );
  }
}
