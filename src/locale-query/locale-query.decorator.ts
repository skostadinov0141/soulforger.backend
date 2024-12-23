import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function LocaleQuery() {
  return applyDecorators(
    ApiQuery({
      name: 'lang',
      required: true,
      type: String,
      enum: ['en', 'de'],
      example: 'en',
      allowEmptyValue: false,
    }),
  );
}
