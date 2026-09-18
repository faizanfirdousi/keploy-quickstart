import Link from 'next/link';
import { ExternalLink, Search } from 'lucide-react';

function KeployBunny({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 185 185"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="keploy-bunny-g1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop stopColor="#FAD961" offset="0%" />
          <stop stopColor="#F76B1C" offset="100%" />
        </linearGradient>
        <linearGradient id="keploy-bunny-g2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop stopColor="#FAD961" offset="0%" />
          <stop stopColor="#F76B1C" offset="100%" />
        </linearGradient>
      </defs>
      <g
        transform="translate(79.554233, 36.680212) scale(-1, 1) rotate(-180) translate(-79.554233, -36.680212) translate(34.084532, 0)"
        fill="url(#keploy-bunny-g1)"
      >
        <path d="M90.9394012,0 C75.7888846,23.901637 27.9278103,93.9988661 3.25939689,67.4484092 C-2.85282459,60.870658 0.148344297,52.1761496 7.96880165,42.8877998 C32.1549743,37.1481312 63.6189036,21.8042754 90.9394012,0" />
      </g>
      <g
        transform="translate(90.5, 121.22243) scale(-1, 1) rotate(-180) translate(-90.5, -121.22243) translate(0, 31.44486)"
        fill="url(#keploy-bunny-g2)"
      >
        <path d="M158.050239,73.7953285 C156.099683,71.6433718 151.694738,72.4448182 148.211088,75.5835573 C144.734636,78.7246909 143.499044,83.0190262 145.4496,85.1712223 C147.400156,87.3236579 151.805101,86.5272399 155.283952,83.3861063 C158.765203,80.2420993 160.000795,75.9480035 158.050239,73.7953285 L158.050239,73.7953285 Z M180.127748,53.0482344 C180.103756,53.1600586 180.094159,53.2740378 180.067768,53.3887354 C160.888502,140.991116 12.4963071,208.620551 0.506266678,166.919955 C-8.44853606,135.775608 104.356211,117.656501 104.356211,117.656501 C106.72135,117.245362 108.523395,115.189426 108.523395,112.711814 C108.523395,110.145605 106.588674,108.053032 104.098056,107.751323 C38.0905747,110.416186 26.2751967,69.8683128 26.2751967,69.8683128 C13.7376571,29.341272 52.5707528,0 52.5707528,0 C33.850455,75.1096814 114.497422,43.7594057 114.497422,43.7594057 C180.996261,21.0832849 183.33069,39.134387 180.127748,53.0482344" />
      </g>
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function SlackIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
    </svg>
  );
}

const KEPLOY_DOCS_URL = 'https://keploy.io/docs';
const GITHUB_REPO_URL = 'https://github.com/keploy/keploy';
const SLACK_COMMUNITY_URL = 'https://keploy.io/slack';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-90"
            aria-label="Keploy Documentation Home"
          >
            <KeployBunny className="h-6 w-6 shrink-0" />
            <span className="font-bold text-lg tracking-tight text-foreground font-sans">
              keploy
            </span>
            <span className="rounded border border-orange-500/30 bg-orange-500/10 px-1.5 py-0.5 text-[11px] font-semibold text-orange-400">
              Docs
            </span>
          </Link>

          <span className="hidden h-4 w-px bg-border sm:inline-block" />

          {/* Navigation Items */}
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Documentation Sections">
            <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
              Quickstart
            </span>
            <a
              href="https://keploy.io/docs/concepts/what-is-keploy/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              How it Works
            </a>
            <a
              href={KEPLOY_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Full Docs
              <ExternalLink size={11} className="opacity-70" />
            </a>
          </nav>
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-2">
          {/* DocSearch Command Palette Mockup */}
          <div className="hidden md:flex items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-neutral-600 hover:text-foreground cursor-pointer">
            <Search size={13} className="text-muted-foreground/70" />
            <span className="text-xs">Search documentation...</span>
            <kbd className="ml-2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
              ⌘K
            </kbd>
          </div>

          {/* Slack Link */}
          <a
            href={SLACK_COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join Keploy Slack Community"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <SlackIcon className="h-4 w-4" />
          </a>

          {/* GitHub Star Pill */}
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star Keploy on GitHub"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/30 px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted hover:border-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <GitHubIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Star</span>
            <span className="rounded bg-neutral-800 px-1.5 py-0.2 text-[11px] font-mono text-neutral-300">
              20k
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
