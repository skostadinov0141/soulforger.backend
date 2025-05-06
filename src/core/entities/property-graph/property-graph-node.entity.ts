import { CharacterProperty } from '../character-property/character-property.entity';

export class PropertyGraphNode {
  content: CharacterProperty;
  dependsOn: PropertyGraphNode[];

  constructor(content: CharacterProperty) {
    this.content = content;
    this.dependsOn = [];
  }
}
