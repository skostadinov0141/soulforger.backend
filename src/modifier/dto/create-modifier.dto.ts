export class CreateModifierDto {
  /**
   * The rulebook associated with the modifier.
   * @example '676861133aa08216967be40b'
   */
  rulebook: string;

  /**
   * Should the modifier be applied before the target's base modifier.
   * @example true
   */
  beforeModifier: boolean;

  /**
   * The target path of the modifier.
   * @example 'character.attributes'
   */
  targetPath: string; // TODO change to PathEntity ENUM

  /**
   * The unique identifier of the target that should be modified.
   * @example '676acaaaa0c6c947870ae81f'
   */
  targetId: string;

  /**
   * The source path of the source that created the modifier.
   * @example 'character.attributes'
   */
  sourcePath: string; // TODO change to PathEntity ENUM

  /**
   * The unique identifier of the source that created the modifier.
   * @example '676acaaaa0c6c947870ae81f'
   */
  sourceId: string;

  /**
   * The mode of the modifier.
   * @example 'add'
   */
  mode: 'add' | 'subtract' | 'divide' | 'multiply' | 'replace';

  /**
   * The inverse mode of the modifier.
   * @example 'subtract'
   */
  inverseMode: 'add' | 'subtract' | 'multiply' | 'replace';
}
