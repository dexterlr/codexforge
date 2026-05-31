export type CodingMvpReleaseCandidateItem = {
  id: string;
  title: string;
  status: "ready" | "review" | "blocked" | "passed" | "failed" | "unknown";
  detail: string;
  nextAction: string;
};

export type CodingMvpReleaseCandidateSummary = {
  title: string;
  status: "ready" | "review" | "blocked" | "passed" | "failed" | "unknown";
  primaryAction: string;
  nextRoute: string;
  items: CodingMvpReleaseCandidateItem[];
};

export function buildCodingMvpRcStableKey(prefix: string, index: number): string {
  return prefix + "-" + index.toString().padStart(2, "0");
}

export function buildCodingMvpReleaseCandidateItem(id: string, title: string, detail: string, nextAction = "Copy the reviewed handoff and continue manually."): CodingMvpReleaseCandidateItem {
  return { id, title, status: "review", detail, nextAction };
}
