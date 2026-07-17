import React from 'react';
import { cn } from '@/lib/utils';
import Container from './Container';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  className,
  children,
}: PageHeaderProps) {
  return (
    <section className={cn('bg-slate-50 border-b border-slate-200 py-12 md:py-16', className)}>
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-h2 text-slate-900 mb-2">{title}</h1>
          {description && (
            <p className="text-body-lg text-slate-600 mb-4">{description}</p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
