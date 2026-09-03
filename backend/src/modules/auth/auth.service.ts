import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login(email: string, password: string) {
    return { access_token: 'demo-token', user: { email, password } };
  }

  async register(data: any) {
    return { message: 'User registered', data };
  }

  async validateUser(email: string) {
    return { email };
  }
}
