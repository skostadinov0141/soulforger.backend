import { Injectable } from '@nestjs/common';
import { CreateAttributeTemplateDto } from './dto/create-attribute-template.dto';
import { UpdateAttributeTemplateDto } from './dto/update-attribute-template.dto';

@Injectable()
export class AttributeTemplateService {
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
