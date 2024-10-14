import { User } from '../../user/user.schema';

export class UpdateRatingDto {
  ratedBy: User;
  rating: number;
  ratedDate: Date;
}
