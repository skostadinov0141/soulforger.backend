export interface DerivedNumberMetadata {
  default: number;
  min: number;
  max: number;
  onChange?: string;
  calculationOrder?: number;
  dependsOn?: string[];
}
