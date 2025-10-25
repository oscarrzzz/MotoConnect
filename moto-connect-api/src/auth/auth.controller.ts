import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Registro de usuario
  @Post('register')
  async register(
    @Body() body: { name: string; email: string; password: string },
  ) {
    const { name, email, password } = body;

    if (!name || !email || !password) {
      throw new BadRequestException('Todos los campos son obligatorios');
    }

    try {
      const user = await this.authService.register(name, email, password);
      return { message: 'Usuario registrado correctamente', user };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Login de usuario
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    if (!email || !password) {
      throw new BadRequestException('Email y contraseña son obligatorios');
    }

    const token = await this.authService.login(email, password);
    if (!token) {
      throw new BadRequestException('Credenciales inválidas');
    }

    return { message: 'Login exitoso', ...token };
  }
}
