"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TBill, TPerson, TPersons } from "@/lib/definitions";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const GROUP_CURRENCY = "CZK";
// const CUR_LOCALE = "en-US";
const CUR_LOCALE = "cz-CZ";

export const columnsBills: ColumnDef<TBill>[] = [
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
    accessorKey: "paidBy",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Paid By
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const paidBy = row.getValue("paidBy") as TPerson;

      return <div>{paidBy.name}</div>;
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

      if (GROUP_CURRENCY == currency) {
        return <div className="text-right font-bold">{formattedAmount}</div>;
      } else {
        const amountConverted = row.original.amountConverted ?? 0;
        const formattedAmountConverted = new Intl.NumberFormat(CUR_LOCALE, {
          style: "currency",
          currency: GROUP_CURRENCY,
        }).format(amountConverted);

        return (
          <div className="text-right font-bold">
            {formattedAmount}
            <div className="text-slate-400">{formattedAmountConverted}</div>
          </div>
        );
      }
    },
  },
  {
    accessorKey: "sharedWith",
    header: () => {
      return <div className="text-right">Shared With</div>;
    },
    cell: ({ row }) => {
      const sharedWith = row.getValue("sharedWith") as TPersons;

      return (
        <div className="text-right">
          <ul>
            {sharedWith.map((person) => (
              <li key={person.id}>{person.name}</li>
            ))}
          </ul>
        </div>
      );
    },
  },
];
