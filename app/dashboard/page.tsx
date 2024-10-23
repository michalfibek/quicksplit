"use server";

import { columnsBills } from "@/components/columns/columnsBills";
import { DataTable } from "@/components/ui/table/DataTable";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import MainBlock from "@/components/ui/MainBlock";
import { getBills } from "@/mocks/mockBills";
import PageHeading from "@/components/ui/PageHeading";

export default async function Page() {
  const bills = await getBills();

  // data test
  // bills.map((d) => {
  //   console.log(BillSchema.parse(d));
  // });

  return (
    <>
      <MainBlock>
        <PageHeading>Dashboard</PageHeading>
        <Button asChild>
          <Link href="/bill/add">Add bill</Link>
        </Button>
        <div className="container mx-auto py-10">
          <DataTable columns={columnsBills} data={bills} />
        </div>
      </MainBlock>
    </>
  );
}
