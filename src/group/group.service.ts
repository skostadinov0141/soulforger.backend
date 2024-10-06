import { HttpException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './entities/group.entity';
import { Model } from 'mongoose';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
    private readonly i18n: I18nService,
  ) {}

  create(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = this.groupModel.findOne({
      name: createGroupDto.name,
      rulebook: createGroupDto.rulebook,
    });
    if (group) {
      throw new HttpException(
        this.i18n.t('group.errors.groupAlreadyExists', {
          lang: I18nContext.current().lang,
        }),
        400,
      );
    }
    const newGroup = new this.groupModel(createGroupDto);
    return newGroup.save();
  }

  findAll(): Promise<Group[]> {
    return this.groupModel.find({}, { __v: 0 }).exec();
  }

  findAllByRulebook(rulebook: string): Promise<Group[]> {
    return this.groupModel.find({ rulebook }, { __v: 0 }).exec();
  }

  findOne(id: string): Promise<Group> {
    const group = this.groupModel.findById(id, { __v: 0 }).exec();
    if (!group) {
      throw new HttpException(
        this.i18n.t('group.errors.groupNotFound', {
          lang: I18nContext.current().lang,
        }),
        400,
      );
    }
    return group;
  }

  update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = this.groupModel.findById(id).exec();
    if (!group) {
      throw new HttpException(
        this.i18n.t('group.errors.groupNotFound', {
          lang: I18nContext.current().lang,
        }),
        400,
      );
    }
    return this.groupModel
      .findByIdAndUpdate(id, updateGroupDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    const result = await this.groupModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new HttpException(
        this.i18n.t('group.errors.groupNotFound', {
          lang: I18nContext.current().lang,
        }),
        400,
      );
    }
    return result;
  }
}
