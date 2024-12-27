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
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiTags } from '@nestjs/swagger';
import { Tag } from './entities/tag.entity';
import { LocaleQuery } from '../locale-query/locale-query.decorator';

/**
 * CRUD routes for tags.
 */
@Controller('tag')
@ApiTags('tag')
@LocaleQuery()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  /**
   * Create a new tag.
   *
   * @throws {400} Bad Request
   * @throws {500} Internal Server Error
   * @throws
   */
  @Post()
  create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagService.create(createTagDto);
  }

  /**
   * Get all tags.
   *
   * @throws {400} Bad Request
   * @throws {500} Internal Server Error
   * @throws {404} Not Found
   */
  @Get()
  findAll(
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
    @Query('order') order: string = 'asc',
    @Query('populateRulebook') populateRulebook: boolean = false,
    @Query('rulebook') rulebook: string,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
  ): Promise<Tag[]> {
    return this.tagService.findAll(
      page,
      limit,
      rulebook,
      order,
      populateRulebook,
      search,
      sort,
    );
  }

  /**
   * Get a single tag by ID.
   *
   * @throws {400} Bad Request
   * @throws {500} Internal Server Error
   * @throws {404} Not Found
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tag> {
    return this.tagService.findOne(id);
  }

  /**
   * Update a tag by ID.
   *
   * @throws {400} Bad Request
   * @throws {500} Internal Server Error
   * @throws {404} Not Found
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<Tag> {
    return this.tagService.update(id, updateTagDto);
  }

  /**
   * Delete a tag by ID.
   *
   * @throws {400} Bad Request
   * @throws {500} Internal Server Error
   * @throws {404} Not Found
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Tag> {
    return this.tagService.remove(id);
  }
}
