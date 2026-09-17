'use client';

import { useRef } from 'react';
import { CopyButton } from '@/components/copy-button';

export function PreWithCopy(props: React.ComponentProps<'pre'>) {
  const ref = useRef<HTMLPreElement>(null);
  const language = String(props['data-language'] ?? '').trim();

  return (
    <div className="group relative">
      <div className="flex h-10 items-center justify-between border-b border-white/10 px-3">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
          {language || 'code'}
        </span>
        <CopyButton getText={() => ref.current?.textContent ?? ''} />
      </div>
      <pre
        ref={ref}
        {...props}
        className={`overflow-x-auto px-0 py-4 text-[13px] leading-6 ${props.className ?? ''}`}
      />
    </div>
  );
}
