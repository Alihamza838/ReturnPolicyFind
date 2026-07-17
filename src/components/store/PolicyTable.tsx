import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import type { PolicyTableRow } from "../../types";

export function PolicyTable({ rows }: { rows: PolicyTableRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Return Window</TableHead>
          <TableHead>Condition</TableHead>
          <TableHead>Restocking Fee</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.category}>
            <TableCell className="font-semibold text-ink">{row.category}</TableCell>
            <TableCell className="font-mono text-xs">{row.window}</TableCell>
            <TableCell className="text-sm">{row.condition}</TableCell>
            <TableCell className="text-sm font-medium">{row.fee}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
