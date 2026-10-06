import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards}
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from '@Jwt-auth.guard.js';
import type { AuthRequest } from '.jwt.strategy.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
    
    @Get('me')
    @UseGuards(JwtAuthGuard)
    me(@Req() req: AuthRequest) {
        return this.authService.profile(req.user.sub);
    }
}