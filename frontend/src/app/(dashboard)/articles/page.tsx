import { Article, ArticleTitle } from "@/components/article";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArticleProps } from "@/types/Article";
import React from "react";

export default async function ArticlesPage() {
  const articles: ArticleProps[] = await fetch(
    `${process.env.API_ORIGIN}/articles`,
    { cache: "no-store" }
  )
    .then((res) => res.json())
    .catch(console.error);

  return (
    <div className='p-8 grid grid-cols-3 auto-rows-auto gap-4'>
      {articles.map((article: ArticleProps, index: any) => (
        <Card key={index} className='w-80'>
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
      ))}
    </div>
  );
}
