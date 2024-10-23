import { Bill } from "@/lib/definitions";

// import { randomUUID } from "crypto";
// async function getPersons(): Promise<Person[]> {
//   return [
//     {
//       id: "d1d5d1e6-d7ae-11eb-b8bc-0242ac130005",
//       name: "Peter Pan",
//     },
//   ];
// }

export async function getBills(): Promise<Bill[]> {
  const mockPerson1 = {
    id: "d1d5d1e6-d7ae-11eb-b8bc-0242ac130005",
    name: "Anna Peterson",
  };
  const mockPerson2 = {
    id: "d1abd1e6-d7ae-11eb-b8bc-0242ac130001",
    name: "Johny Doe",
  };

  return [
    {
      id: "6972b464-26d6-469c-a301-e7795e08778b",
      date: "2024-01-02T00:00:00Z",
      description: "Wallmart",
      amount: 120,
      currency: "CZK",
      exchangeRate: 1,
      payer: mockPerson1,
      owedBy: [mockPerson1, mockPerson2],
    },
    {
      id: "55e97f9d-50d1-4bd2-be72-72a72bdeec6c",
      date: "2020-01-03T00:00:00Z",
      description: "Tesco",
      amount: 230,
      currency: "CZK",
      exchangeRate: 1,
      payer: mockPerson2,
      owedBy: [mockPerson1, mockPerson2],
    },
    {
      id: "d87ef686-43a4-4e9f-9f89-f2657fc977e3",
      date: "2024-01-04T00:00:00Z",
      description: "Lunch",
      amount: 230,
      currency: "USD",
      exchangeRate: 1,
      payer: mockPerson2,
      owedBy: [mockPerson1, mockPerson2],
    },
    // ...
  ];
}
