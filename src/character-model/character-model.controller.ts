import { Controller } from '@nestjs/common';
import { CharacterModelService } from './character-model.service';

@Controller('character-model')
export class CharacterModelController {
  constructor(private readonly characterModelService: CharacterModelService) {}
}
