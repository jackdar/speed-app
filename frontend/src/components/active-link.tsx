'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';

export default function ActiveLink({
  children,
  href,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  [key: string]: any;
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
      asChild
    >
      <Link {...props} href={href}>
        {children}
      </Link>
    </Button>
  );
}
