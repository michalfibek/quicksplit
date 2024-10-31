"use server";

import { db } from "@/db/drizzle";
import { Bills, BillsSchema, Persons, PersonsSchema } from "./definitions";
import { getBills } from "@/mocks/mockData";

export async function fetchGroupPersons(): Promise<Persons> {
  try {
    const data = await db.query.person.findMany();
    const parsedData = PersonsSchema.parseAsync(data);
    return parsedData;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch group people data.");
  }
}

export async function fetchGroupBills(): Promise<Bills> {
  return getBills(); // temp mock data

  /* 
  try {
    const data = await db.query.bill.findMany();
    const parsedData = BillsSchema.parseAsync(data);
    // console.log(data);
    // console.log(parsedData);
    return data; // TODO correctly parse data and its relations
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch group bill data.");
  } */
}
