import {
  ChevronRight,
  ExternalLink,
  Clock,
  Terminal,
  Zap,
} from 'lucide-react';

export function Hero() {
  return (
    <div className="not-prose mb-10 border-b border-border pb-8">
      {/* Documentation Breadcrumbs */}
      <nav
        aria-label="Documentation hierarchy"
        className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
      >
        <a
          href="https://keploy.io/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground"
        >
          Docs
        </a>
        <ChevronRight size={12} className="opacity-50" />
        <span className="text-muted-foreground">Quickstarts</span>
        <ChevronRight size={12} className="opacity-50" />
        <span className="text-muted-foreground">Golang</span>
        <ChevronRight size={12} className="opacity-50" />
        <span className="font-medium text-orange-400">Echo + PostgreSQL</span>
      </nav>

      {/* Eyebrow & Status Badges */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 text-xs font-medium text-orange-400">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
          Interactive Quickstart
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-xs font-mono text-muted-foreground">
          <Terminal size={12} />
          keploy v2.x
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/30 px-2.5 py-0.5 text-xs text-muted-foreground">
          <Clock size={12} />
          10 min tutorial
        </span>
      </div>

      {/* Main Documentation Headline with Big Typography */}
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
        Echo SQL Sample Application
      </h1>

      <p className="mt-2 text-xl font-semibold tracking-tight text-neutral-200 sm:text-2xl">
        Zero-Code Integration Testing & Dependency Virtualization for Go
      </p>

      {/* Authoritative Lead Description */}
      <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
        Learn how to capture real HTTP network traffic and PostgreSQL database queries from a Go Echo URL shortener application using Keploy, auto-generate deterministic integration test cases with database mocks, and replay tests with zero manual test code.
      </p>

      {/* Technical Specifications Matrix */}
      <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
        <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1 font-mono text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Go 1.20+
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1 font-mono text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          Echo v4
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1 font-mono text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          PostgreSQL 15+
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-md border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 font-medium text-orange-400">
          <Zap size={12} />
          Zero-Code eBPF Capture
        </div>
      </div>

      {/* Key Objectives Card */}
      <div className="mt-6 rounded-xl border border-border/80 bg-muted/20 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            In this guide you will learn
          </span>
          <a
            href="https://github.com/keploy/samples-go/tree/main/echo-sql"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-orange-400 transition-colors hover:text-orange-300"
          >
            View Sample on GitHub
            <ExternalLink size={12} />
          </a>
        </div>
        <div className="mt-3.5 grid gap-3 sm:grid-cols-3">
          <div className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-[11px] font-bold text-orange-400">
              1
            </span>
            <div>
              <span className="block text-xs font-semibold text-foreground">Record Traffic</span>
              <span className="text-xs text-muted-foreground">Capture real API calls and SQL queries via eBPF</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-[11px] font-bold text-orange-400">
              2
            </span>
            <div>
              <span className="block text-xs font-semibold text-foreground">Auto-Generate Mocks</span>
              <span className="text-xs text-muted-foreground">Store deterministic YAML mocks of database responses</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-[11px] font-bold text-orange-400">
              3
            </span>
            <div>
              <span className="block text-xs font-semibold text-foreground">Replay Regression Tests</span>
              <span className="text-xs text-muted-foreground">Validate code changes without running PostgreSQL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
