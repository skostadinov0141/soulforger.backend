import { Controller, Post, Body, Param } from '@nestjs/common';
import { CharacterModelService } from './character-model.service';
import { CreateCharacterModelDto } from './dtos/create-character-model.dto';
import { AddPropertyToModelDto } from './dtos/add-property-to-model.dto';
import { AddModifierToModelDto } from './dtos/add-modifier-to-model.dto';
import { CharacterModel } from '../core/entities/character/character-model.entity';

@Controller('character-models')
export class CharacterModelController {
  constructor(private readonly characterModelService: CharacterModelService) {}

  @Post()
  async createCharacterModel(
    @Body() payload: CreateCharacterModelDto,
  ): Promise<CharacterModel> {
    return this.characterModelService.createCharacterModel(payload);
  }

  @Post(':id/properties')
  async addPropertyToCharacterModel(
    @Param('id') id: string,
    @Body() payload: AddPropertyToModelDto,
  ): Promise<CharacterModel> {
    return this.characterModelService.addPropertyToCharacterModel(id, payload);
  }

  @Post(':id/modifiers')
  async addModifierToCharacterModel(
    @Param('id') id: string,
    @Body() payload: AddModifierToModelDto,
  ): Promise<CharacterModel> {
    return this.characterModelService.addModifierToCharacterModel(id, payload);
  }
}
