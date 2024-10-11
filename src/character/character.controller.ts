import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AttributeTemplateService } from './services/attribute-template.service';
import { CreateAttributeTemplateDto } from '../attribute-template/dto/create-attribute-template.dto';
import { AttributeTemplate } from '../attribute-template/entities/attribute-template.entity';
import { UpdateAttributeTemplateDto } from '../attribute-template/dto/update-attribute-template.dto';
import { PathDto } from './dto/path.dto';
import { SearchAttributeTemplateDto } from '../attribute-template-search/dto/search-attribute-template.dto';
import { Tag } from '../tag/entities/tag.entity';
import { Group } from '../group/entities/group.entity';

@Controller('character')
@ApiTags('character')
export class CharacterController {
  constructor(
    private readonly characterService: CharacterService,
    private readonly attributeService: AttributeTemplateService,
  ) {}

  @Post('attribute/template')
  @ApiOkResponse({ type: AttributeTemplate })
  createAttribute(
    @Body() payload: CreateAttributeTemplateDto,
  ): Promise<AttributeTemplate> {
    return this.attributeService.create(payload);
  }

  @Post('attribute/template/search')
  @ApiOkResponse({ type: [AttributeTemplate] })
  searchAttribute(
    @Body() payload: SearchAttributeTemplateDto,
  ): Promise<AttributeTemplate[]> {
    return this.attributeService.search(payload);
  }

  @Get('attribute/template')
  @ApiResponse({ type: [AttributeTemplate] })
  findAllAttributes(): Promise<AttributeTemplate[]> {
    return this.attributeService.findAll();
  }

  @Get('attribute/template/pathRegistry/:rulebookId')
  @ApiResponse({ type: [PathDto] })
  getPathRegistry(@Param('rulebookId') rulebookId: string): Promise<PathDto[]> {
    return this.attributeService.getPathRegistry(rulebookId);
  }

  @Get('attribute/template/getByRulebook/:rulebookId')
  @ApiResponse({ type: [AttributeTemplate] })
  getAttributesByRulebook(
    @Param('rulebookId') rulebookId: string,
  ): Promise<AttributeTemplate[]> {
    return this.attributeService.findByRulebook(rulebookId);
  }

  @Get('attribute/template/tags')
  @ApiResponse({ type: [Tag] })
  getTags(): Promise<Tag[]> {
    return this.attributeService.getAttributeTags();
  }

  @Get('attribute/template/groups')
  @ApiResponse({ type: [Group] })
  getGroups(): Promise<Group[]> {
    return this.attributeService.getAttributeGroups();
  }

  @Get('attribute/template/:id')
  @ApiResponse({ type: AttributeTemplate })
  findOneAttribute(@Param('id') id: string): Promise<AttributeTemplate> {
    return this.attributeService.findOne(id);
  }

  @Patch('attribute/template/:id')
  @ApiResponse({ type: AttributeTemplate })
  updateAttribute(
    @Param('id') id: string,
    @Body() payload: UpdateAttributeTemplateDto,
  ): Promise<AttributeTemplate> {
    return this.attributeService.update(id, payload);
  }

  @Delete('attribute/template/:id')
  @ApiResponse({ type: AttributeTemplate })
  removeAttribute(@Param('id') id: string) {
    return this.attributeService.remove(id);
  }

  @Delete('attribute/template/deleteByRulebook/:rulebookId')
  @ApiResponse({ type: AttributeTemplate })
  removeAttributesByRulebook(@Param('rulebookId') rulebookId: string) {
    return this.attributeService.removeByRulebook(rulebookId);
  }

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Get()
  findAll() {
    return this.characterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.characterService.update(+id, updateCharacterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characterService.remove(+id);
  }
}
