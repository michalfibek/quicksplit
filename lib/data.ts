"use server";

import { db } from "@/db/drizzle";
import { Persons, PersonSchema, PersonsSchema } from "./definitions";

export async function fetchGroupPersons(): Promise<Persons> {
  console.log("fetching");
  try {
    const data = await db.query.person.findMany();
    // console.log(data);
    const parsedData = PersonsSchema.parseAsync(data);
    // console.log(parsedData);
    return parsedData;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch group people data.");
  }
}
