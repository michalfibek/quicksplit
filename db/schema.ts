import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import {
  integer,
  pgTable,
  uuid,
  varchar,
  timestamp,
  char,
  check,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const db = drizzle({ client: sql });

export const person = pgTable("person", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").unique(),
});

export const personRelations = relations(person, ({ many }) => ({
  posts: many(bill),
}));

export const personRelationsShared = relations(person, ({ many }) => ({
  billSharedWith: many(billSharedWith),
}));

export const bill = pgTable(
  "bill",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    date: timestamp("date").notNull(),
    description: varchar("description", { length: 255 }),
    amount: integer("amount").notNull(),
    currency: char("currency", { length: 3 }).notNull(),
    exchangeRate: integer("exchange_rate"),
    paidById: uuid("paid_by_id")
      .references(() => person.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => ({
    // checkAmount: check("amount_check", sql`${table.amount} > 0`),
    // checkExchangeRate: check(
    //   "exchange_rate_check",
    //   sql`${table.exchange_rate} > 0`
    // ),
  })
);

export type TdataBill = typeof bill.$inferSelect;

export const billPaidByRelations = relations(bill, ({ one }) => ({
  paidBy: one(person, {
    fields: [bill.paidById],
    references: [person.id],
  }),
}));

export const billRelationsShared = relations(bill, ({ many }) => ({
  billSharedWith: many(billSharedWith),
}));

export const billSharedWith = pgTable(
  "bill_shared_with_person",
  {
    personId: uuid("person_id")
      .notNull()
      .references(() => person.id),
    billId: uuid("bill_id")
      .notNull()
      .references(() => bill.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.personId, t.billId] }),
  })
);

export const billSharedWithRelations = relations(billSharedWith, ({ one }) => ({
  group: one(person, {
    fields: [billSharedWith.personId],
    references: [person.id],
  }),
  user: one(bill, {
    fields: [billSharedWith.billId],
    references: [bill.id],
  }),
}));
