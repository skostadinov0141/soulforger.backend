import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FixedNumericValue } from '../entities/fixed-numeric-value.entity';
import { Model } from 'mongoose';
import { TextValue } from '../entities/text-value.entity';
import { CharacterFieldPath } from '../entities/character-field-path.entity';
import { DiceRoll } from '../entities/dice-roll.entity';
import { CalculatedNumericValue } from '../entities/calculated-numeric-value.entity';
import {
  CalculatedNumericValueTemplateDto,
  CreateAttributeTemplateDto,
  FixedNumericValueTemplateDto,
  TextValueTemplateDto,
} from '../dto/create-attribute-template.dto';
import { Attribute } from '../entities/attribute.entity';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';
import {
  UpdateAttributeTemplateDto,
  UpdateCalculatedNumericValueTemplateDto,
} from '../dto/update-attribute-template.dto';

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
    @InjectModel('Rulebook') private rulebookModel: Model<Rulebook>,
  ) {}

  async create(payload: CreateAttributeTemplateDto) {
    const rulebook = await this.rulebookModel.findById(payload.rulebook).exec();
    let createdValue: FixedNumericValue | TextValue | CalculatedNumericValue;
    switch (payload.attributeType) {
      case 'FixedNumericValue':
        createdValue = await this.createValue(
          'FixedNumericValue',
          payload.attributeValue as FixedNumericValueTemplateDto,
          rulebook,
        );
        createdValue.rulebook = rulebook;
        break;
      case 'TextValue':
        createdValue = await this.createValue(
          'TextValue',
          payload.attributeValue as TextValueTemplateDto,
          rulebook,
        );
        createdValue.rulebook = rulebook;
        break;
      case 'CalculatedNumericValue':
        createdValue = await this.createValue(
          'CalculatedNumericValue',
          payload.attributeValue as CalculatedNumericValueTemplateDto,
          rulebook,
        );
        createdValue.rulebook = rulebook;
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
    payload: FixedNumericValueTemplateDto,
    rulebook: Rulebook,
  ): Promise<FixedNumericValue>;
  private createValue(
    type: 'TextValue',
    payload: TextValueTemplateDto,
    rulebook: Rulebook,
  ): Promise<TextValue>;
  private createValue(
    type: 'CalculatedNumericValue',
    payload: CalculatedNumericValueTemplateDto,
    rulebook: Rulebook,
  ): Promise<CalculatedNumericValue>;

  // Implementation
  private async createValue(
    type: 'FixedNumericValue' | 'TextValue' | 'CalculatedNumericValue',
    payload:
      | FixedNumericValueTemplateDto
      | TextValueTemplateDto
      | CalculatedNumericValueTemplateDto,
    rulebook: Rulebook,
  ): Promise<FixedNumericValue | TextValue | CalculatedNumericValue> {
    switch (type) {
      case 'FixedNumericValue':
        payload.rulebook = rulebook;
        const createdFixedValue = new this.fixedNumericValueModel(
          payload as FixedNumericValueTemplateDto,
        );
        return await createdFixedValue.save();

      case 'TextValue':
        payload.rulebook = rulebook;
        const createdTextValue = new this.textValueModel(
          payload as TextValueTemplateDto,
        );
        return await createdTextValue.save();

      case 'CalculatedNumericValue':
        payload.rulebook = rulebook;
        (payload as CalculatedNumericValueTemplateDto).variables.forEach(
          (variable) => (variable.rulebook = rulebook),
        );
        (payload as CalculatedNumericValueTemplateDto).diceRolls.forEach(
          (diceRoll) => (diceRoll.rulebook = rulebook),
        );
        const calculatedPayload = payload as CalculatedNumericValueTemplateDto;
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
    return this.attributeModel
      .find({}, { __v: 0 })
      .populate('attributeValue', { __v: 0 })
      .populate('rulebook', { __v: 0 })
      .exec();
  }

  findOne(id: string) {
    return this.attributeModel
      .findById(id, { __v: 0 })
      .populate('attributeValue', { __v: 0 })
      .populate('rulebook', { __v: 0 })
      .exec();
  }

  async update(
    id: string,
    payload: UpdateAttributeTemplateDto,
  ): Promise<Attribute> {
    const rulebook = await this.rulebookModel.findById(payload.rulebook).exec();
    switch (payload.attributeType) {
      case 'FixedNumericValue':
        await this.fixedNumericValueModel
          .findByIdAndUpdate(payload.attributeValue._id, payload.attributeValue)
          .exec();
        break;
      case 'TextValue':
        await this.textValueModel
          .findByIdAndUpdate(payload.attributeValue._id, payload.attributeValue)
          .exec();
        break;
      case 'CalculatedNumericValue':
        const value: UpdateCalculatedNumericValueTemplateDto =
          payload.attributeValue as UpdateCalculatedNumericValueTemplateDto;
        for (const variable of value.variables) {
          if (!variable._id) {
            variable.rulebook = rulebook;
            const createdVariable =
              await this.characterFieldPathModel.create(variable);
            value.variables.push({
              _id: createdVariable._id.toString(),
              rulebook: rulebook,
              name: variable.name,
              path: variable.path,
            });
          } else {
            await this.characterFieldPathModel
              .findByIdAndUpdate(variable._id, variable)
              .exec();
          }
        }
        for (const diceRoll of value.diceRolls) {
          if (!diceRoll._id) {
            diceRoll.rulebook = rulebook;
            const createdDiceRoll = await this.diceRollModel.create(diceRoll);
            value.diceRolls.push({
              _id: createdDiceRoll._id.toString(),
              rulebook: rulebook,
              name: diceRoll.name,
              diceAmount: diceRoll.diceAmount,
              diceSides: diceRoll.diceSides,
            });
          } else {
            await this.diceRollModel
              .findByIdAndUpdate(diceRoll._id, diceRoll)
              .exec();
          }
        }
        await this.calculatedNumericValueModel.findByIdAndUpdate(
          payload.attributeValue._id,
          value,
        );
        break;
      default:
        throw new Error(`Unsupported value type: ${payload.attributeType}`);
    }
    return this.attributeModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
  }

  async remove(id: string) {
    const attribute = await this.attributeModel.findById(id).exec();
    if (!attribute) {
      throw new Error('Attribute not found');
    }
    switch (attribute.attributeType) {
      case 'FixedNumericValue':
        await this.fixedNumericValueModel
          .deleteOne({ _id: attribute.attributeValue })
          .exec();
        break;
      case 'TextValue':
        await this.textValueModel
          .deleteOne({ _id: attribute.attributeValue })
          .exec();
        break;
      case 'CalculatedNumericValue':
        const calculatedValue = await this.calculatedNumericValueModel
          .findById(attribute.attributeValue)
          .exec();
        if (!calculatedValue) {
          throw new Error('Calculated value not found');
        }
        await this.characterFieldPathModel
          .deleteMany({ _id: { $in: calculatedValue.variables } })
          .exec();
        await this.diceRollModel
          .deleteMany({ _id: { $in: calculatedValue.diceRolls } })
          .exec();
        await this.calculatedNumericValueModel
          .deleteOne({ _id: attribute.attributeValue })
          .exec();
        break;
      default:
        throw new Error(`Unsupported value type: ${attribute.attributeType}`);
    }
    return this.attributeModel.deleteOne({ _id: id }).exec();
  }
}
