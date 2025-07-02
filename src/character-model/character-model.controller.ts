import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CharacterModelService } from './character-model.service';
import { CreateCharacterModelDto } from './dtos/create-character-model.dto';
import { AddPropertyToModelDto } from './dtos/add-property-to-model.dto';
import { AddModifierToModelDto } from './dtos/add-modifier-to-model.dto';
import { CharacterModel } from '../core/entities/character/character-model.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Character Model')
@Controller('character-model')
export class CharacterModelController {
  constructor(private readonly characterModelService: CharacterModelService) {}

  /**
   * Creates a new character model.
   */
  @Post()
  async createCharacterModel(
    @Body() payload: CreateCharacterModelDto,
  ): Promise<CharacterModel> {
    return this.characterModelService.createCharacterModel(payload);
  }

  /**
   * Adds a property to an existing character model.
   */
  @Post(':id/properties')
  async addPropertyToCharacterModel(
    @Param('id') id: string,
    @Body() payload: AddPropertyToModelDto,
  ): Promise<CharacterModel> {
    return this.characterModelService.addPropertyToCharacterModel(id, payload);
  }

  /**
   * Adds a modifier to an existing character model.
   */
  @Post(':id/modifiers')
  async addModifierToCharacterModel(
    @Param('id') id: string,
    @Body() payload: AddModifierToModelDto,
  ): Promise<CharacterModel> {
    return this.characterModelService.addModifierToCharacterModel(id, payload);
  }

  /**
   * Retrieves a character model by its ID.
   */
  @Get(':id')
  async getCharacterModelById(
    @Param('id') id: string,
  ): Promise<CharacterModel> {
    return this.characterModelService.getCharacterModelById(id);
  }

  /**
   * Retrieves all character models.
   */
  @Get()
  async getAllCharacterModels(): Promise<CharacterModel[]> {
    return this.characterModelService.getAllCharacterModels();
  }
}
