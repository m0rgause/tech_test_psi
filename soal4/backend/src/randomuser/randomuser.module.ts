import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RandomuserService } from './randomuser.service';
import { RandomuserController } from './randomuser.controller';

@Module({
  imports: [HttpModule],
  controllers: [RandomuserController],
  providers: [RandomuserService],
})
export class RandomuserModule {}
