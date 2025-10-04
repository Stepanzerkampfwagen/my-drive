import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from "../users/users.service"


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await this.usersService.create(email, hashedPassword)
        return { id: user.id, email: user.email }
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email)
        if (!user) throw new UnauthorizedException('Invalid credentials')

        const isValid = await bcrypt.compare(password, user.passwordHash)
        if (!isValid) throw new UnauthorizedException('Invalid credentials')

        const payload = { sub: user.id, email: user.email }
        return {
            accessToken: this.jwtService.sign(payload),
        }
    }
}