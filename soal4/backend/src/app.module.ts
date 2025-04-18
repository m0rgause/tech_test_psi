import { Module } from '@nestjs/common';
import { RandomuserModule } from './randomuser/randomuser.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RandomuserModule, ConfigModule.forRoot()],
})
export class AppModule {}
