import * as React from "react";
import { Check } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "../ui/Link";
import type { PolicyBadge } from "../../types";

interface ComparisonCardProps {
  brand: string;
  slug: string;
  lastVerified: string;
  returnWindow: string;
  badges: PolicyBadge[];
  borderClass: string;
  bgClass: string;
  textClass: string;
}

export function ComparisonCard({
  brand,
  slug,
  lastVerified,
  returnWindow,
  badges,
  borderClass,
  bgClass,
  textClass,
}: ComparisonCardProps) {
  return (
    <Card className={`border-t-4 ${borderClass}`}>
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-display text-2xl font-bold text-ink">{brand}</h3>
            <p className="text-xs text-ink-400 mt-0.5">
              Last updated:{" "}
              {new Date(lastVerified).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <Link href={`/stores/${slug}`}>
            <Button variant="outline" size="sm">
              View full policy
            </Button>
          </Link>
        </div>
        <div className={`rounded-lg ${bgClass} p-4 border border-ink-100 font-mono text-xs ${textClass}`}>
          <p className="font-semibold uppercase tracking-wider mb-1 text-[10px]">Standard Term:</p>
          <p className="text-sm font-bold">{returnWindow}</p>
        </div>
        <ul className="space-y-2 text-sm text-ink-600">
          {badges.map((badge) => (
            <li key={badge.label} className="flex gap-2 items-start text-xs">
              <Check className="h-4 w-4 text-signal-yes shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-ink">{badge.label}</span>
                {badge.note && <span className="text-ink-400"> — {badge.note}</span>}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
