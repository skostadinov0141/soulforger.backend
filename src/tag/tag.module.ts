import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './entities/tag.entity';
import { RulebookModule } from '../rulebook/rulebook.module';

@Module({
  controllers: [TagController],
  providers: [TagService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Tag.name,
        schema: TagSchema,
      },
    ]),
    RulebookModule,
  ],
  exports: [TagService, MongooseModule],
})
export class TagModule {}
