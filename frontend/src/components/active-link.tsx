'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';

export default function ActiveLink({
  children,
  href,
  onClick
}: {
  children: React.ReactNode;
  href: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Button
      variant="ghost"
      className={cn(
        'hover:bg-accent hover:text-accent-foreground',
        isActive && 'bg-accent text-accent-foreground',
      )}
      onClick={onClick}
      asChild
    >
      <Link href={href}>
        {children}
      </Link>
    </Button>
  );
}
