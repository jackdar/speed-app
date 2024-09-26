import React from "react";

export default async function ArticlesPage() {
  const articles = await fetch(`${process.env.API_ORIGIN}/articles`)
    .then((res) => res.json())
    .catch(console.error);

  return (
    <div>
      {articles.map((article: any, index: any) => (
        <div key={index}>
          {article.title}-{article.author}
        </div>
      ))}
    </div>
  );
}