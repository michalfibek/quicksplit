"use server";

import { db } from "@/db/drizzle";
import {
  TBills,
  BillsSchema,
  TPerson,
  TPersons,
  PersonsSchema,
  TCurrencyCode,
  TBill,
  PersonSchema,
} from "./definitions";
import { bill, billSharedWith, person } from "@/db/schema";
import { eq } from "drizzle-orm";

type TBillRawSelect = Omit<TBill, "sharedWith" | "amountConverted"> & {
  paidBy: TPerson | { id: string } | null;
};

export async function fetchGroupPersons(): Promise<TPersons> {
  try {
    const data = await db.query.person.findMany();
    const parsedData = await PersonsSchema.parseAsync(data);
    return parsedData;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch group people data.");
  }
}

export async function fetchPerson(id: string): Promise<TPerson> {
  try {
    const data = await db.select().from(person).where(eq(person.id, id));
    const parsedData = await PersonSchema.parseAsync(data);
    return parsedData;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch person data.");
  }
}

export async function fetchConversion(
  curFrom: TCurrencyCode,
  curTo: TCurrencyCode,
  date: Date
): Promise<number> {
  try {
    if (!curFrom || !curTo) {
      throw new Error("Missing currency");
    }

    const res = await fetch(
      `https://api.frankfurter.app/${
        date.toISOString().split("T")[0]
      }?base=${curFrom}&symbols=${curTo}`
    );

    if (!res.ok)
      throw new Error(
        `Something went wrong with fetching the conversion: ${res.status}`
      );

    const data = await res.json();

    if (!data || !data.rates || !data.rates[curTo]) {
      throw new Error("Failed to parse the conversion data");
    }

    return Number(data.rates[curTo].toFixed(3));
  } catch (error) {
    console.error("Conversion fetch error:", error);
    throw error;
  }
}

export async function fetchGroupCurrency(): Promise<TCurrencyCode> {
  return "CZK";
}

export async function getExchangeRate(
  currencyForeign: TCurrencyCode,
  currencyGroup: TCurrencyCode,
  date: Date
): Promise<number> {
  if (currencyForeign === currencyGroup) return 1;
  return await fetchConversion(currencyGroup, currencyForeign, date);
}

export async function getExchangeRateAmount(
  currencyForeign: TCurrencyCode,
  currencyGroup: TCurrencyCode,
  date: Date,
  amount: number
): Promise<[number, number]> {
  const exchangeRate = await getExchangeRate(
    currencyForeign,
    currencyGroup,
    date
  );
  const amountConverted = Number((amount / exchangeRate).toFixed(3));
  return [exchangeRate, amountConverted];
}

export async function fetchGroupBills() {
  type TSharedWithGrouped = Record<string, TPerson[]>;
  const setupBill = async function (
    curBill: TBillRawSelect,
    sharedWithPeople: TSharedWithGrouped,
    groupCurrency: TCurrencyCode
  ) {
    const [exchangeRateVal, amountConverted] = await getExchangeRateAmount(
      curBill.currency,
      groupCurrency,
      curBill.date,
      curBill.amount
    );
    return {
      ...curBill,
      exchangeRate: exchangeRateVal,
      amountConverted: amountConverted,
      sharedWith: sharedWithPeople[curBill.id] || [],
    };
  };

  const billDataWithShared = async function (
    billsObj: TBillRawSelect[],
    sharedWithPeople: TSharedWithGrouped,
    groupCurrency: TCurrencyCode
  ) {
    return Promise.all(
      billsObj.map((curBill: TBillRawSelect) =>
        setupBill(curBill, sharedWithPeople, groupCurrency)
      )
    );
  };

  let parsedData: TBills = [];

  try {
    const groupCurrency = await fetchGroupCurrency();
    const billData = await db
      .select({
        id: bill.id,
        date: bill.date,
        description: bill.description,
        amount: bill.amount,
        currency: bill.currency,
        exchangeRate: bill.exchangeRate,
        paidBy: {
          id: person.id,
          name: person.name,
          email: person.email,
        },
      })
      .from(bill)
      .leftJoin(person, eq(bill.paidById, person.id));

    if (billData.length == 0) return [];

    const sharedWithDetails = await db
      .select({
        billId: billSharedWith.billId,
        sharedWithPerson: {
          id: person.id,
          name: person.name,
          email: person.email,
        },
      })
      .from(billSharedWith)
      .leftJoin(person, eq(billSharedWith.personId, person.id));

    const sharedWithGroupedByBillId =
      sharedWithDetails.reduce<TSharedWithGrouped>((acc, row) => {
        const { billId, sharedWithPerson } = row;

        if (!acc[billId]) {
          acc[billId] = [];
        }
        if (sharedWithPerson !== null) acc[billId].push(sharedWithPerson);

        return acc;
      }, {});

    const dataComplete = await billDataWithShared(
      billData as TBillRawSelect[],
      sharedWithGroupedByBillId,
      groupCurrency
    );

    parsedData = await BillsSchema.parseAsync(dataComplete);

    // return [];
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch group bill data.");
  }

  return parsedData;
}
