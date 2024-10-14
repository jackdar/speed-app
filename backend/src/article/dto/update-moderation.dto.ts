import { User } from '../../user/user.schema';

export class UpdateModerationDto {
  moderatedBy: User;
  moderated: boolean;
  status: boolean;
  comments: string;
  moderatedDate: Date;
}
