import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RulebookService } from './rulebook.service';
import { CreateRulebookDto } from './dto/create-rulebook.dto';
import { UpdateRulebookDto } from './dto/update-rulebook.dto';

@Controller('rulebook')
export class RulebookController {
  constructor(private readonly rulebookService: RulebookService) {}

  @Post()
  create(@Body() createRulebookDto: CreateRulebookDto) {
    return this.rulebookService.create(createRulebookDto);
  }

  @Get()
  findAll() {
    return this.rulebookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rulebookService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRulebookDto: UpdateRulebookDto,
  ) {
    return this.rulebookService.update(+id, updateRulebookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rulebookService.remove(+id);
  }
}
