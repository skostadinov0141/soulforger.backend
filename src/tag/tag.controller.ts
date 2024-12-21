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
import {
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Tag } from './entities/tag.entity';

@Controller('tag')
@ApiTags('tag')
@ApiQuery({
  name: 'lang',
  required: false,
  type: String,
  enum: ['en', 'de'],
})
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiBody({ type: CreateTagDto })
  @ApiOkResponse({
    status: 201,
    description: 'Tag created',
    type: Tag,
  })
  create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagService.create(createTagDto);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'rulebook',
    required: true,
    type: String,
    description: 'Rulebook ID',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search query',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    type: String,
    enum: ['asc', 'desc'],
    description: 'Sort order',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    type: String,
    description: 'Sort by field',
  })
  @ApiQuery({
    name: 'populateRulebook',
    required: false,
    type: Boolean,
    description: 'Populate rulebook',
  })
  @ApiOkResponse({
    status: 200,
    description: 'List of tags',
    type: [Tag],
  })
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
  @ApiOkResponse({
    status: 200,
    description: 'Tag found',
    type: Tag,
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Tag ID',
  })
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Tag ID',
  })
  @ApiBody({ type: UpdateTagDto })
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(id, updateTagDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Tag ID',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Tag deleted',
    type: Tag,
  })
  remove(@Param('id') id: string) {
    return this.tagService.remove(id);
  }
}
