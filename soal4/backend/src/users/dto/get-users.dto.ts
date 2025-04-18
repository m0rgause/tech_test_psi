import { IsInt, Min } from 'class-validator';

export class GetUsersDto {
  @IsInt()
  @Min(1)
  results: number = 10;

  @IsInt()
  @Min(1)
  page: number = 1;
}
