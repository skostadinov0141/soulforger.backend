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
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
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
   * @throws {Error} 400 - Bad Request
   * @throws {Error} 500 - Internal Server Error
   * @throws
   */
  @Post()
  create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagService.create(createTagDto);
  }

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(id);
  }
}
