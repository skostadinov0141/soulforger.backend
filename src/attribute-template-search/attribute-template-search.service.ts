import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AttributeTemplate } from '../attribute-template/entities/attribute-template.entity';
import { Model } from 'mongoose';
import { SearchAttributeTemplateDto } from './dto/search-attribute-template.dto';
import { RulebookService } from '../rulebook/rulebook.service';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class AttributeTemplateSearchService {
  constructor(
    @InjectModel(AttributeTemplate.name)
    private readonly attributeTemplateModel: Model<AttributeTemplate>,
    @Inject() private readonly rulebookService: RulebookService,
    @Inject() private i18n: I18nService,
  ) {}

  translate(path: string) {
    return this.i18n.translate(path, { lang: I18nContext.current().lang });
  }

  async searchAttributeTemplates(payload: SearchAttributeTemplateDto) {
    const rulebook = await this.rulebookService.findOne(payload.rulebook);
    if (!rulebook) {
      throw new HttpException(await this.translate('rulebook.notFound'), 404);
    }
    let tagsQuery: any = { tags: {} };
    if (payload.includeTags) {
      tagsQuery.tags = { $in: payload.includeTags };
    } else {
      tagsQuery = undefined;
    }
    let groupQuery: any = { group: {} };
    if (payload.includeGroups) {
      groupQuery.group = { $in: payload.includeGroups };
    } else {
      groupQuery = undefined;
    }
    const searchStringQuery: any = {};
    if (payload.searchString) {
      searchStringQuery.name = {
        $regex: payload.searchString,
        $options: 'i',
      };
    }
    const finalQuery = { ...tagsQuery, ...groupQuery, ...searchStringQuery };
    const sort = {};
    sort[payload.sortBy] = payload.sortOrder;
    return this.attributeTemplateModel
      .find(
        {
          ...finalQuery,
          template: true,
          rulebook: rulebook._id,
        },
        { __v: 0 },
      )
      .populate('tags', { __v: 0 })
      .populate('group', { __v: 0 })
      .sort(sort)
      .exec();
  }
}
