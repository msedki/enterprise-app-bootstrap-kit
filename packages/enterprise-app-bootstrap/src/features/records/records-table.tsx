/* eslint-disable react-hooks/incompatible-library */
"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight, MoreHorizontal, Search } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import type { BusinessRecord } from "./types";
import { formatCurrency, formatRelativeDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/common/status-badge";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const riskVariant = { low: "success", medium: "warning", high: "danger" } as const;
const riskLabel = { low: "Faible", medium: "Moyen", high: "Élevé" } as const;

export function RecordsTable({ data }: { data: BusinessRecord[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [status, setStatus] = useState("all");
  const filteredData = useMemo(
    () => status === "all" ? data : data.filter(item => item.status === status),
    [data, status],
  );

  const columns = useMemo<ColumnDef<BusinessRecord>[]>(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={value => table.toggleAllPageRowsSelected(Boolean(value))}
          aria-label="Sélectionner la page"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(Boolean(value))}
          aria-label={`Sélectionner ${row.original.name}`}
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button variant="ghost" className="-ml-3" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Entité <ArrowUpDown className="size-3.5" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          <p className="font-semibold">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.reference}</p>
        </div>
      ),
    },
    { accessorKey: "status", header: "Statut", cell: ({ row }) => <StatusBadge status={row.original.status} /> },
    { accessorKey: "risk", header: "Risque", cell: ({ row }) => <Badge variant={riskVariant[row.original.risk]}>{riskLabel[row.original.risk]}</Badge> },
    { accessorKey: "owner", header: "Responsable" },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <Button variant="ghost" className="-ml-3" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Montant <ArrowUpDown className="size-3.5" />
        </Button>
      ),
      cell: ({ row }) => <span className="font-medium tabular-nums">{formatCurrency(row.original.amount)}</span>,
    },
    { accessorKey: "updatedAt", header: "Mise à jour", cell: ({ row }) => <span className="text-muted-foreground">{formatRelativeDate(row.original.updatedAt)}</span> },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={`Actions pour ${row.original.name}`}><MoreHorizontal className="size-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Ouvrir</DropdownMenuItem>
            <DropdownMenuItem>Modifier</DropdownMenuItem>
            <DropdownMenuItem>Exporter</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
    },
  ], []);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 6 } },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={globalFilter} onChange={event => setGlobalFilter(event.target.value)} placeholder="Rechercher une entité…" className="pl-9" />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-44"><SelectValue placeholder="Tous les statuts" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="active">Actifs</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="blocked">Bloqués</SelectItem>
            <SelectItem value="draft">Brouillons</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(group => (
              <TableRow key={group.id}>
                {group.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? table.getRowModel().rows.map(row => (
              <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                {row.getVisibleCells().map(cell => <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">Aucun résultat.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>{table.getFilteredSelectedRowModel().rows.length} sélectionné(s) · {table.getFilteredRowModel().rows.length} résultat(s)</span>
        <div className="flex items-center gap-2">
          <span>Page {table.getState().pagination.pageIndex + 1} sur {Math.max(table.getPageCount(), 1)}</span>
          <Button variant="outline" size="icon" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} aria-label="Page précédente"><ChevronLeft className="size-4" /></Button>
          <Button variant="outline" size="icon" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} aria-label="Page suivante"><ChevronRight className="size-4" /></Button>
        </div>
      </div>
    </div>
  );
}
