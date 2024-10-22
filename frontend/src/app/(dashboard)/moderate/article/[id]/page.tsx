import ModerationForm from "@/components/moderation/moderation-form";
import { Article } from "@/types";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function ModerateArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const article: Article = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/${params.id}`,
  )
    .then((res) => res.json())
    .catch(console.error);

  return (
    <div className="flex-1 flex justify-center items-start bg-[#8D8D8D] p-8 gap-8">
      <div className="bg-gray-200 p-8 rounded shadow-md w-full">
        <div className="flex flex-row gap-4 text-2xl text-black mb-4 pb-4 w-full text-start border-b border-black items-center">
          <Link href="/articles">
            <ChevronLeft />
          </Link>
          {article.title}
        </div>
        <div>
          <p>Journal: {article.journal}</p>
          <p>Year: {article.year}</p>
          <p>DOI: {article.doi}</p>
        </div>
        <div>
          <p>Publisher: {article.publisher}</p>
          <p>Volume: {article.volume}</p>
          <p>
            Pages: {article.pagesStart} - {article.pagesEnd}
          </p>
        </div>
      </div>
      <div className="bg-gray-200 p-8 rounded shadow-md w-full">
        <div className="flex flex-row gap-4 text-2xl text-black mb-4 pb-4 w-full text-start border-b border-black items-center">
          Moderation Options
        </div>
        <ModerationForm />
      </div>
    </div>
  );
}
