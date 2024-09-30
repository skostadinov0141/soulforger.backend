import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FixedNumericValue } from '../entities/fixed-numeric-value.entity';
import { HydratedDocument, Model } from 'mongoose';
import { TextValue } from '../entities/text-value.entity';
import { CharacterFieldPath } from '../entities/character-field-path.entity';
import { DiceRoll } from '../entities/dice-roll.entity';
import { CalculatedNumericValue } from '../entities/calculated-numeric-value.entity';
import {
  CreateAttributeCalculatedNumericValueTemplateDto,
  CreateAttributeTemplateDto,
  CreateAttributeFixedNumericValueTemplateDto,
  CreateAttributeTextValueTemplateDto,
  CreateAttributeTag,
  CreateAttributeGroup,
} from '../dto/create-attribute-template.dto';
import { Attribute } from '../entities/attribute.entity';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';
import {
  UpdateAttributeTemplateDto,
  UpdateCalculatedNumericValueTemplateDto,
} from '../dto/update-attribute-template.dto';
import { PathDto } from '../dto/path.dto';
import { Tag } from '../entities/tag.entity';
import { Group } from '../entities/group.entity';

@Injectable()
export class AttributeTemplateService {
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
    @InjectModel(Rulebook.name) private rulebookModel: Model<Rulebook>,
    @InjectModel(Tag.name) private tagModel: Model<Tag>,
    @InjectModel(Group.name) private groupModel: Model<Group>,
  ) {}

  async create(payload: CreateAttributeTemplateDto) {
    const rulebook = await this.rulebookModel.findById(payload.rulebook).exec();
    let createdValue: FixedNumericValue | TextValue | CalculatedNumericValue;
    switch (payload.attributeType) {
      case 'FixedNumericValue':
        createdValue = await this.createValue(
          'FixedNumericValue',
          payload.attributeValue as CreateAttributeFixedNumericValueTemplateDto,
          rulebook,
        );
        createdValue.rulebook = rulebook;
        break;
      case 'TextValue':
        createdValue = await this.createValue(
          'TextValue',
          payload.attributeValue as CreateAttributeTextValueTemplateDto,
          rulebook,
        );
        createdValue.rulebook = rulebook;
        break;
      case 'CalculatedNumericValue':
        createdValue = await this.createValue(
          'CalculatedNumericValue',
          payload.attributeValue as CreateAttributeCalculatedNumericValueTemplateDto,
          rulebook,
        );
        createdValue.rulebook = rulebook;
        break;
      default:
        throw new Error(`Unsupported value type: ${payload.attributeType}`);
    }
    const createdAttribute = await this.attributeModel.create({
      ...payload,
      tags: [],
      group: null,
      attributeValue: createdValue,
      template: true,
    });
    createdAttribute.tags = await Promise.all([
      ...payload.tags.map((tag) => this.createTag(tag, rulebook)),
    ]);
    createdAttribute.group = await this.createGroup(payload.group, rulebook);
    return createdAttribute.save();
  }

  private createTag(
    payload: CreateAttributeTag,
    rulebook: Rulebook,
  ): Promise<Tag> {
    if (payload._id) {
      return this.tagModel.findOne({ _id: payload._id }).exec();
    } else {
      return this.tagModel.create({
        ...payload,
        for: 'attribute',
        rulebook,
      });
    }
  }

  private createGroup(
    payload: CreateAttributeGroup,
    rulebook: Rulebook,
  ): Promise<Group> {
    if (payload._id) {
      return this.groupModel.findOne({ _id: payload._id }).exec();
    } else {
      return this.groupModel.create({
        ...payload,
        for: 'attribute',
        rulebook,
      });
    }
  }

  private createValue(
    type: 'FixedNumericValue',
    payload: CreateAttributeFixedNumericValueTemplateDto,
    rulebook: Rulebook,
  ): Promise<FixedNumericValue>;
  private createValue(
    type: 'TextValue',
    payload: CreateAttributeTextValueTemplateDto,
    rulebook: Rulebook,
  ): Promise<TextValue>;
  private createValue(
    type: 'CalculatedNumericValue',
    payload: CreateAttributeCalculatedNumericValueTemplateDto,
    rulebook: Rulebook,
  ): Promise<CalculatedNumericValue>;

  private async createValue(
    type: 'FixedNumericValue' | 'TextValue' | 'CalculatedNumericValue',
    payload:
      | CreateAttributeFixedNumericValueTemplateDto
      | CreateAttributeTextValueTemplateDto
      | CreateAttributeCalculatedNumericValueTemplateDto,
    rulebook: Rulebook,
  ): Promise<FixedNumericValue | TextValue | CalculatedNumericValue> {
    switch (type) {
      case 'FixedNumericValue':
        payload.rulebook = rulebook;
        const createdFixedValue = new this.fixedNumericValueModel(
          payload as CreateAttributeFixedNumericValueTemplateDto,
        );
        return await createdFixedValue.save();

      case 'TextValue':
        payload.rulebook = rulebook;
        const createdTextValue = new this.textValueModel(
          payload as CreateAttributeTextValueTemplateDto,
        );
        return await createdTextValue.save();

      case 'CalculatedNumericValue':
        payload.rulebook = rulebook;
        (
          payload as CreateAttributeCalculatedNumericValueTemplateDto
        ).variables.forEach((variable) => (variable.rulebook = rulebook));
        (
          payload as CreateAttributeCalculatedNumericValueTemplateDto
        ).diceRolls.forEach((diceRoll) => (diceRoll.rulebook = rulebook));
        const calculatedPayload =
          payload as CreateAttributeCalculatedNumericValueTemplateDto;
        const createdVariables = calculatedPayload.variables.map(
          (variable) => new this.characterFieldPathModel(variable),
        );
        for (const variable of createdVariables) {
          await variable.save();
        }
        const createdDiceRolls = calculatedPayload.diceRolls.map(
          (diceRoll) => new this.diceRollModel(diceRoll),
        );
        for (const diceRoll of createdDiceRolls) {
          await diceRoll.save();
        }
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
      .find({ template: true }, { __v: 0 })
      .populate({
        path: 'attributeValue',
        populate: [
          { path: 'variables', select: { __v: 0 } },
          { path: 'diceRolls', select: { __v: 0 } },
        ],
      })
      .populate('tags', { __v: 0 })
      .populate('group', { __v: 0 })
      .exec();
  }

  findOne(id: string) {
    return this.attributeModel
      .findOne({ _id: id, template: true }, { __v: 0 })
      .populate({
        path: 'attributeValue',
        select: { __v: 0 },
        populate: [
          {
            path: 'variables',
            select: { __v: 0 },
          },
          { path: 'diceRolls', select: { __v: 0 } },
        ],
      })
      .populate('tags', { __v: 0 })
      .populate('group', { __v: 0 })
      .exec();
  }

  async update(
    id: string,
    payload: UpdateAttributeTemplateDto,
  ): Promise<Attribute> {
    const attribute = await this.attributeModel
      .findOne({ _id: id, template: true })
      .exec();
    if (!attribute) {
      throw new Error('Attribute not found');
    }
    const rulebook = await this.rulebookModel.findById(payload.rulebook).exec();
    attribute.set(payload);

    switch (payload.attributeType) {
      case 'FixedNumericValue':
      case 'TextValue':
        await this.updateSimpleValue(attribute, payload.attributeValue);
        break;
      case 'CalculatedNumericValue':
        await this.updateCalculatedValue(
          attribute,
          payload.attributeValue as UpdateCalculatedNumericValueTemplateDto,
          rulebook,
        );
        break;
      default:
        throw new Error(`Unsupported value type: ${payload.attributeType}`);
    }
    attribute.tags = await Promise.all([
      ...payload.tags.map((tag) => this.createTag(tag, rulebook)),
    ]);
    attribute.group = await this.createGroup(payload.group, rulebook);
    return attribute.save();
  }

  private async updateSimpleValue(
    attribute: HydratedDocument<Attribute>,
    valueData: any,
  ) {
    await attribute.set(valueData).save();
  }

  private async updateCalculatedValue(
    attribute: HydratedDocument<Attribute>,
    valueData: UpdateCalculatedNumericValueTemplateDto,
    rulebook: HydratedDocument<Rulebook>,
  ) {
    const calculatedValue = await this.calculatedNumericValueModel
      .findById(attribute.attributeValue._id)
      .populate([
        { path: 'variables', model: CharacterFieldPath.name },
        { path: 'diceRolls', model: DiceRoll.name },
      ])
      .exec();

    if (!calculatedValue) {
      throw new Error('Calculated value not found');
    }

    // Update existing variables and add new ones
    calculatedValue.variables = await Promise.all(
      valueData.variables.map(async (variable) => {
        if (variable._id) {
          return this.characterFieldPathModel
            .findByIdAndUpdate(variable._id, variable, { new: true })
            .exec();
        } else {
          return await this.characterFieldPathModel.create({
            ...variable,
            rulebook,
          });
        }
      }),
    );

    // Update existing dice rolls and add new ones
    calculatedValue.diceRolls = await Promise.all(
      valueData.diceRolls.map(async (diceRoll) => {
        if (diceRoll._id) {
          return this.diceRollModel
            .findByIdAndUpdate(diceRoll._id, diceRoll, { new: true })
            .exec();
        } else {
          return await this.diceRollModel.create({
            ...diceRoll,
            rulebook,
          });
        }
      }),
    );
    calculatedValue.formula = valueData.formula;

    // Update other fields of the calculated value
    calculatedValue.set(calculatedValue);
    await calculatedValue.save();
  }

  async remove(id: string) {
    const attribute = await this.attributeModel
      .findOne({ _id: id, template: true })
      .exec();
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

  async removeByRulebook(rulebookId: string) {
    const rulebook = await this.rulebookModel.findById(rulebookId).exec();
    if (!rulebook) {
      throw new Error('Rulebook not found');
    }
    const attributes = await this.attributeModel
      .find({ rulebook: rulebookId, template: true })
      .exec();
    return Promise.all(
      attributes.map(async (attribute) => await this.remove(attribute._id)),
    );
  }

  async findByRulebook(rulebookId: string) {
    return this.attributeModel
      .find({ rulebook: rulebookId, template: true }, { __v: 0 })
      .populate({
        path: 'attributeValue',
        populate: [
          { path: 'variables', select: { __v: 0 } },
          { path: 'diceRolls', select: { __v: 0 } },
        ],
      })
      .exec();
  }

  async getPathRegistry(rulebookId: string): Promise<PathDto[]> {
    const attributes = await this.attributeModel
      .find(
        { rulebook: rulebookId, template: true },
        {
          name: 1,
        },
      )
      .exec();
    return attributes.map((attribute) => ({
      name: attribute.name,
      path: `attributes[name=${attribute.name}].value`,
    }));
  }
}
