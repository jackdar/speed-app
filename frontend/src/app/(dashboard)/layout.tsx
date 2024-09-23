import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex flex-col max-w-full items-center min-h-screen bg-gray-100'>
      <div className='max-w-[1400px]'>{children}</div>
    </main>
  );
}
