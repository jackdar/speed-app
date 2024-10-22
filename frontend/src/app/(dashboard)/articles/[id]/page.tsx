"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Article } from "@/types";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import ModerationForm from "@/components/moderation/moderation-form";

export default function ArticlePage({ params }: { params: { id: string } }) {
  const { token, user } = useAuth();
  const [article, setArticle] = useState<Article | null>(null);
  const [summary, setSummary] = useState("");
  const [keyFindingInput, setKeyFindingInput] = useState("");
  const [keyFindings, setKeyFindings] = useState<string[]>([]);
  const [methodology, setMethodology] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isAnalyst =
    (user && user.role === "analyst") || (user && user.role === "admin");

  const isModerator =
    (user && user.role === "moderator") || (user && user.role === "admin");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/articles/${params.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!res.ok) {
          throw new Error("Failed to fetch article");
        }
        const articleData: Article = await res.json();
        setArticle(articleData);

        if (articleData.analysis) {
          setSummary(articleData.analysis.summary || "");
          setKeyFindings(articleData.analysis.keyFindings || []);
          setMethodology(articleData.analysis.methodology || "");
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      fetchArticle();
    }
  }, [params.id, token]);

  const handleAddKeyFinding = () => {
    if (keyFindingInput.trim() !== "") {
      setKeyFindings([...keyFindings, keyFindingInput.trim()]);
      setKeyFindingInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    if (!summary || !methodology || keyFindings.length === 0) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/articles/${params.id}/analysis/approve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            summary,
            keyFindings,
            methodology,
            status: "approved",
            isPosted: true,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to submit analysis");
      }

      setSuccessMessage("Analysis approved and article posted successfully.");
    } catch (error) {
      console.error(error);
      setError("An error occurred while submitting the analysis.");
    }
  };

  const handleReject = async () => {
    setError("");
    setSuccessMessage("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/articles/${params.id}/analysis/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: "rejected",
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to reject analysis");
      }

      setSuccessMessage("Analysis rejected successfully.");
    } catch (error) {
      console.error(error);
      setError("An error occurred while rejecting the analysis.");
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 flex justify-center items-start bg-[#8D8D8D] p-8">
      <div className="bg-gray-200 p-8 rounded shadow-md w-full">
        <div className="flex flex-row gap-4 text-2xl text-black mb-4 pb-4 w-full text-start border-b border-black items-center">
          <Link href="/articles">
            <ChevronLeft />
          </Link>
          {article.title}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{article.title}</CardTitle>
            <CardDescription>{article.author}</CardDescription>
          </CardHeader>
          <CardContent>
            <>
              <div
                className={
                  article.analysis && article.analysis.analysed
                    ? `grid gap-4 grid-cols-3`
                    : `grid gap-4 grid-cols-2`
                }
              >
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
                {article.analysis && article.analysis.status === "approved" && (
                  <>
                    <div>
                      <p>Methodology: {article.analysis.methodology}</p>
                      <p>Key Findings:</p>
                      <ul>
                        {article.analysis.keyFindings.map((finding, index) => (
                          <li key={index}>- {finding}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p>Article summary:</p>
                      <p>{article.analysis.summary}</p>
                    </div>
                  </>
                )}
              </div>
            </>
          </CardContent>
        </Card>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Submit Moderation</h2>
          {isModerator && <ModerationForm article={article} />}
        </div>
        {isAnalyst && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Submit Analysis</h2>
              {error && <p className="text-red-500 mb-2">{error}</p>}
              {successMessage && (
                <p className="text-green-500 mb-2">{successMessage}</p>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Summary
                  </label>
                  <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={5}
                    className="w-full rounded-lg border border-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Key Findings
                  </label>
                  <div className="flex mb-2">
                    <Input
                      value={keyFindingInput}
                      onChange={(e) => setKeyFindingInput(e.target.value)}
                      className="flex-grow bg-white"
                    />
                    <Button
                      type="button"
                      onClick={handleAddKeyFinding}
                      className="ml-2"
                    >
                      Add
                    </Button>
                  </div>
                  <div>
                    {keyFindings.map((finding, index) => (
                      <p key={index} className="list-disc ml-5">
                        - {finding}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Methodology
                  </label>
                  <Select value={methodology} onValueChange={setMethodology}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select a methodology" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Waterfall">Waterfall</SelectItem>
                      <SelectItem value="Agile">Agile</SelectItem>
                      <SelectItem value="Kanban">Kanban</SelectItem>
                      <SelectItem value="SCRUM">SCRUM</SelectItem>
                      <SelectItem value="Extreme Programming">
                        Extreme Programming
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-4">
                  <Button type="submit">Approve Analysis</Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleReject}
                  >
                    Reject Article
                  </Button>
                </div>
              </form>
            </div>
          )}
      </div>
    </div>
  );
}
