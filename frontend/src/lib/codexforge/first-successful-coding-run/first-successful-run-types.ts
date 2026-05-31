export type FirstSuccessfulCodingRunItem = {
  id: string;
  title: string;
  status: "ready" | "review" | "blocked" | "passed" | "failed" | "unknown";
  detail: string;
  nextAction: string;
};

export type FirstSuccessfulCodingRunSummary = {
  title: string;
  status: "ready" | "review" | "blocked" | "passed" | "failed" | "unknown";
  primaryAction: string;
  nextRoute: string;
  items: FirstSuccessfulCodingRunItem[];
};

export function buildFirstSuccessfulRunStableKey(prefix: string, index: number): string {
  return prefix + "-" + index.toString().padStart(2, "0");
}

export function buildFirstSuccessfulCodingRunItem(id: string, title: string, detail: string, nextAction = "Copy the reviewed handoff and continue manually."): FirstSuccessfulCodingRunItem {
  return { id, title, status: "review", detail, nextAction };
}
