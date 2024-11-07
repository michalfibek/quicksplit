import { columnsBills } from "@/components/columns/columnsBills";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MainBlock from "@/components/MainBlock";
import PageHeading from "@/components/PageHeading";
import { Metadata } from "next";
import { fetchGroupBills } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Dashboard",
  };
}

export default async function Page() {
  const bills = await fetchGroupBills();

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
