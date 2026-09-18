import Image from 'next/image';
import testGif from '@/components/keploy-test.gif';

export function TestTerminalGif() {
  return (
    <figure className="not-prose my-8">
      <div className="overflow-hidden rounded-xl border border-zinc-200/80 bg-[#121215] shadow-xl dark:border-white/10 dark:shadow-2xl">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between border-b border-zinc-200/80 bg-zinc-100/90 px-4 py-2.5 dark:border-white/[0.08] dark:bg-zinc-900/80">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56] border border-black/10 inline-block" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-black/10 inline-block" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f] border border-black/10 inline-block" />
            </div>
            <span className="ml-2 font-mono text-xs text-zinc-600 dark:text-zinc-400">
              terminal — keploy test execution
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>test replay demo</span>
          </div>
        </div>

        {/* Terminal Window Content */}
        <div className="relative bg-[#0c0c0e]">
          <Image
            src={testGif}
            alt="Terminal recording of Keploy replaying captured tests with mocked PostgreSQL dependencies"
            unoptimized
            className="h-auto w-full block"
            priority={false}
          />
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        Live terminal recording: Keploy replaying captured API test cases and verifying results against PostgreSQL mocks.
      </figcaption>
    </figure>
  );
}
