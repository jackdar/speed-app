import ArticleFeedCard from '@/components/home-page/article-feed-card';
import UserCard from '@/components/home-page/user-card';
import HomeWelcomeCard from '@/components/home-page/welcome-card';

import { Article, User } from '@/types';

export default async function Home() {
  const articles: Article[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, { method: 'GET', cache: 'no-cache' }).then((res) =>
    res.json(),
  );

  const users: User[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profiles`, {
    method: 'GET',
    cache: 'no-cache',
  })
    .then((res) => res.json())
    .then((data) => data.filter((user: User) => user.firstName && user.lastName));

  return (
    <>
      <div className="flex justify-center items-center bg-[#8D8D8D] py-16 px-16 lg:px-0">
        <HomeWelcomeCard className="w-full lg:w-2/3" />
      </div>
      <div className="flex-1 flex my-16 px-16 lg:px-0 gap-12 w-full lg:w-2/3 mx-auto">
        <div className="flex flex-col gap-4 w-full xl:w-2/3">
          <h2 className="text-2xl">Recent Articles</h2>
          {articles.map((article) => (
            <ArticleFeedCard key={article._id} article={article} />
          ))}
        </div>
        <div className="hidden xl:flex flex-col gap-4 w-1/3">
          <h2 className="text-2xl">New Users</h2>
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </div>
    </>
  );
}

export const dynamic = 'force-dynamic';
