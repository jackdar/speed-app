"use client";

import withAuth from "@/lib/with-auth";

function AnalyzePage() {
  return (
    <div className="flex-1 flex justify-center items-start bg-[#8D8D8D] p-8">
      <div className="bg-gray-100 p-8 rounded shadow-md w-full">
        <h2 className=" text-2xl text-black mb-4 w-full text-start border-b border-black pb-2">
          Analysis Queue
        </h2>
        {/* <ArticleTable data /> */}
      </div>
    </div>
  );
}

export default withAuth(AnalyzePage, "analyst");
