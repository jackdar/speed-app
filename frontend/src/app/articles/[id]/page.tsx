import React from "react";

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const articles = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/${params.id}`
  );

  return <div>ArticlePage</div>;
}
