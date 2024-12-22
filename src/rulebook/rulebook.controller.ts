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
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

/**
 * CRUD routes for rulebooks.
 */
@Controller('rulebook')
@ApiTags('rulebook')
@ApiQuery({
  name: 'lang',
  required: true,
  type: String,
  enum: ['en', 'de'],
  example: 'en',
  allowEmptyValue: false,
})
export class RulebookController {
  constructor(private readonly rulebookService: RulebookService) {}

  /**
   * Create a new rulebook.
   */
  @Post()
  create(@Body() createRulebookDto: CreateRulebookDto) {
    return this.rulebookService.create(createRulebookDto);
  }

  /**
   * Retrieve all rulebooks.
   */
  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 0 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  findAll(@Query('page') page: number = 0, @Query('limit') limit: number = 10) {
    return this.rulebookService.findAll(page, limit);
  }

  /**
   * Retrieve a single rulebook by its unique identifier.
   */
  @Get(':id')
  @ApiParam({ name: 'id', type: String, example: '6768691c0767ae795feb2c60' })
  findOne(@Param('id') id: string) {
    return this.rulebookService.findOne(id);
  }

  /**
   * Update a rulebook by its unique identifier.
   */
  @Patch(':id')
  @ApiParam({ name: 'id', type: String, example: '6768691c0767ae795feb2c60' })
  update(
    @Param('id') id: string,
    @Body() updateRulebookDto: UpdateRulebookDto,
  ) {
    return this.rulebookService.update(id, updateRulebookDto);
  }

  /**
   * Delete a rulebook by its unique identifier.
   */
  @Delete(':id')
  @ApiParam({ name: 'id', type: String, example: '6768691c0767ae795feb2c60' })
  remove(@Param('id') id: string) {
    return this.rulebookService.remove(id);
  }
}
