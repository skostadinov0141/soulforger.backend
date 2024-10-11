import { Inject, Injectable } from '@nestjs/common';
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

  create(createAttributeTemplateDto: CreateAttributeTemplateDto) {
    return 'This action adds a new attributeTemplate';
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
