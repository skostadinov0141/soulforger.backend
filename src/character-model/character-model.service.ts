import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { CharacterModel } from '../core/entities/character/character-model.entity';
import { Model } from 'mongoose';
import { CreateCharacterModelDto } from './dtos/create-character-model.dto';
import { CharacterProperty } from '../core/entities/character-property/character-property.entity';
import { AddPropertyToModelDto } from './dtos/add-property-to-model.dto';
import { v4 } from 'uuid';
import { AddModifierToModelDto } from './dtos/add-modifier-to-model.dto';
import { CharacterModifier } from '../core/entities/character-modifier/character-modifier.entity';
import { PropertyManager } from '../core/entities/character-property/property-manager.entity';
import { CharacterModifierManager } from '../core/entities/character-modifier/character-modifier-manager.entity';
import { Cache } from 'cache-manager';

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
    characterModel.properties = [];
    characterModel.modifiers = {};
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
      throw new NotFoundException('Character model not found');
    const finalProperty: CharacterProperty = {
      ...payload,
      guid: v4(),
    };
    new PropertyManager().addPropertyToCharacter(characterModel, finalProperty);
    return characterModel.save();
  }

  /**
   * Adds a modifier to an existing character model.
   * @param id - The ID of the character model to which the modifier will be added.
   * @param payload - The modifier data to be added to the character model.
   */
  async addModifierToCharacterModel(
    id: string,
    payload: AddModifierToModelDto,
  ): Promise<CharacterModel> {
    const characterModel = await this.characterModel.findById(id);
    if (!characterModel)
      // TODO: translation
      throw new NotFoundException('Character model not found');
    const finalModifier: CharacterModifier = {
      ...payload,
      guid: v4(),
    };
    new CharacterModifierManager().addModifierToCharacter(
      characterModel,
      finalModifier,
    );
    return characterModel.save();
  }

  /**
   * Retrieves a character model by its ID.
   * @param id - The ID of the character model to retrieve.
   */
  async getCharacterModelById(id: string): Promise<CharacterModel> {
    const characterModel = await this.characterModel.findById(id);
    if (!characterModel) {
      throw new NotFoundException();
    }
    return characterModel;
  }

  /**
   * Retrieves all character models.
   */
  async getAllCharacterModels(): Promise<CharacterModel[]> {
    return this.characterModel.find();
  }
}
