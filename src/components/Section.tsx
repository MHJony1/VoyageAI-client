import React from 'react';
import { cn } from '@/lib/utils';
import Container from './Container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  container?: boolean;
  padding?: 'sm' | 'default';
  bgColor?: 'white' | 'gray' | 'gradient';
}

const bgColorStyles = {
  white: 'bg-white',
  gray: 'bg-slate-50',
  gradient: 'bg-gradient-primary',
};

const paddingStyles = {
  sm: 'section-py-sm',
  default: 'section-py',
};

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      className,
      container = true,
      padding = 'default',
      bgColor = 'white',
      ...props
    },
    ref
  ) => {
    const content = container ? (
      <Container>{children}</Container>
    ) : (
      children
    );

    return (
      <section
        ref={ref}
        className={cn(
          paddingStyles[padding],
          bgColorStyles[bgColor],
          className
        )}
        {...props}
      >
        {content}
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;
