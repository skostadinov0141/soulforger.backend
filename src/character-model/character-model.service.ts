import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { CharacterModel } from '../core/entities/character/character-model.entity';
import { Model } from 'mongoose';
import { CreateCharacterModelDto } from './dtos/create-character-model.dto';
import { CharacterProperty } from '../core/entities/character-property/character-property.entity';
import { AddPropertyToModelDto } from './dtos/add-property-to-model.dto';
import { v4 } from 'uuid';

@Injectable()
export class CharacterModelService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectModel('CharacterModel')
    private readonly characterModel: Model<CharacterModel>,
  ) {}

  /**
   * Creates a new character model.
   * @param payload - The data to create the character model.
   */
  async createCharacterModel(
    payload: CreateCharacterModelDto,
  ): Promise<CharacterModel> {
    const characterModel = new this.characterModel(payload);
    return await characterModel.save();
  }

  /**
   * Adds a property to an existing character model.
   * @param id - The ID of the character model to which the property will be added.
   * @param payload - The property data to be added to the character model.
   */
  async addPropertyToCharacterModel(
    id: string,
    payload: AddPropertyToModelDto,
  ): Promise<CharacterModel> {
    const characterModel = await this.characterModel.findById(id);
    if (!characterModel)
      // TODO: translation
      throw new NotFoundException();
    const finalProperty: CharacterProperty = {
      ...payload,
      guid: v4(),
    };
    characterModel.properties.push(finalProperty);
    return characterModel.save();
  }
}
