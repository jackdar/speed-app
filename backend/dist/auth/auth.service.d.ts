import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(userDto: any): Promise<any>;
    login(email: string, password: string): Promise<any>;
}
