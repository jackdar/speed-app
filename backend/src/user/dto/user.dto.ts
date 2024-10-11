import { UserDocument } from '../user.schema';

export class UserDto {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  bio?: string;
  articlesPublished?: string[];
  articlesModerated?: string[];
  articlesAnalysed?: string[];
  articlesRated?: Array<{ articleId: string; rating: number }>;

  constructor(user: UserDocument) {
    this._id = user._id as string;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
    this.bio = user.bio;
    this.articlesPublished = user.articlesPublished;
    this.articlesModerated = user.articlesModerated;
    this.articlesAnalysed = user.articlesAnalysed;
    this.articlesRated = user.articlesRated;
  }
}
