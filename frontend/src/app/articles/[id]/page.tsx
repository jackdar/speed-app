import React from "react";

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const articles = await fetch(
    `${process.env.API_ORIGIN}/articles/${params.id}`
  );

  return <div>ArticlePage</div>;
}
