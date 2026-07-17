import { ShieldCheck } from "lucide-react";
import { formatDate } from "../../lib/utils";

export function LastVerifiedBadge({ date }: { date: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-600 bg-signal-yes-bg border border-transparent text-signal-yes px-2.5 py-1 rounded-full shadow-2xs">
      <ShieldCheck className="h-4 w-4 shrink-0" />
      <span>Verified against official guidelines · Last audited {formatDate(date)}</span>
    </div>
  );
}
