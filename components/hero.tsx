import { Clock } from 'lucide-react';

const tags = ['Go', 'Keploy', 'API Testing'];

export function Hero() {
  return (
    <div className="not-prose mb-10 flex flex-wrap items-center gap-3 border-b border-border pb-8 text-sm text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <Clock size={16} aria-hidden="true" />
        Tutorial
      </span>
      <span aria-hidden="true">·</span>
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-xs font-medium text-foreground"
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
