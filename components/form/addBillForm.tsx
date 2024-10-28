"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { BillSchema, BillSchemaRaw } from "@/lib/definitions";
import Link from "next/link";
import {
  getCurrencies,
  getGroupSettings,
  getPeople,
  getUserSettings,
} from "@/mocks/mockData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateTimePicker } from "../ui/datetime-picker";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { Checkbox } from "../ui/checkbox";
import { useEffect } from "react";

export function AddBillForm() {
  const peopleList = getPeople();
  const currencyList = getCurrencies();
  const userSettings = getUserSettings();
  const groupSettings = getGroupSettings();

  const form = useForm<z.infer<typeof BillSchemaRaw>>({
    resolver: zodResolver(BillSchemaRaw),
    defaultValues: {
      description: "",
      date: new Date(),
      paidBy: userSettings.currentUser.id,
      currency: groupSettings.baseCurrency,
      amount: "",
      sharedWith: [userSettings.currentUser.id],
    },
  });

  useEffect(() => {
    form.setFocus("amount");
  }, [form]);

  function handlePaidByChange(value: string) {
    const sharedWithOrig = form.getValues().sharedWith;
    if (!sharedWithOrig.includes(value) && sharedWithOrig.length > 1) {
      form.setValue("sharedWith", [...sharedWithOrig, value]);
    } else {
      form.setValue("sharedWith", [value]);
    }
  }

  async function onSubmit(values: z.infer<typeof BillSchemaRaw>) {
    // console.log(values);
    const parsedValues = BillSchemaRaw.safeParse(values);
    if (parsedValues.success) {
      console.log(parsedValues);
    } else {
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="paidBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paid by</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handlePaidByChange(value);
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="(choose one)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {peopleList.map((person) => (
                    <SelectItem key={person.id} value={person.id}>
                      {person.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col sm:flex-row">
          <div className="sm:basis-2/3">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="sm:basis-1/3">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="(set currency)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencyList.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="New office chair" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex w-72 flex-col gap-2">
              <FormLabel htmlFor="date">Date time</FormLabel>
              <FormControl>
                <DateTimePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sharedWith"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Shared with</FormLabel>
                {/* <FormDescription>
                  Select the people you share this bill with.
                </FormDescription> */}
              </div>
              {groupSettings.people.map((person) => (
                <FormField
                  key={person.id}
                  control={form.control}
                  name="sharedWith"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={person.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(person.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, person.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== person.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {person.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Add bill
        </Button>
      </form>
    </Form>
  );
}
