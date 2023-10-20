import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './DTO/signup.dto';
import { LoginDto } from './DTO/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { name, email, username, password} = signUpDto

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await this.userModel.create({
            name, email, username, password: hashedPassword
        })

        const token = this.jwtService.sign({ id: user._id })

        return { token }
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { username, password } = loginDto;
        
        const user = await this.userModel.findOne({ username })

        if(!user){
            throw new UnauthorizedException('Invalid username or password!')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid username or password!')
        }

        const token = this.jwtService.sign({ id: user._id })

        return { token }
    }
}
