import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { CharacterModule } from './character/character.module';
import { RulebookModule } from './rulebook/rulebook.module';
import { TagModule } from './tag/tag.module';
import * as process from 'node:process';
import { I18nModule, QueryResolver } from 'nestjs-i18n';
import { GroupModule } from './group/group.module';
// import { AttributeTemplateModule } from './attribute-template/attribute-template.module';
import { CharacterFieldPathService } from './character-field-path/character-field-path.service';
import { DiceRollService } from './dice-roll/dice-roll.service';
import { DiceRollModule } from './dice-roll/dice-roll.module';
import { CharacterFieldPathModule } from './character-field-path/character-field-path.module';
import { CalculatedNumericValueModule } from './calculated-numeric-value/calculated-numeric-value.module';
import { FixedNumericValueModule } from './fixed-numeric-value/fixed-numeric-value.module';
import { TextValueModule } from './text-value/text-value.module';
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
    // CharacterModule,
    RulebookModule,
    TagModule,
    GroupModule,
    // AttributeTemplateModule,
    DiceRollModule,
    CharacterFieldPathModule,
    CalculatedNumericValueModule,
    FixedNumericValueModule,
    TextValueModule,
  ],
  controllers: [],
  providers: [CharacterFieldPathService, DiceRollService],
})
export class AppModule {}
