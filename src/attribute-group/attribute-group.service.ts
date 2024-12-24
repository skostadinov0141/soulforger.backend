import { HttpException, Injectable } from '@nestjs/common';
import { CreateAttributeGroupDto } from './dto/create-attribute-group.dto';
import { UpdateAttributeGroupDto } from './dto/update-attribute-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AttributeGroup } from './entities/attribute-group.entity';
import { Model } from 'mongoose';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { RulebookService } from '../rulebook/rulebook.service';

@Injectable()
export class AttributeGroupService {
  constructor(
    @InjectModel(AttributeGroup.name)
    private readonly attributeGroupModel: Model<AttributeGroup>,
    private readonly rulebookService: RulebookService,
    private readonly i18nService: I18nService,
  ) {}

  translate(key: string) {
    return this.i18nService.translate(key, {
      lang: I18nContext.current().lang || 'en',
    });
  }

  async create(
    createAttributeGroupDto: CreateAttributeGroupDto,
  ): Promise<AttributeGroup> {
    const rulebook = await this.rulebookService.findOne(
      createAttributeGroupDto.rulebook,
    );
    return this.attributeGroupModel.create({
      ...createAttributeGroupDto,
      rulebook,
    });
  }

  async findAll(
    page: number,
    limit: number,
    rulebook: string,
    order: string,
    populateRulebook: boolean,
    search?: string,
    sortBy?: string,
  ): Promise<AttributeGroup[]> {
    return this.attributeGroupModel
      .find(
        {
          rulebook,
          name: search ? { $regex: search, $options: 'i' } : undefined,
        },
        null,
        {
          skip: page * limit,
          limit,
          sort: sortBy ? { [sortBy]: order } : undefined,
          populate: populateRulebook ? 'rulebook' : undefined,
        },
      )
      .exec();
  }

  findOne(id: string): Promise<AttributeGroup> {
    return this.attributeGroupModel.findById(id).exec();
  }

  async update(
    id: string,
    updateAttributeGroupDto: UpdateAttributeGroupDto,
  ): Promise<AttributeGroup> {
    const attributeGroup = await this.attributeGroupModel.findById(id).exec();
    if (!attributeGroup)
      throw new HttpException(
        this.translate('attributeGroup.errors.notFound'),
        404,
      );
    await this.rulebookService.findOne(updateAttributeGroupDto.rulebook);
    attributeGroup.set(updateAttributeGroupDto);
    return attributeGroup.save();
  }

  async remove(id: string): Promise<AttributeGroup> {
    return this.attributeGroupModel.findByIdAndDelete(id).exec();
  }
}
