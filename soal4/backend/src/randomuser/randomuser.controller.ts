import { Controller, Get, Query } from '@nestjs/common';
import { RandomuserService } from './randomuser.service';
import { GetUsersDto } from 'src/users/dto/get-users.dto';
import { lastValueFrom } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class RandomuserController {
  constructor(private readonly randomuserService: RandomuserService) {}

  @ApiQuery({ name: 'results', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiResponse({ status: 200, type: [UserResponseDto] })
  @Get()
  async getUsers(@Query() queryParams: GetUsersDto) {
    const users = await lastValueFrom(
      this.randomuserService.getUsers(queryParams.results, queryParams.page),
    );
    return users.map((user) => plainToClass(UserResponseDto, user));
  }
}
