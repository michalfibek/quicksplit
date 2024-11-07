import { z } from "zod";

export const PersonSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email().nullable(),
});

export type TPerson = z.infer<typeof PersonSchema>;

export const PersonsSchema = z.array(PersonSchema);

export type TPersons = z.infer<typeof PersonsSchema>;

export const BillSchema = z.object({
  id: z.string().uuid(),
  date: z.coerce.date(),
  // date: z.coerce.date().refine((data) => {
  //   console.log(data);
  //   console.log(JSON.stringify(data));
  // }),
  description: z.string().max(255).nullish(),
  amount: z.coerce.number().positive(),
  currency: z.string().min(3).max(3),
  exchangeRate: z.number().positive().nullish(),
  amountConverted: z.number().positive().nullish(),
  paidBy: PersonSchema,
  sharedWith: z.array(PersonSchema),
});

export const BillSchemaRaw = BillSchema.extend({
  paidBy: z.string().uuid(),
  sharedWith: z.array(z.string()).min(1),
}).omit({ id: true });

export const BillSchemaRawInput = BillSchemaRaw.extend({
  amount: z.union([z.number(), z.string()]),
});

export type TBill = z.infer<typeof BillSchema>;

export const BillsSchema = z.array(BillSchema);

export type TBills = z.infer<typeof BillsSchema>;

export type TCurrencyCode = string[3];

export type TGroupSettings = {
  baseCurrency: TCurrencyCode;
};
