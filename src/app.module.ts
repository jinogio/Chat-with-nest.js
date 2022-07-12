import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';

@Module({
  imports: [AppGateway],
  controllers: [],
  providers: [],
})
export class AppModule {}
