"use server";

import { CardBox } from "@/components/CardBox";
import { AddBillForm } from "@/components/form/addBillForm";
import MainBlock from "@/components/MainBlock";
import { fetchGroupPersons } from "@/lib/data";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Add Bill",
  };
}

export default async function Page() {
  const fetchedPersons = await fetchGroupPersons();

  return (
    <>
      <MainBlock>
        <CardBox title="Add Bill">
          <AddBillForm personsList={fetchedPersons} />
        </CardBox>
      </MainBlock>
    </>
  );
}
