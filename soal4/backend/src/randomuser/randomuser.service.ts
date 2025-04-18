import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  RandomUserResponse,
  TransformedUser,
} from 'src/users/interfaces/randomuser-response.interface';

@Injectable()
export class RandomuserService {
  constructor(private readonly httpService: HttpService) {}

  getUsers(results: number = 10, page: number = 1) {
    const url = `${process.env.RANDOMUSER_API_URL}?results=${results}&page=${page}`;

    return this.httpService.get(url).pipe(
      map((response) => {
        const users: RandomUserResponse[] = response.data.results;
        return users.map((user) => this.transformUser(user));
      }),
      catchError((error) => {
        console.error('Error fetching data:', error);
        return throwError(() => new Error('Failed to fetch users'));
      }),
    );
  }
  private transformUser(user: RandomUserResponse): TransformedUser {
    return {
      name: `${user.name.first} ${user.name.last}`,
      location: `${user.location.city}, ${user.location.state}, ${user.location.country}`,
      email: user.email,
      age: user.dob.age,
      phone: user.phone,
      cell: user.cell,
      picture: [
        user.picture.large,
        user.picture.medium,
        user.picture.thumbnail,
      ],
    };
  }
}
