import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FixedNumericValue } from '../entities/fixed-numeric-value.entity';
import { Model } from 'mongoose';
import { TextValue } from '../entities/text-value.entity';
import { CharacterFieldPath } from '../entities/character-field-path.entity';
import { DiceRoll } from '../entities/dice-roll.entity';
import { CalculatedNumericValue } from '../entities/calculated-numeric-value.entity';
import {
  CalculatedNumericValueDto,
  CreateAttributeDto,
  FixedNumericValueDto,
  TextValueDto,
} from '../dto/create-attribute.dto';
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class AttributeService {
  constructor(
    @InjectModel(Attribute.name) private attributeModel: Model<Attribute>,
    @InjectModel(FixedNumericValue.name)
    private fixedNumericValueModel: Model<FixedNumericValue>,
    @InjectModel(TextValue.name) private textValueModel: Model<TextValue>,
    @InjectModel(CharacterFieldPath.name)
    private characterFieldPathModel: Model<CharacterFieldPath>,
    @InjectModel(DiceRoll.name) private diceRollModel: Model<DiceRoll>,
    @InjectModel(CalculatedNumericValue.name)
    private calculatedNumericValueModel: Model<CalculatedNumericValue>,
  ) {}

  async create(payload: CreateAttributeDto) {
    let createdValue: FixedNumericValue | TextValue | CalculatedNumericValue;
    switch (payload.attributeType) {
      case 'FixedNumericValue':
        createdValue = await this.createValue(
          'FixedNumericValue',
          payload.attributeValue as FixedNumericValueDto,
        );
        break;
      case 'TextValue':
        createdValue = await this.createValue(
          'TextValue',
          payload.attributeValue as TextValueDto,
        );
        break;
      case 'CalculatedNumericValue':
        createdValue = await this.createValue(
          'CalculatedNumericValue',
          payload.attributeValue as CalculatedNumericValueDto,
        );
        break;
      default:
        throw new Error(`Unsupported value type: ${payload.attributeType}`);
    }
    const createdAttribute = await this.attributeModel.create({
      ...payload,
      attributeValue: createdValue,
    });
    return createdAttribute.save();
  }

  // Function overloads
  private createValue(
    type: 'FixedNumericValue',
    payload: FixedNumericValueDto,
  ): Promise<FixedNumericValue>;
  private createValue(
    type: 'TextValue',
    payload: TextValueDto,
  ): Promise<TextValue>;
  private createValue(
    type: 'CalculatedNumericValue',
    payload: CalculatedNumericValueDto,
  ): Promise<CalculatedNumericValue>;

  // Implementation
  private async createValue(
    type: 'FixedNumericValue' | 'TextValue' | 'CalculatedNumericValue',
    payload: FixedNumericValueDto | TextValueDto | CalculatedNumericValueDto,
  ): Promise<FixedNumericValue | TextValue | CalculatedNumericValue> {
    switch (type) {
      case 'FixedNumericValue':
        const createdFixedValue = new this.fixedNumericValueModel(
          payload as FixedNumericValueDto,
        );
        return await createdFixedValue.save();

      case 'TextValue':
        const createdTextValue = new this.textValueModel(
          payload as TextValueDto,
        );
        return await createdTextValue.save();

      case 'CalculatedNumericValue':
        const calculatedPayload = payload as CalculatedNumericValueDto;
        const createdVariables = calculatedPayload.variables.map(
          (variable) => new this.characterFieldPathModel(variable),
        );
        const createdDiceRolls = calculatedPayload.diceRolls.map(
          (diceRoll) => new this.diceRollModel(diceRoll),
        );
        const createdCalculatedValue = new this.calculatedNumericValueModel({
          ...calculatedPayload,
          variables: createdVariables,
          diceRolls: createdDiceRolls,
        });
        return await createdCalculatedValue.save();

      default:
        throw new Error(`Unsupported value type: ${type}`);
    }
  }

  findAll() {
    return this.attributeModel.find().exec();
  }

  findOne(id: string) {
    return this.attributeModel.findById(id).exec();
  }

  update() {}
}
