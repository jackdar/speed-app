import { UsersService } from './user.service';
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUser(id: string): Promise<import("./user.schema").User>;
    updateUser(id: string, updateDto: any): Promise<import("./user.schema").User>;
}
