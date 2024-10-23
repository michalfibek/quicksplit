import { z } from "zod";

export const PersonSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email().optional(),
});

export type Person = z.infer<typeof PersonSchema>;

export const BillSchema = z.object({
  id: z.string().uuid(),
  date: z.string().datetime(),
  description: z.string(),
  amount: z.number().positive(),
  currency: z.string().min(3).max(3),
  exchangeRate: z.number().positive().optional(),
  payer: PersonSchema,
  owedBy: z.array(PersonSchema),
});

export type Bill = z.infer<typeof BillSchema>;
