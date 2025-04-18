import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  name: string;

  @Expose()
  location: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  picture: string;
}
