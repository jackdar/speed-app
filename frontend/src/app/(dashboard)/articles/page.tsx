import ArticleTable from '@/components/article-table/article-table';
import { Article } from '@/types';

export default async function ArticlesPage() {
  const articles: Article[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles`,
    { cache: 'no-store' },
  )
    .then((res) => res.json())
    .catch(console.error);

  return <ArticleTable data={articles} />;
}
