import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AttributeTemplateService } from './attribute-template.service';
import { CreateAttributeTemplateDto } from './dto/create-attribute-template.dto';
import { UpdateAttributeTemplateDto } from './dto/update-attribute-template.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AttributeTemplate } from './entities/attribute-template.entity';
import { SearchAttributeTemplateDto } from '../attribute-template-search/dto/search-attribute-template.dto';
import { GetPathRegistryDto } from './dto/get-path-registry.dto';

@ApiTags('attribute-template')
@Controller('attribute-template')
export class AttributeTemplateController {
  constructor(
    private readonly attributeTemplateService: AttributeTemplateService,
  ) {}

  @Post()
  @ApiBody({ type: CreateAttributeTemplateDto })
  @ApiOkResponse({ type: AttributeTemplate })
  create(
    @Body() createAttributeTemplateDto: CreateAttributeTemplateDto,
  ): Promise<AttributeTemplate> {
    return this.attributeTemplateService.create(createAttributeTemplateDto);
  }

  @Get()
  @ApiResponse({ type: [AttributeTemplate], status: 200 })
  findAll(): Promise<AttributeTemplate[]> {
    return this.attributeTemplateService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ type: AttributeTemplate, status: 200 })
  findOne(@Param('id') id: string): Promise<AttributeTemplate> {
    return this.attributeTemplateService.findOne(id);
  }

  @Get('path-registry/:rulebookId')
  @ApiParam({ name: 'rulebookId', type: String })
  @ApiResponse({ type: [GetPathRegistryDto], status: 200 })
  getPathRegistry(
    @Param('rulebookId') rulebookId: string,
  ): Promise<GetPathRegistryDto[]> {
    return this.attributeTemplateService.getPathRegistry(rulebookId);
  }

  @Post('search')
  @ApiBody({ type: SearchAttributeTemplateDto })
  @ApiResponse({ type: [AttributeTemplate], status: 200 })
  search(
    @Body() searchAttributeTemplateDto: SearchAttributeTemplateDto,
  ): Promise<AttributeTemplate[]> {
    return this.attributeTemplateService.search(searchAttributeTemplateDto);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateAttributeTemplateDto })
  @ApiOkResponse({ type: AttributeTemplate })
  update(
    @Param('id') id: string,
    @Body() updateAttributeTemplateDto: UpdateAttributeTemplateDto,
  ): Promise<AttributeTemplate> {
    return this.attributeTemplateService.update(id, updateAttributeTemplateDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: AttributeTemplate })
  remove(@Param('id') id: string): string {
    return this.attributeTemplateService.remove(id);
  }
}
