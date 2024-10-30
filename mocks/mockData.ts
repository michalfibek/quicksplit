import { Bill, GroupSettings, Person } from "@/lib/definitions";

// import { randomUUID } from "crypto";
// async function getPersons(): Promise<Person[]> {
//   return [
//     {
//       id: "d1d5d1e6-d7ae-11eb-b8bc-0242ac130005",
//       name: "Peter Pan",
//     },
//   ];
// }

const mockPerson1 = <Person>{
  id: "d1d5d1e6-d7ae-11eb-b8bc-0242ac130005",
  name: "Anna Peterson",
};
const mockPerson2 = <Person>{
  id: "d1abd1e6-d7ae-11eb-b8bc-0242ac130001",
  name: "Johny Doe",
};
const mockPerson3 = <Person>{
  id: "a1abd1e6-d0ae-11eb-b8bc-0242ac1300421",
  name: "Frank Johnson",
};

export function getPeople(): Person[] {
  return [mockPerson1, mockPerson2, mockPerson3];
}

export function getBills(): Bill[] {
  return [
    {
      id: "6972b464-26d6-469c-a301-e7795e08778b",
      date: new Date("2024-01-02T00:00:00Z"),
      description: "Wallmart",
      amount: 120,
      currency: "CZK",
      exchangeRate: 1,
      paidBy: mockPerson1,
      sharedWith: [mockPerson1, mockPerson2],
    },
    {
      id: "55e97f9d-50d1-4bd2-be72-72a72bdeec6c",
      date: new Date("2020-01-03T00:00:00Z"),
      description: "Tesco",
      amount: 230,
      currency: "CZK",
      exchangeRate: 1,
      paidBy: mockPerson2,
      sharedWith: [mockPerson2],
    },
    {
      id: "d87ef686-43a4-4e9f-9f89-f2657fc977e3",
      date: new Date("2024-01-04T00:00:00Z"),
      description: "Lunch",
      amount: 230,
      currency: "USD",
      exchangeRate: 1,
      paidBy: mockPerson2,
      sharedWith: [mockPerson1],
    },
    // ...
  ];
}

export function getCurrencies(): string[] {
  return ["CZK", "USD", "EUR", "PLN"];
}

export function getGroupSettings(): GroupSettings {
  return {
    baseCurrency: "CZK",
  };
}

export function getUserSettings() {
  return {
    currentUser: mockPerson1,
  };
}
