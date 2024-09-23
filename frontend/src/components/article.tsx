"use client";

import { ArticleProps } from "@/types/Article";
import React from "react";

export const ArticleContext = React.createContext<ArticleProps>({
  id: "",
  title: "",
  author: "",
  publisher: "",
  journal: "",
  doi: "",
  isPosted: false,
  pagesEnd: 0,
  pagesStart: 0,
  volume: 0,
  year: 0,
  createdAt: "",
  updatedAt: "",
});

export const useArticleContext = () => React.useContext(ArticleContext);

// // Root component
// const Root = ({
//   children,
//   article,
// }: {
//   children: JSX.Element | JSX.Element[];
//   article: ArticleProps;
// }) => {
//   return (
//     <ArticleContext.Provider value={article}>
//       {children}
//     </ArticleContext.Provider>
//   );
// };

// // Title
// const Title = () => {
//   const { title, id } = useArticleContext();
//   return <a href={"/article/" + id}>{title}</a>;
// };

// // Author
// const Author = () => {
//   const { author } = useArticleContext();
//   return <p>{author}</p>;
// };

// // Export all elements of the article card
// const Article = {
//   Root: React.memo(Root),
//   Title: React.memo(Title),
//   Author: React.memo(Author),
// };

// export default Article;

// import * as React from "react";

import { cn } from "@/lib/utils";

const Article = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { article: ArticleProps }
>(({ article, className, ...props }, ref) => (
  <ArticleContext.Provider value={article}>
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        className
      )}
      {...props}
    >
      {props.children}
    </div>
  </ArticleContext.Provider>
));
Article.displayName = "Article";

const ArticleHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
ArticleHeader.displayName = "ArticleHeaders";

const ArticleTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { title } = useArticleContext();
  return (
    <h3
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    >
      {title}
    </h3>
  );
});
ArticleTitle.displayName = "ArticleTitle";

// const CardDescription = React.forwardRef<
//   HTMLParagraphElement,
//   React.HTMLAttributes<HTMLParagraphElement>
// >(({ className, ...props }, ref) => (
//   <p
//     ref={ref}
//     className={cn("text-sm text-muted-foreground", className)}
//     {...props}
//   />
// ));
// CardDescription.displayName = "CardDescription";

// const CardContent = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => (
//   <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
// ));
// CardContent.displayName = "CardContent";

// const CardFooter = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn("flex items-center p-6 pt-0", className)}
//     {...props}
//   />
// ));
// CardFooter.displayName = "CardFooter";

export { Article, ArticleHeader, ArticleTitle };
