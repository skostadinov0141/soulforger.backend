import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { CharacterModule } from './character/character.module';
import * as process from 'node:process';
import { I18nModule, QueryResolver } from 'nestjs-i18n';
import { RulebookModule } from './rulebook/rulebook.module';
import { TagModule } from './tag/tag.module';
import { AttributeGroupModule } from './attribute-group/attribute-group.module';
import { ModifierModule } from './modifier/modifier.module';
import * as path from 'node:path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [{ use: QueryResolver, options: ['lang'] }],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`,
    ),
    RulebookModule,
    TagModule,
    AttributeGroupModule,
    ModifierModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
