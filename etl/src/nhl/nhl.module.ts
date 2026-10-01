import { Module } from '@nestjs/common';
import { NhlService } from './nhl.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://api-web.nhle.com/v1',
      headers: { 'Content-Type': 'application/json' },
    }),
  ],
  exports: [HttpModule, NhlService],
  providers: [NhlService],
})
export class NhlModule {}
