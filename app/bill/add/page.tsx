import { CardBox } from "@/components/CardBox";
import { AddBillForm } from "@/components/form/addBillForm";
import MainBlock from "@/components/MainBlock";
import PageHeading from "@/components/PageHeading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Bill",
};

export default async function Page() {
  return (
    <>
      <MainBlock>
        <CardBox title="Add Bill">
          <AddBillForm />
        </CardBox>
      </MainBlock>
    </>
  );
}
