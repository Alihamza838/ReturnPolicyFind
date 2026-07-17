import type { Step } from "../../types";

export function StepGuide({ title = "How to return an item", steps }: { title?: string; steps: Step[] }) {
  if (!steps || steps.length === 0) return null;
  return (
    <div className="bg-white rounded-lg border border-ink-100 p-6 shadow-xs">
      <h2 className="mb-6 font-display text-xl font-bold text-ink">{title}</h2>
      <ol className="space-y-6">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4 items-start">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-brand text-sm font-semibold text-white font-mono shadow-xs">
              {i + 1}
            </span>
            <div className="pt-0.5">
              <h4 className="font-semibold text-ink text-base">{step.title}</h4>
              <p className="text-sm text-ink-600 mt-1">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
