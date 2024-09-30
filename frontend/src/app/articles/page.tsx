import React from "react";

export default async function ArticlesPage() {
  const articles = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`)
    .then((res) => res.json())
    .catch(console.error);

  return (
    <div>
      {articles &&
        articles.map((article: any, index: any) => (
          <div key={index}>
            {article.title}-{article.author}
          </div>
        ))}
    </div>
  );
}
