import { Injectable } from '@nestjs/common';
import { CharacterProperty } from '../core/entities/character-property/character-property.entity';
import { PropertyTypes } from '../core/enums/property-types.enum';
import { NumberMetadata } from '../core/entities/character-property/number-metadata.entity';
import { Locales } from '../core/enums/locales';
import { DerivedNumberMetadata } from '../core/entities/character-property/derived-number-metadata.entity';
import { PropertyGraph } from '../core/entities/property-graph/property-graph.entity';

@Injectable()
export class TestService {
  test() {
    const properties: CharacterProperty[] = [
      {
        type: PropertyTypes.NUMBER,
        autoUpdateDependants: false,
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
        autoUpdateDependants: false,
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
      {
        type: PropertyTypes.DERIVED_NUMBER,
        autoUpdateDependants: false,
        correlationId: 'strength-cross-dexterity',
        name: [
          {
            locale: Locales.EN,
            text: 'Strenght X Dexterity',
          },
        ],
        description: [],
        metadata: <DerivedNumberMetadata>{
          default: 0,
          expression: '(${strength} * ${dexterity})/2',
          min: 0,
          max: 100,
        },
        value: 0,
      },
      {
        type: PropertyTypes.DERIVED_NUMBER,
        autoUpdateDependants: false,
        correlationId: 'doubled-dexterity',
        name: [
          {
            locale: Locales.EN,
            text: 'Doubled Dexterity',
          },
        ],
        description: [],
        metadata: <DerivedNumberMetadata>{
          default: 0,
          expression: '${dexterity}*2',
          min: 0,
          max: 100,
        },
        value: 0,
      },
      {
        type: PropertyTypes.DERIVED_NUMBER,
        autoUpdateDependants: false,
        correlationId: 'deine-mudda',
        name: [
          {
            locale: Locales.EN,
            text: 'Deine Mudda',
          },
        ],
        description: [],
        metadata: <DerivedNumberMetadata>{
          default: 0,
          expression: `$\{doubled-dexterity}*$\{strength-cross-dexterity}`,
          min: 0,
          max: 100,
        },
        value: 0,
      },
    ];
    const graph = new PropertyGraph(properties);
    return graph;
  }
}
