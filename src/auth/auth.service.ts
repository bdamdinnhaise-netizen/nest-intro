import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service.js';
import { User } from '../users/users.schema.js';
import { JwtPayload } from './jwt.strategy.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        if (await this.usersService.existsByEmail(dto.email)) {
            throw new ConflictException('Email is already registered');
    }

    const user = await this.usersService.create({
        name: dto.name,
        email: dto.email,
        password: await bcrypt.hash(dto.password, 10),
    });

    return {
        user: { id: user.id, name: user.name, email: user.email },
        access_token: await this.signToken(user),
    };
}

async login(dto: LoginDto) {
    const user = await this.usersService