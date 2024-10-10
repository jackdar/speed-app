'use client';

import withAuth from '@/lib/with-auth';

function ModeratePage() {
  //   const articles = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/admin/moderate`,
  //     {
  //       cache: 'no-store',
  //     },
  //   )
  //     .then((res) => res.json())
  //     .catch(console.error);

  return (
    <div className="flex-1 flex justify-center items-start bg-[#8D8D8D] p-8">
      <div className="bg-gray-100 p-8 rounded shadow-md w-full">
        <h2 className=" text-2xl text-black mb-4 w-full text-start border-b border-black pb-2">
          Moderation Queue
        </h2>
        {/* <ArticleTable data={ } /> */}
      </div>
    </div>
  );
}

export default withAuth(ModeratePage, 'moderator');
