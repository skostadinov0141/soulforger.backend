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
import { CreateAttributeTemplateDto } from './dto/create-attribute-template.dto';
import { Attribute } from './entities/attribute.entity';
import { UpdateAttributeTemplateDto } from './dto/update-attribute-template.dto';
import { PathDto } from './dto/path.dto';
import { SearchAttributeTemplateDto } from './dto/search-attribute-template.dto';

@Controller('character')
@ApiTags('character')
export class CharacterController {
  constructor(
    private readonly characterService: CharacterService,
    private readonly attributeService: AttributeTemplateService,
  ) {}

  @Post('attribute/template')
  @ApiOkResponse({ type: Attribute })
  createAttribute(
    @Body() payload: CreateAttributeTemplateDto,
  ): Promise<Attribute> {
    return this.attributeService.create(payload);
  }

  @Post('attribute/template/search')
  @ApiOkResponse({ type: [Attribute] })
  searchAttribute(
    @Body() payload: SearchAttributeTemplateDto,
  ): Promise<Attribute[]> {
    return this.attributeService.search(payload);
  }

  @Get('attribute/template')
  @ApiResponse({ type: [Attribute] })
  findAllAttributes(): Promise<Attribute[]> {
    return this.attributeService.findAll();
  }

  @Get('attribute/template/pathRegistry/:rulebookId')
  @ApiResponse({ type: [PathDto] })
  getPathRegistry(@Param('rulebookId') rulebookId: string): Promise<PathDto[]> {
    return this.attributeService.getPathRegistry(rulebookId);
  }

  @Get('attribute/template/getByRulebook/:rulebookId')
  @ApiResponse({ type: [Attribute] })
  getAttributesByRulebook(
    @Param('rulebookId') rulebookId: string,
  ): Promise<Attribute[]> {
    return this.attributeService.findByRulebook(rulebookId);
  }

  @Get('attribute/template/:id')
  @ApiResponse({ type: Attribute })
  findOneAttribute(@Param('id') id: string): Promise<Attribute> {
    return this.attributeService.findOne(id);
  }

  @Patch('attribute/template/:id')
  @ApiResponse({ type: Attribute })
  updateAttribute(
    @Param('id') id: string,
    @Body() payload: UpdateAttributeTemplateDto,
  ): Promise<Attribute> {
    return this.attributeService.update(id, payload);
  }

  @Delete('attribute/template/:id')
  @ApiResponse({ type: Attribute })
  removeAttribute(@Param('id') id: string) {
    return this.attributeService.remove(id);
  }

  @Delete('attribute/template/deleteByRulebook/:rulebookId')
  @ApiResponse({ type: Attribute })
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
