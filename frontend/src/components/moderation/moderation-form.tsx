"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Article } from "@/types";
import { capitalise } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { toast, useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  moderation_passed: z.string(),
  comments: z.string().min(2, {
    message: "Moderation comments must be at least 2 characters",
  }),
});

export default function ModerationForm({ article }: { article: Article }) {
  const { token, user } = useAuth();
  const [status, setStatus] = useState<string>(article.moderation.status);
  const [comments, setComments] = useState<string>(article.moderation.comments);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (comments.length === 0) {
      setError("Please enter comments!");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/moderate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            articleId: article._id,
            moderationDetails: {
              moderatorId: user?._id,
              moderated: true,
              moderation_passed: status === "approved",
              status,
              comments,
              moderatedDate: new Date(),
            },
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to submit moderation");
      }

      toast({
        title: "Moderation successfully submitted!",
      });
    } catch (ex) {
      console.log(ex);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: "Please see the console for more info.",
      });
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-2">
      <Select value={status} onValueChange={(e) => setStatus(e)}>
        <SelectTrigger className="bg-white">
          <SelectValue placeholder="Pending" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rejected">Rejected</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
        </SelectContent>
      </Select>
      <Textarea
        placeholder="Comments..."
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        className="bg-white"
      />
      <Button type="submit">Moderate</Button>
    </form>
  );
}
