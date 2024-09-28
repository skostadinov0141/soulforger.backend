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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Rulebook } from './entities/rulebook.entity';

@ApiTags('rulebook')
@Controller('rulebook')
export class RulebookController {
  constructor(private readonly rulebookService: RulebookService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record was successfully created.',
    type: Rulebook,
  })
  create(@Body() createRulebookDto: CreateRulebookDto) {
    return this.rulebookService.create(createRulebookDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The records were successfully retrieved.',
    type: [Rulebook],
  })
  findAll() {
    return this.rulebookService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record was successfully retrieved.',
    type: Rulebook,
  })
  findOne(@Param('id') id: string) {
    return this.rulebookService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record was successfully updated.',
    type: Rulebook,
  })
  update(
    @Param('id') id: string,
    @Body() updateRulebookDto: UpdateRulebookDto,
  ) {
    return this.rulebookService.update(+id, updateRulebookDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record was successfully deleted.',
    type: Rulebook,
  })
  remove(@Param('id') id: string) {
    return this.rulebookService.remove(+id);
  }
}
