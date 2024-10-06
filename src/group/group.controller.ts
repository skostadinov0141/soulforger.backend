import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Group } from './entities/group.entity';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiOkResponse({ description: 'Group created', type: Group })
  @ApiBody({ type: CreateGroupDto })
  create(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  @ApiResponse({ description: 'Groups found', type: [Group], status: 200 })
  findAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }

  @Get('rulebook/:rulebook')
  @ApiResponse({ description: 'Groups found', type: [Group], status: 200 })
  findAllByRulebook(@Param('rulebook') rulebook: string): Promise<Group[]> {
    return this.groupService.findAllByRulebook(rulebook);
  }

  @Get(':id')
  @ApiResponse({ description: 'Group found', type: Group, status: 200 })
  findOne(@Param('id') id: string): Promise<Group> {
    return this.groupService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Group updated', type: Group })
  @ApiBody({ type: UpdateGroupDto })
  update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    return this.groupService.update(id, updateGroupDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Group deleted', type: Group, status: 200 })
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }
}
