"use client";

import ArticleTable from "@/components/article-table";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import withAuth from "@/lib/with-auth";
import { Article } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function AnalysePage() {
  const { token } = useAuth();
  const [analystQueue, setAnalystQueue] = useState<Article[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchModQueue = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(res.statusText);

        const data = await res.json();

        console.log(data);

        const filteredArticles = data.filter((article: Article) => {
          const moderationApproved =
            article.moderation && article.moderation.status === "approved";
          const analysisPending =
            !article.analysis || article.analysis.status === "pending";

          return moderationApproved && analysisPending;
        });

        setAnalystQueue(filteredArticles);
      } catch (e) {
        console.error(e);
      }
    };

    fetchModQueue();
  }, [token]);

  return (
    analystQueue && (
      <>
        <div className="flex justify-center items-start bg-[#8D8D8D] p-8">
          <div className="bg-gray-100 p-8 rounded shadow-md w-3/4">
            <h2 className="flex flex-row justify-between text-2xl text-black mb-8 w-full text-start border-b border-black pb-2">
              Analysis Queue
              <Button
                variant="outline"
                className="border-black"
                onClick={() => router.back()}
              >
                Back
              </Button>
            </h2>
            {analystQueue.length} left in queue
          </div>
        </div>
        <div className="flex w-full h-full">
          <ArticleTable data={analystQueue} mode="analyse" />
        </div>
      </>
    )
  );
}

export default withAuth(AnalysePage, "analyst");
