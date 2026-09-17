import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import type { ReactNode } from 'react';

const styles = {
  info: {
    box: 'border-l-accent bg-accent/5 text-foreground',
    icon: Info,
    iconClass: 'text-accent',
  },
  warning: {
    box: 'border-l-amber-500 bg-amber-500/10 text-foreground dark:border-l-amber-400',
    icon: AlertTriangle,
    iconClass: 'text-amber-600 dark:text-amber-400',
  },
  success: {
    box: 'border-l-emerald-500 bg-emerald-500/10 text-foreground',
    icon: CheckCircle2,
    iconClass: 'text-emerald-600 dark:text-emerald-400',
  },
} as const;

export type CalloutType = keyof typeof styles;

export function Callout({
  type = 'info',
  children,
}: {
  type?: CalloutType;
  children: ReactNode;
}) {
  const config = styles[type];
  const Icon = config.icon;

  return (
    <aside
      className={`my-6 flex gap-3 rounded-r-lg border-l-4 px-4 py-3 not-prose ${config.box}`}
      role="note"
    >
      <Icon size={20} className={`mt-0.5 shrink-0 ${config.iconClass}`} />
      <div className="min-w-0 text-[0.95rem] leading-relaxed [&_p]:my-0 [&_strong]:font-semibold">
        {children}
      </div>
    </aside>
  );
}
