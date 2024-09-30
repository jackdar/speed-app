import ArticleTable from '@/components/article-table';

export default async function ModeratePage() {
  const articles = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/moderate`,
    {
      cache: 'no-store',
    },
  )
    .then((res) => res.json())
    .catch(console.error);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Moderation Queue</h1>
      <ArticleTable data={articles} />
    </div>
  );
}
