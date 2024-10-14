import { Article } from '../../article/article.schema';
import { UserDocument, UserRating } from '../user.schema';

export class UserDto {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  bio?: string;
  articlesSubmitted?: Article[];
  articlesModerated?: Article[];
  articlesAnalysed?: Article[];
  articlesRated?: UserRating[];

  constructor(user: UserDocument) {
    this._id = user._id as string;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
    this.bio = user.bio;
    this.articlesSubmitted = user.articlesSubmitted;
    this.articlesModerated = user.articlesModerated;
    this.articlesAnalysed = user.articlesAnalysed;
    this.articlesRated = user.articlesRated;
  }
}
