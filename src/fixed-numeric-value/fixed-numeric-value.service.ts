import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FixedNumericValue } from './entities/fixed-numeric-value.entity';
import { Model } from 'mongoose';
import { RulebookService } from '../rulebook/rulebook.service';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class FixedNumericValueService {
  constructor(
    @InjectModel(FixedNumericValue.name)
    private readonly fixedNumericValueModel: Model<FixedNumericValue>,
    @Inject() private readonly rulebookService: RulebookService,
    private readonly i18n: I18nService,
  ) {}
}
