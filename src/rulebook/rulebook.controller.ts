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
import { ApiTags } from '@nestjs/swagger';
import { Rulebook } from './entities/rulebook.entity';
import { LocaleQuery } from '../locale-query/locale-query.decorator';

/**
 * CRUD routes for rulebooks.
 */
@Controller('rulebook')
@ApiTags('rulebook')
@LocaleQuery()
export class RulebookController {
  constructor(private readonly rulebookService: RulebookService) {}

  /**
   * Create a new rulebook.
   *
   * @throws {400} Bad Request
   * @throws {409} Conflict
   * @throws {500} Internal Server Error
   */
  @Post()
  create(@Body() createRulebookDto: CreateRulebookDto): Promise<Rulebook> {
    return this.rulebookService.create(createRulebookDto);
  }

  /**
   * Retrieve all rulebooks.
   *
   * @throws {400} Bad Request
   * @throws {500} Internal Server Error
   */
  @Get()
  findAll(
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
  ): Promise<Rulebook[]> {
    return this.rulebookService.findAll(page, limit);
  }

  /**
   * Retrieve a single rulebook by its unique identifier.
   *
   * @throws {400} Bad Request
   * @throws {404} Not Found
   * @throws {500} Internal Server Error
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Rulebook> {
    return this.rulebookService.findOne(id);
  }

  /**
   * Update a rulebook by its unique identifier.
   *
   * @throws {400} Bad Request
   * @throws {404} Not Found
   * @throws {500} Internal Server Error
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRulebookDto: UpdateRulebookDto,
  ): Promise<Rulebook> {
    return this.rulebookService.update(id, updateRulebookDto);
  }

  /**
   * Delete a rulebook by its unique identifier.
   *
   * @throws {400} Bad Request
   * @throws {404} Not Found
   * @throws {500} Internal Server Error
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Rulebook> {
    return this.rulebookService.remove(id);
  }
}
