import { CardBox } from "@/components/CardBox";
import { AddBillForm } from "@/components/form/addBillForm";
import MainBlock from "@/components/MainBlock";
import PageHeading from "@/components/PageHeading";
import { fetchGroupPersons } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Bill",
};

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
