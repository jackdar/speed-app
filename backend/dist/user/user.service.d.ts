import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    register(userDto: any): Promise<User>;
    updateUser(id: string, updateDto: any): Promise<User | null>;
    validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
