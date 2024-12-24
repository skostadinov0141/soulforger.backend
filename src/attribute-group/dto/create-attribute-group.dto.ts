import { IsOptional, Length } from 'class-validator';

export class CreateAttributeGroupDto {
  /**
   * The name of the attribute group.
   *
   * @example 'Magic Attributes'
   */
  @Length(3, 128)
  name: string;

  /**
   * The description of the attribute group.
   *
   * @example 'Attributes that are magical.'
   */
  @IsOptional()
  @Length(3, 2048)
  description?: string;

  /**
   * The rulebook that the attribute group belongs to.
   *
   * @example '5f4e3d8e3f3e4d2e3f4e3d8e'
   */
  rulebook: string;
}
