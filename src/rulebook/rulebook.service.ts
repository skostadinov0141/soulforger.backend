import { Injectable } from '@nestjs/common';
import { CreateRulebookDto } from './dto/create-rulebook.dto';
import { UpdateRulebookDto } from './dto/update-rulebook.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class RulebookService {
  constructor(private readonly i18n: I18nService) {}

  translate(path: string) {
    return this.i18n.t(path, { lang: I18nContext.current().lang });
  }

  create(createPayload: CreateRulebookDto) {
    return 'This action adds a new rulebook';
  }

  findAll() {
    return `This action returns all rulebook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rulebook`;
  }

  update(id: number, updateRulebookDto: UpdateRulebookDto) {
    return `This action updates a #${id} rulebook`;
  }

  remove(id: number) {
    return `This action removes a #${id} rulebook`;
  }
}
