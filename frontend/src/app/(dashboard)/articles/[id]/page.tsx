import { Article } from '@/app/types';

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const article: Article = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/article/${params.id}`,
  )
    .then((res) => res.json())
    .catch(console.error);

  return <div>ArticlePage – Article {article.title}</div>;
}
