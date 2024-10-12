import { ApiProperty } from '@nestjs/swagger';

export class GetPathRegistryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  path: string;
}
