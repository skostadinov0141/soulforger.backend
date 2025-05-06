import { Injectable } from '@nestjs/common';
import { CharacterProperty } from '../core/entities/character-property.entity';
import { PropertyTypes } from '../core/enums/property-types.enum';
import { NumberMetadata } from '../core/entities/number-metadata.entity';
import { Locales } from '../core/enums/locales';

@Injectable()
export class TestService {
  test() {
    const properties: CharacterProperty[] = [
      {
        type: PropertyTypes.NUMBER,
        correlationId: 'strength',
        name: [
          {
            locale: Locales.EN,
            text: 'Strength',
          },
        ],
        description: [],
        metadata: <NumberMetadata>{
          default: 0,
          min: 0,
          max: 100,
        },
        value: 0,
      },
      {
        type: PropertyTypes.NUMBER,
        correlationId: 'dexterity',
        name: [
          {
            locale: Locales.EN,
            text: 'Dexterity',
          },
        ],
        description: [],
        metadata: <NumberMetadata>{
          default: 0,
          min: 0,
          max: 100,
        },
        value: 0,
      },
    ];
  }
}
