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
import { AttributeGroupService } from './attribute-group.service';
import { CreateAttributeGroupDto } from './dto/create-attribute-group.dto';
import { UpdateAttributeGroupDto } from './dto/update-attribute-group.dto';
import { AttributeGroup } from './entities/attribute-group.entity';
import { ApiTags } from '@nestjs/swagger';

/**
 * CRUD routes for attribute groups.
 */
@Controller('attribute/group')
@ApiTags('attribute')
export class AttributeGroupController {
  constructor(private readonly attributeGroupService: AttributeGroupService) {}

  /**
   * Create a new attribute group.
   *
   * @throws {400} Bad Request
   * @throws {500} Internal Server Error
   * @throws {404} Not Found
   */
  @Post()
  create(
    @Body() createAttributeGroupDto: CreateAttributeGroupDto,
  ): Promise<AttributeGroup> {
    return this.attributeGroupService.create(createAttributeGroupDto);
  }

  /**
   * Get all attribute groups, based on a query.
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
  ): Promise<AttributeGroup[]> {
    return this.attributeGroupService.findAll(
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
   * Get a single attribute group.
   *
   * @throws {400} Bad Request
   * @throws {500} Internal Server Error
   * @throws {404} Not Found
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<AttributeGroup> {
    return this.attributeGroupService.findOne(id);
  }

  /**
   * Update an attribute group.
   *
   * @throws {400} Bad Request
   * @throws {500} Internal Server Error
   * @throws {404} Not Found
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttributeGroupDto: UpdateAttributeGroupDto,
  ): Promise<AttributeGroup> {
    return this.attributeGroupService.update(id, updateAttributeGroupDto);
  }

  /**
   * Delete an attribute group.
   *
   * @throws {400} Bad Request
   * @throws {500} Internal Server Error
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<AttributeGroup> {
    return this.attributeGroupService.remove(id);
  }
}
