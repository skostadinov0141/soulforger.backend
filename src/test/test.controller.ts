import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly service: TestService) {}

  @Get()
  test() {
    return this.service
      .test()
      .tarjan()
      .map((item) => item.length)
      .join(',');
  }
}
