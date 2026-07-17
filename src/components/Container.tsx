import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('container-custom', className)}
      {...props}
    >
      {children}
    </div>
  )
);

Container.displayName = 'Container';

export default Container;
