export type ValidationCaptureHardeningItem = {
  id: string;
  title: string;
  status: "ready" | "review" | "blocked" | "passed" | "failed" | "unknown";
  detail: string;
  nextAction: string;
};

export type ValidationCaptureHardeningSummary = {
  title: string;
  status: "ready" | "review" | "blocked" | "passed" | "failed" | "unknown";
  primaryAction: string;
  nextRoute: string;
  items: ValidationCaptureHardeningItem[];
};

export function buildValidationCaptureHardeningStableKey(prefix: string, index: number): string {
  return prefix + "-" + index.toString().padStart(2, "0");
}

export function buildValidationCaptureHardeningItem(id: string, title: string, detail: string, nextAction = "Copy the reviewed handoff and continue manually."): ValidationCaptureHardeningItem {
  return { id, title, status: "review", detail, nextAction };
}
