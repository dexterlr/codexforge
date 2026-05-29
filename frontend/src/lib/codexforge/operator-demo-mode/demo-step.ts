import type { DemoStep } from "./operator-demo-types";

export function buildDemoStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.filter((part) => part !== null && part !== undefined && String(part).trim()).join(":").toLowerCase().replace(/[^a-z0-9/_:.-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 96) || "operator-demo";
}

export function buildDemoStep(input: Omit<DemoStep, "id"> & { id?: string }): DemoStep {
  return { ...input, id: input.id ?? buildDemoStableKey(input.order, input.route) };
}
