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

const formSchema = z.object({
  moderation_passed: z.boolean(),
  comments: z.string().min(2, {
    message: "Moderation comments must be at least 2 characters",
  }),
});

export default function ModerationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      moderation_passed: false,
      comments: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="moderation_passed"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Moderation State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Comments..." className="bg-white"/>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Moderate</Button>
      </form>
    </Form>
  );
}
