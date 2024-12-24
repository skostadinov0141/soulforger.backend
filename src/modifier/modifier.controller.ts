import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModifierService } from './modifier.service';
import { CreateModifierDto } from './dto/create-modifier.dto';
import { UpdateModifierDto } from './dto/update-modifier.dto';

@Controller('modifier')
export class ModifierController {
  constructor(private readonly modifierService: ModifierService) {}

  @Post()
  create(@Body() createModifierDto: CreateModifierDto) {
    return this.modifierService.create(createModifierDto);
  }

  @Get()
  findAll() {
    return this.modifierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modifierService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModifierDto: UpdateModifierDto) {
    return this.modifierService.update(+id, updateModifierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modifierService.remove(+id);
  }
}
