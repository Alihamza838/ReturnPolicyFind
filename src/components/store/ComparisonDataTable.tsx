import * as React from "react";
import { ArrowUpDown } from "lucide-react";
import { Link } from "../ui/Link";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import type { StoreFrontmatter } from "../../types";

type SortKey = "brand" | "returnWindow";

export function ComparisonDataTable({ stores }: { stores: StoreFrontmatter[] }) {
  const [sortKey, setSortKey] = React.useState<SortKey>("brand");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sorted = React.useMemo(() => {
    return [...stores].sort((a, b) => {
      let comparison = 0;
      if (sortKey === "brand") {
        comparison = a.brand.localeCompare(b.brand);
      } else {
        comparison = a.quickAnswer.returnWindow.localeCompare(b.quickAnswer.returnWindow);
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [stores, sortKey, sortDirection]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <button
              onClick={() => toggleSort("brand")}
              className="hover:text-teal-brand flex items-center gap-1 cursor-pointer font-semibold uppercase text-xs"
            >
              Store
              <ArrowUpDown className="h-3 w-3" />
            </button>
          </TableHead>
          <TableHead>
            <button
              onClick={() => toggleSort("returnWindow")}
              className="hover:text-teal-brand flex items-center gap-1 cursor-pointer font-semibold uppercase text-xs"
            >
              Return Window
              <ArrowUpDown className="h-3 w-3" />
            </button>
          </TableHead>
          <TableHead>Receipt Required</TableHead>
          <TableHead>Restocking Fee</TableHead>
          <TableHead>Refund Method</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((store) => (
          <TableRow key={store.slug}>
            <TableCell>
              <Link href={`/stores/${store.slug}`} className="font-bold text-teal-brand hover:underline">
                {store.brand}
              </Link>
            </TableCell>
            <TableCell className="font-mono text-xs text-ink-900">{store.quickAnswer.returnWindow}</TableCell>
            <TableCell className="text-sm">
              {store.quickAnswer.receiptRequired ? "Yes" : "No — lookup available"}
            </TableCell>
            <TableCell className="text-sm">
              {store.quickAnswer.restockingFee ? "Some items" : "None"}
            </TableCell>
            <TableCell className="text-sm text-ink-600 font-medium">
              {store.quickAnswer.refundMethod}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
