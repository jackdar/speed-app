"use client";

import ArticleTable from "@/components/article-table";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import withAuth from "@/lib/with-auth";
import { Article } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function ModeratePage() {
  const { token } = useAuth();
  const [modQueue, setModQueue] = useState<Article[] | null>(null);
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

        setModQueue(data);
      } catch (ex) {
        console.error(ex);
      }
    };

    fetchModQueue();
  }, [token]);

  return (
    modQueue && (
      <>
        <div className="flex justify-center items-start bg-[#8D8D8D] p-8">
          <div className="bg-gray-100 p-8 rounded shadow-md w-3/4">
            <h2 className="flex flex-row justify-between text-2xl text-black mb-8 w-full text-start border-b border-black pb-2">
              Moderation Queue
              <Button
                variant="outline"
                className="border-black"
                onClick={() => router.back()}
              >
                Back
              </Button>
            </h2>
            {modQueue.length} left in queue
          </div>
        </div>
        <div className="flex w-full h-full">
          <ArticleTable data={modQueue} mode='mod' />
        </div>
      </>
    )
  );
}

export default withAuth(ModeratePage, "moderator");
