import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Tag } from '../../tag/entities/tag.entity';
import { CharacterLocations } from '../entities/derived-attribute.entity';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';

export class CreateCharacterTemplateDto {
  /**
   * The name of the character template.
   * @example "DnD 5e Character"
   */
  @Length(3, 64)
  name: string;

  /**
   * The description of the character template.
   * @example "A character template for Dungeons and Dragons 5th Edition."
   */
  @Length(3, 2048)
  @IsOptional()
  description?: string;

  /**
   * The tags of the character template.
   * @example []
   */
  @IsObject({ each: true })
  tags: Tag[];

  /**
   * The rulebook of the character template.
   */
  @IsObject()
  rulebook: Rulebook;

  /**
   * The attributes of the character template.
   */
  @IsObject({ each: true })
  attributes: CreateAttributeDto[];

  /**
   * The properties of the character template.
   */
  @IsObject({ each: true })
  properties: CreatePropertyDto[];

  /**
   * The derived attributes of the character template.
   */
  @IsObject({ each: true })
  derivedAttributes: CreateDerivedAttributeDto[];
}

export class CreateAttributeDto {
  /**
   * The name of the attribute.
   * @example "Strength"
   */
  @Length(3, 64)
  name: string;

  /**
   * The description of the attribute.
   * @example "The strength of the character."
   */
  @Length(3, 2048)
  @IsOptional()
  description?: string;

  /**
   * The tags of the attribute.
   * @example []
   */
  @IsObject({ each: true })
  tags: Tag[];

  /**
   * The value of the attribute.
   * @example 10
   */
  @IsNumber()
  value: number;
}

export class CreatePropertyDto {
  /**
   * The name of the property.
   * @example "Race"
   */
  @Length(3, 64)
  name: string;

  /**
   * The description of the property.
   * @example "The Race of the character."
   */
  @Length(3, 2048)
  @IsOptional()
  description?: string;

  /**
   * The tags of the property.
   * @example []
   */
  @IsObject({ each: true })
  tags: Tag[];

  /**
   * The value of the property.
   * @example "Human"
   */
  @IsString()
  value: string;

  /**
   * The options of the property.
   * @example ["Human", "Elf", "Dwarf"]
   */
  @IsOptional()
  @IsString({ each: true })
  options?: string[];
}

export class CreateDerivedAttributeDto {
  /**
   * The name of the derived attribute.
   * @example "Initiative"
   */
  @Length(3, 64)
  name: string;

  /**
   * The description of the derived attribute.
   * @example "The initiative of the character."
   */
  @Length(3, 2048)
  @IsOptional()
  description?: string;

  /**
   * The tags of the derived attribute.
   * @example []
   */
  @IsObject({ each: true })
  tags: Tag[];

  /**
   * The variables of the derived attribute.
   */
  @IsObject({ each: true })
  variables: CreateVariableDto[];

  /**
   * The formula of the derived attribute.
   * @example "676de9fa5750d50f4fe4e634 + 676de9fa5750d50f4fe4e635"
   */
  @IsString()
  formula: string;
}

export class CreateVariableDto {
  /**
   * The name of the variable.
   * @example "Strength"
   */
  @Length(3, 64)
  name: string;

  /**
   * The location of the variable.
   * @example "ATTRIBUTE"
   */
  @IsString()
  @IsEnum(CharacterLocations)
  location: CharacterLocations;

  /**
   * The targetId of the variable.
   * @example "676de9fa5750d50f4fe4e634"
   */
  @IsString()
  targetName: string;

  /**
   * The variableId of the variable.
   * @example "676de9fa5750d50f4fe4e635"
   */
  @IsString()
  variableId: string;
}
