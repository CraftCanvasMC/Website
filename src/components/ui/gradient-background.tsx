import { cn } from '~/lib/utils';

import type { HTMLAttributes } from 'react';

interface GradientBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  colors?: {
    from: string;
    to: string;
  };
}

export function GradientBackground({
  colors = {
    from: 'from-fuchsia-500',
    to: 'to-sky-600',
  },
  className,
  ...props
}: GradientBackgroundProps) {
  return (
    <div
      aria-hidden='true'
      className={cn('-top-40 -z-10 sm:-top-80 absolute inset-x-0 transform-gpu overflow-hidden blur-3xl', className)}
      {...props}
    >
      <div
        className={cn(
          '-translate-x-1/2 relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] rotate-[30deg] bg-gradient-to-tr opacity-15 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]',
          colors.from,
          colors.to,
        )}
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
      />
    </div>
  );
}
