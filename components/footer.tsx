import Link from 'next/link';

const GITHUB_URL = 'https://github.com/faizanfirdousi/keploy-quickstart';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          Tutorial by{' '}
          <a
            href="https://github.com/faizanfirdousi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Faizan Firdousi
          </a>
        </p>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span aria-hidden="true">·</span>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            Source
          </a>
          <span aria-hidden="true">·</span>
          <span>Built with Next.js + MDX</span>
        </p>
      </div>
    </footer>
  );
}
