import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(userDto: any): Promise<any>;
    login(loginDto: {
        email: string;
        password: string;
    }): Promise<any>;
    getProfile(req: any): any;
}
