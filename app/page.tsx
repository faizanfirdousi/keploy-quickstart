import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { TableOfContents } from '@/components/table-of-contents';
import { ReadingProgressBar } from '@/components/reading-progress-bar';
import { BackToTop } from '@/components/back-to-top';
import TutorialContent from '@/content/tutorial.mdx';

export default function Page() {
  return (
    <>
      <ReadingProgressBar />
      <Header />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 lg:flex-row lg:gap-12">
        <article
          id="article"
          className="prose prose-neutral dark:prose-invert order-1 max-w-none flex-1 lg:max-w-[45rem]"
        >
          <Hero />
          <TutorialContent />
        </article>
        <aside className="order-2 w-full shrink-0 lg:w-56">
          <TableOfContents />
        </aside>
      </div>
      <BackToTop />
      <Footer />
    </>
  );
}
