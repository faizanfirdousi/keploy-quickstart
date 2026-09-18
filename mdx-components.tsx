import type { MDXComponents } from 'mdx/types';
import { Callout } from '@/components/callout';
import { Steps, Step } from '@/components/steps';
import { PreWithCopy } from '@/components/pre-with-copy';
import { SystemDiagram } from '@/components/system-diagram';
import { RecordDiagram } from '@/components/record-diagram';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2 className="scroll-mt-28 border-b border-border pb-2" {...props} />
    ),
    h3: (props) => <h3 className="scroll-mt-28" {...props} />,
    pre: (props) => <PreWithCopy {...props} />,
    Callout,
    Steps,
    Step,
    SystemDiagram,
    RecordDiagram,
    ...components,
  };
}
