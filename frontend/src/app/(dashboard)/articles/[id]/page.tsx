import { ArticleProps } from "@/types/Article";
import React from "react";

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const article: ArticleProps = await fetch(
    `${process.env.API_ORIGIN}/articles/${params.id}`
  )
    .then((res) => res.json())
    .catch(console.error);

  return <div>ArticlePage – Article {article.title}</div>;
}
