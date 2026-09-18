'use client';

import { useRef } from 'react';
import { CopyButton } from '@/components/copy-button';

interface PreWithCopyProps extends React.ComponentProps<'pre'> {
  'data-language'?: string;
  'data-theme'?: string;
  [key: `data-${string}`]: unknown;
}

export function PreWithCopy(props: PreWithCopyProps) {
  const ref = useRef<HTMLPreElement>(null);

  return (
    <div className="group relative flex min-h-[3.25rem] flex-col justify-center">
      <div className="pointer-events-auto absolute right-3 top-3 z-10">
        <CopyButton getText={() => ref.current?.textContent ?? ''} />
      </div>
      <pre
        ref={ref}
        {...props}
        className={`overflow-x-auto text-[13px] leading-relaxed text-zinc-200 ${props.className ?? ''}`}
      />
    </div>
  );
}
