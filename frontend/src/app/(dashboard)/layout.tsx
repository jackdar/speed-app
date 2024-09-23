import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex flex-col max-w-full items-center min-h-screen bg-gray-100'>
      <div className='flex items-center justify-between w-full p-6 bg-white shadow-md'>
        Navbar example
      </div>
      <div className='w-[1400px] p-8'>{children}</div>
    </main>
  );
}
