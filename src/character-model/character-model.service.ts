import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { CharacterModel } from '../core/entities/character/character-model.entity';
import { Model } from 'mongoose';

@Injectable()
export class CharacterModelService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectModel('CharacterModel')
    private readonly characterModel: Model<CharacterModel>,
  ) {}
}
