import type {
  ProductionPack,
  ProductionPackItem,
  ProductionPackLedger,
  ProductionPackLedgerItem,
  ProductionPackLedgerState,
} from "./production-pack-types";

export function buildProductionPackLedgerItem(args: {
  item: ProductionPackItem;
  state?: ProductionPackLedgerState;
  note?: string;
}): ProductionPackLedgerItem {
  return {
    id: `${args.item.id}:ledger`,
    itemId: args.item.id,
    targetRelativePath: args.item.targetRelativePath,
    state: args.state ?? "awaiting-export-approval",
    note: args.note ?? "Planned review artifact; no persistence write in domain logic.",
  };
}

export function buildProductionPackLedger(pack: Pick<ProductionPack, "id" | "items">): ProductionPackLedger {
  const items = pack.items.map((item) => buildProductionPackLedgerItem({ item }));
  const ledger: ProductionPackLedger = {
    id: `${pack.id}:ledger`,
    state: items.some((item) => item.state === "blocked") ? "blocked" : "awaiting-export-approval",
    items,
    summary: [],
  };
  return { ...ledger, summary: summarizeProductionPackLedger(ledger) };
}

export function summarizeProductionPackLedger(ledger: ProductionPackLedger): string[] {
  return [
    `Ledger state: ${ledger.state}.`,
    `${ledger.items.length} item(s) tracked without domain persistence writes.`,
    "States available: planned, ready-for-review, awaiting-export-approval, exported-to-artifact-workspace, blocked.",
  ];
}
