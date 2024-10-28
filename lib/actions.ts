"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BillSchemaRaw } from "./definitions";

export async function createBill(values: z.infer<typeof BillSchemaRaw>) {
  const validatedFields = BillSchemaRaw.safeParse(values);
  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
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
