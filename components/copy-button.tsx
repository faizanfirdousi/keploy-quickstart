'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function CopyButton({ getText }: { getText: () => string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(getText());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
      className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-[#1a1a20]/85 px-2.5 py-1 text-xs font-mono text-zinc-400 backdrop-blur-xs transition-all hover:border-white/[0.16] hover:bg-[#23232c] hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-95"
    >
      {copied ? (
        <>
          <Check size={13} className="text-emerald-400" />
          <span className="text-emerald-400">Copied!</span>
        </>
      ) : (
        <>
          <Copy size={13} />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
