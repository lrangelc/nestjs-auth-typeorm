import {
  Controller,
  Get,
  Param,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { Public, IS_PUBLIC_KEY } from './auth/decorators/public.decorator';
@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @SetMetadata(IS_PUBLIC_KEY, true)
  @Get('nuevo')
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Public()
  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }

  @Get('tasks')
  getTasks(): Promise<any> {
    return this.appService.getTasks();
  }
}
