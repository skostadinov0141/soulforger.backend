import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RulebookService } from './rulebook.service';
import { CreateRulebookDto } from './dto/create-rulebook.dto';
import { UpdateRulebookDto } from './dto/update-rulebook.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Rulebook } from './entities/rulebook.entity';

@Controller('rulebook')
@ApiTags('rulebook')
@ApiQuery({
  name: 'lang',
  required: false,
  type: String,
  enum: ['en', 'de'],
})
export class RulebookController {
  constructor(private readonly rulebookService: RulebookService) {}

  @Post()
  @ApiOkResponse({
    status: 201,
    type: Rulebook,
    description: 'Created rulebook',
  })
  @ApiBody({ type: CreateRulebookDto })
  create(@Body() createRulebookDto: CreateRulebookDto) {
    return this.rulebookService.create(createRulebookDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOkResponse({
    description: 'List of rulebooks',
    type: [Rulebook],
  })
  findAll(@Query('page') page: number = 0, @Query('limit') limit: number = 10) {
    return this.rulebookService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Rulebook details',
    type: Rulebook,
  })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.rulebookService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateRulebookDto })
  @ApiOkResponse({
    description: 'Updated rulebook',
    type: Rulebook,
  })
  update(
    @Param('id') id: string,
    @Body() updateRulebookDto: UpdateRulebookDto,
  ) {
    return this.rulebookService.update(id, updateRulebookDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({
    description: 'Deleted rulebook',
    type: Rulebook,
  })
  remove(@Param('id') id: string) {
    return this.rulebookService.remove(id);
  }
}
