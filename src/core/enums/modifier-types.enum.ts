export enum ModifierTypes {
  ADD = 'add',
  SUBTRACT = 'subtract',
  MULTIPLY = 'multiply',
  DIVIDE = 'divide',
}

export const modifierTypeInversionMap: Record<ModifierTypes, ModifierTypes> = {
  [ModifierTypes.ADD]: ModifierTypes.SUBTRACT,
  [ModifierTypes.SUBTRACT]: ModifierTypes.ADD,
  [ModifierTypes.MULTIPLY]: ModifierTypes.DIVIDE,
  [ModifierTypes.DIVIDE]: ModifierTypes.MULTIPLY,
};
