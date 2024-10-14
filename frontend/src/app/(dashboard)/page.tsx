import ArticleFeedCard from '@/components/home-page/article-feed-card';
import HomeWelcomeCard from '@/components/home-page/welcome-card';

import { Article } from '@/types';

export default async function Home() {
  const articles: Article[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, { method: 'GET', cache: 'no-cache' }).then((res) =>
    res.json(),
  );

  return (
    <>
      <HomeWelcomeCard />
      <div className="flex-1 flex p-8 gap-12">
        <div className="flex flex-col gap-8 w-2/3">
          <h2 className="text-2xl">Recent Articles</h2>
          {articles.map((article) => (
            <ArticleFeedCard key={article._id} article={article} />
          ))}
        </div>
        <div className="flex flex-col gap-4 w-1/3">
          <h2 className="text-2xl">Recent Users</h2>
          {/* <UserList /> */}
        </div>
      </div>
    </>
  );
}

export const dynamic = 'force-dynamic';
