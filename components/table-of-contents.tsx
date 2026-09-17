'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

type TocItem = { id: string; text: string; level: 2 | 3 };

function buildToc(): TocItem[] {
  const article = document.getElementById('article');
  if (!article) return [];

  return Array.from(article.querySelectorAll('h2[id], h3[id]'))
    .filter((el) => el.id.length > 0)
    .map((el) => ({
      id: el.id,
      text: el.textContent ?? '',
      level: el.tagName === 'H2' ? 2 : 3,
    }));
}

export function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      if (!cancelled) {
        setItems(buildToc());
      }
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const list = (
    <ul className="space-y-2 text-sm">
      {items.map((item) => (
        <li key={item.id} className={item.level === 3 ? 'pl-3' : undefined}>
          <a
            href={`#${item.id}`}
            onClick={() => setMobileOpen(false)}
            className={`block border-l-2 py-0.5 pl-3 transition-colors hover:text-foreground ${
              activeId === item.id
                ? 'border-accent font-medium text-foreground'
                : 'border-transparent text-muted-foreground'
            }`}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="mb-4 flex w-full items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm font-medium"
          aria-expanded={mobileOpen}
        >
          On this page
          <ChevronDown
            size={16}
            className={`transition-transform ${mobileOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {mobileOpen ? <div className="mb-8">{list}</div> : null}
      </div>
      <nav
        aria-label="Table of contents"
        className="hidden lg:block lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          On this page
        </p>
        {list}
      </nav>
    </>
  );
}
