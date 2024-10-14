import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDto | null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new NotFoundException('User not found');

    return new UserDto(user);
  }

  async findById(id: string): Promise<UserDto | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');

    return new UserDto(user);
  }

  async getProfiles(): Promise<GetUserDto[]> {
    const users = await this.userModel.find().exec();
    return users.map((user) => new UserDto(user));
  }

  async rateArticle(
    id: string,
    articleId: string,
    rating: number,
  ): Promise<UserDto> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');

    if (rating === 0) {
      return await this.userModel.findOneAndUpdate(
        { _id: id, 'articlesRated.articleId': articleId },
        {
          $pull: {
            articlesRated: { articleId },
          },
        },
        { new: true },
      );
    }

    const article = await this.userModel.findOneAndUpdate(
      { _id: id, 'articlesRated.articleId': articleId },
      {
        $set: {
          'articlesRated.$.rating': rating,
          'articlesRates.$.ratedDate': new Date(),
        },
      },
      { upsert: false, new: true },
    );

    if (!article) {
      return await this.userModel.findByIdAndUpdate(
        id,
        {
          $push: {
            articlesRated: { articleId, rating, ratedDate: new Date() },
          },
        },
        { new: true },
      );
    }

    return new UserDto(user);
  }

  async register(createUserDto: CreateUserDto): Promise<UserDto> {
    const { firstName, lastName, email, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'registered',
    });

    return new UserDto(newUser);
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto | null> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) throw new NotFoundException('User not found');

    return new UserDto(updatedUser);
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
