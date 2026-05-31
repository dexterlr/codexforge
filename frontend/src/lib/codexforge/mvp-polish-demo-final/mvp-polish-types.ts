export type MvpPolishDemoFinalItem = {
  id: string;
  title: string;
  status: "ready" | "review" | "blocked" | "passed" | "failed" | "unknown";
  detail: string;
  nextAction: string;
};

export type MvpPolishDemoFinalSummary = {
  title: string;
  status: "ready" | "review" | "blocked" | "passed" | "failed" | "unknown";
  primaryAction: string;
  nextRoute: string;
  items: MvpPolishDemoFinalItem[];
};

export function buildMvpPolishStableKey(prefix: string, index: number): string {
  return prefix + "-" + index.toString().padStart(2, "0");
}

export function buildMvpPolishDemoFinalItem(id: string, title: string, detail: string, nextAction = "Copy the reviewed handoff and continue manually."): MvpPolishDemoFinalItem {
  return { id, title, status: "review", detail, nextAction };
}
