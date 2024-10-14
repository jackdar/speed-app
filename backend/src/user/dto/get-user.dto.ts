import { Article } from '../../article/article.schema';
import { UserRating } from '../user.schema';

export class GetUserDto {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  bio?: string;
  articlesPublished?: Article[];
  articlesModerated?: Article[];
  articlesAnalysed?: Article[];
  articlesRated?: UserRating[];
}
