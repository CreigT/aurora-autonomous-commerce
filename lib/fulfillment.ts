import fulfillment from "@/data/fulfillment.json";

export type FulfillmentFile = { name: string; body: string };
export type FulfillmentPack = { title: string; files: FulfillmentFile[] };

export function getFulfillment(slug: string): FulfillmentPack | undefined {
  const pack = (fulfillment as Record<string, FulfillmentPack>)[slug];
  return pack;
}
