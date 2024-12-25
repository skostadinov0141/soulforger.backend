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
import { ModifierService } from './modifier.service';
import { CreateModifierDto } from './dto/create-modifier.dto';
import { UpdateModifierDto } from './dto/update-modifier.dto';
import { ApiTags } from '@nestjs/swagger';
import { Modifier } from './entities/modifier.entity';

/**
 * CRUD operations for Modifiers.
 */
@Controller('modifier')
@ApiTags('modifier')
export class ModifierController {
  constructor(private readonly modifierService: ModifierService) {}

  /**
   * Create a new Modifier.
   *
   * @throws {400} Bad Request
   * @throws {500} Internal Server Error
   * @throws {404} Not Found
   */
  @Post()
  create(@Body() createModifierDto: CreateModifierDto): Promise<Modifier> {
    return this.modifierService.create(createModifierDto);
  }

  /**
   * Get all Modifiers, based on a query.
   *
   * @throws {400} Bad Request
   * @throws {500} Internal Server Error
   * @throws {404} Not Found
   */
  @Get()
  findAll(
    @Query('rulebook') rulebook: string,
    populateRulebook: boolean = false,
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
  ): Promise<Modifier[]> {
    return this.modifierService.findAll(
      rulebook,
      populateRulebook,
      page,
      limit,
    );
  }

  /**
   * Get a Modifier by its ID.
   *
   * @throws {400} Bad Request
   * @throws {500} Internal Server Error
   * @throws {404} Not Found
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Modifier> {
    return this.modifierService.findOne(id);
  }

  /**
   * Update a Modifier by its ID.
   *
   * @throws {400} Bad Request
   * @throws {500} Internal Server Error
   * @throws {404} Not Found
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateModifierDto: UpdateModifierDto,
  ): Promise<Modifier> {
    return this.modifierService.update(id, updateModifierDto);
  }

  /**
   * Remove a Modifier by its ID.
   *
   * @throws {400} Bad Request
   * @throws {500} Internal Server Error
   * @throws {404} Not Found
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Modifier> {
    return this.modifierService.remove(id);
  }
}
