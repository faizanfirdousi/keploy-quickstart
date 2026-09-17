import type { ReactNode } from 'react';

export function Steps({ children }: { children: ReactNode }) {
  return (
    <ol className="relative my-8 list-none space-y-10 border-l border-border pl-0 not-prose [counter-reset:step]">
      {children}
    </ol>
  );
}

export function Step({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="relative pl-8 [counter-increment:step]">
      <span
        className="absolute -left-[0.6875rem] top-0 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-accent shadow-sm before:content-[counter(step)]"
        aria-hidden="true"
      />
      <p className="mb-3 text-lg font-semibold tracking-tight text-foreground">
        {title}
      </p>
      <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground [&_pre]:my-4">
        {children}
      </div>
    </li>
  );
}
