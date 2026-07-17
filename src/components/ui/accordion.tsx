import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

export function Accordion({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("divide-y divide-ink-100", className)}>{children}</div>;
}

export function AccordionItem({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  key?: string | number;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={cn("border-b border-ink-100 py-1", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left font-display text-base font-semibold text-ink hover:text-teal-brand transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="pr-4">{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-ink-400 transition-transform duration-200",
            isOpen && "rotate-180 text-teal-brand"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out text-sm text-ink-600 leading-relaxed",
          isOpen ? "max-h-[500px] pb-4 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="pt-1">{children}</div>
      </div>
    </div>
  );
}
