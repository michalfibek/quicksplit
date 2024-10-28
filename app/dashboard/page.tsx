import { columnsBills } from "@/components/columns/columnsBills";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MainBlock from "@/components/MainBlock";
import { getBills } from "@/mocks/mockData";
import PageHeading from "@/components/PageHeading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

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
