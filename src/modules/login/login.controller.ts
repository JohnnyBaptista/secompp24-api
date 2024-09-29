import {
  Controller,
  Post,
  Body,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';

interface User {
  id: string;
  username: string;
  password: string;
}

let users: User[] = [
  {
    id: '1',
    username: 'testuser1',
    password: 'password1',
  },
  {
    id: '2',
    username: 'testuser2',
    password: 'password2',
  },
];

@Controller('login')
export class LoginController {
  constructor() {}

  @Post()
  @HttpCode(200)
  async login(
    @Body() { username, password }: { username: string; password: string },
  ): Promise<User> {
    const user = users.find(
      (user) => user.username === username && user.password === password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  @Post('signUp')
  async signUp(
    @Body() { username, password }: { username: string; password: string },
  ): Promise<User> {
    const user = {
      id: (users.length + 1).toString(),
      username,
      password,
    };
    users.push(user);
    return user;
  }
}
