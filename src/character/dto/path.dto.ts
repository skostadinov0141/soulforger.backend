import { ApiProperty } from '@nestjs/swagger';

export class PathDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  path: string;
}
