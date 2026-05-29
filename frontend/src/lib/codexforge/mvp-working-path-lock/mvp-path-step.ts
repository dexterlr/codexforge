import type { MvpPathStep } from "./mvp-working-path-types";

export function buildMvpPathStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.filter((part) => part !== null && part !== undefined && String(part).trim()).join(":").toLowerCase().replace(/[^a-z0-9/_:.-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 96) || "mvp-path";
}

export function buildMvpPathStep(input: Omit<MvpPathStep, "id"> & { id?: string }): MvpPathStep {
  return { ...input, id: input.id ?? buildMvpPathStableKey(input.order, input.route) };
}
