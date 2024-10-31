"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BillSchemaRaw } from "./definitions";
import { db } from "@/db/drizzle";
import { bill, billSharedWith, person } from "@/db/schema";

export async function createBill(values: z.infer<typeof BillSchemaRaw>) {
  const validatedFields = BillSchemaRaw.safeParse(values);
  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const data = validatedFields.data;
  type NewBill = typeof bill.$inferInsert;

  try {
    const insertData: NewBill = {
      date: data.date,
      description: data.description,
      amount: data.amount,
      currency: data.currency,
      paidById: data.paidBy,
    };

    await db.transaction(async (tx) => {
      const insertedBill = await tx.insert(bill).values(insertData).returning();

      const sharedWithEntries = data.sharedWith.map((personId) => ({
        personId: personId,
        billId: insertedBill[0].id,
      }));

      await db.insert(billSharedWith).values(sharedWithEntries);

      return insertedBill[0];
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create new bill.");
  }

  // Prepare data for insertion into the database
  // const { customerId, amount, status } = validatedFields.data;
  // const amountInCents = amount * 100;
  // const date = new Date().toISOString().split("T")[0];

  // try {
  //   await sql`
  //   INSERT INTO invoices (customer_id, amount, status, date)
  //   VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  // `;
  // } catch (error) {
  //   return { message: `Database Error: Failed to create new invoice` };
  // }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/dashboard/");
  redirect("/dashboard/");
}
