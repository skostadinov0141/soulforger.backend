import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CharacterTemplateService } from './character-template.service';
import { CreateCharacterTemplateDto } from './dto/create-character-template.dto';
import { UpdateCharacterTemplateDto } from './dto/update-character-template.dto';

@Controller('character-template')
export class CharacterTemplateController {
  constructor(
    private readonly characterTemplateService: CharacterTemplateService,
  ) {}

  @Post()
  create(@Body() createCharacterTemplateDto: CreateCharacterTemplateDto) {
    return this.characterTemplateService.create(createCharacterTemplateDto);
  }

  @Get()
  findAll(
    @Query('rulebookId') rulebookId: string,
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    return this.characterTemplateService.findAll(rulebookId, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterTemplateService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCharacterTemplateDto: UpdateCharacterTemplateDto,
  ) {
    return this.characterTemplateService.update(id, updateCharacterTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characterTemplateService.remove(id);
  }
}
