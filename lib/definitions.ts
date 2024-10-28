import { z } from "zod";

export const PersonSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email().optional(),
});

export type Person = z.infer<typeof PersonSchema>;

export const BillSchema = z.object({
  id: z.string().uuid(),
  date: z.coerce.date(),
  // date: z.coerce.date().refine((data) => {
  //   console.log(data);
  //   console.log(JSON.stringify(data));
  // }),
  description: z.string().optional(),
  amount: z.coerce.number().positive(),
  currency: z.string().min(3).max(3),
  exchangeRate: z.number().positive().optional(),
  paidBy: PersonSchema,
  sharedWith: z.array(PersonSchema),
});

export const BillSchemaRaw = BillSchema.extend({
  id: z.string().uuid().optional(),
  paidBy: z.string().uuid(),
  sharedWith: z.array(z.string()),
});

export type Bill = z.infer<typeof BillSchema>;

export type GroupSettings = {
  baseCurrency: string;
  people: Person[];
};
