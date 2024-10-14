import { User } from '@/types';
import { Avatar } from '../ui/avatar';
import { Card, CardDescription, CardTitle } from '../ui/card';

export default function UserCard({ user }: { user: User }) {
  return (
    <Card className="flex flex-row items-center p-4 gap-4 rounded">
      <Avatar className="justify-center items-center bg-gray-50">
        {user.firstName?.charAt(0).toUpperCase() + user.lastName?.charAt(0).toUpperCase()}
      </Avatar>
      <div className="flex flex-col justify-center h-fit">
        <CardTitle>
          {user.firstName} {user.lastName}
        </CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </div>
    </Card>
  );
}
