import { Article } from "@/app/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function ArticlesPage() {
  const articles: Article[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles`,
    { cache: "no-store" }
  )
    .then((res) => res.json())
    .catch(console.error);

  return (
    <div className="flex-1 flex justify-center items-start bg-[#8D8D8D] p-8">
      <div className="bg-gray-100 p-8 rounded shadow-md w-full">
        <h2 className=" text-2xl text-black mb-4 w-full text-start border-b border-black pb-2">
          Articles
        </h2>
        <div className="grid grid-cols-3 auto-rows-auto gap-4">
          {articles &&
            articles.map((article: Article, index: any) => (
              <Link href={`/articles/${article._id}`} key={index} passHref>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription>{article.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{article.journal}</p>
                    <p>{article.year}</p>
                    <p>{article.doi}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
