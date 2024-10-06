import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tag } from './entities/tag.entity';

@ApiTags('tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiOkResponse({ description: 'Tag created successfully', type: Tag })
  @ApiBody({ type: CreateTagDto })
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get('rulebook/:rulebook')
  @ApiResponse({
    status: 200,
    description: 'Return all tags by rulebook',
    type: [Tag],
  })
  findAllByRulebook(@Param('rulebook') rulebook: string) {
    return this.tagService.findAllByRulebook(rulebook);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return all tags', type: [Tag] })
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return a tag', type: Tag })
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Tag updated successfully', type: Tag })
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(id, updateTagDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Tag deleted successfully' })
  remove(@Param('id') id: string) {
    return this.tagService.remove(id);
  }
}
