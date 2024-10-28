"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Bill } from "@/lib/definitions";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

// const CUR_LOCALE = "en-US";
const CUR_LOCALE = "cz-CZ";

// TODO payer and ower columns - simple icons
export const columnsBills: ColumnDef<Bill>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = new Intl.DateTimeFormat(CUR_LOCALE, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(date);

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const currency = row.original.currency;
      const formattedAmount = new Intl.NumberFormat(CUR_LOCALE, {
        style: "currency",
        currency: currency,
      }).format(amount);

      return <div className="text-right font-bold">{formattedAmount}</div>;
    },
  },
];
