import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttributeTemplateService } from './attribute-template.service';
import { CreateAttributeTemplateDto } from './dto/create-attribute-template.dto';
import { UpdateAttributeTemplateDto } from './dto/update-attribute-template.dto';

@Controller('attribute-template')
export class AttributeTemplateController {
  constructor(private readonly attributeTemplateService: AttributeTemplateService) {}

  @Post()
  create(@Body() createAttributeTemplateDto: CreateAttributeTemplateDto) {
    return this.attributeTemplateService.create(createAttributeTemplateDto);
  }

  @Get()
  findAll() {
    return this.attributeTemplateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributeTemplateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttributeTemplateDto: UpdateAttributeTemplateDto) {
    return this.attributeTemplateService.update(+id, updateAttributeTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributeTemplateService.remove(+id);
  }
}
