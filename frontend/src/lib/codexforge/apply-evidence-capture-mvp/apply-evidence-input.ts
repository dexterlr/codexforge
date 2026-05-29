import type { ApplyEvidenceInput, ApplyEvidenceInputSource } from "./apply-evidence-capture-types";

export function buildApplyEvidenceStableKey(...parts: Array<string | null | undefined>): string {
  return (parts.filter(Boolean).join(":").toLowerCase().replace(/[^a-z0-9/_:.-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 96)) || "apply-evidence";
}

export function buildApplyEvidenceInput(source: ApplyEvidenceInputSource = {}): ApplyEvidenceInput {
  return {
    selectedFile: source.selectedFile?.trim() || "No file selected",
    diffLabel: source.diffLabel?.trim() || "preview-diff",
    diffSummary: source.diffSummary?.trim() || "Capped evidence excerpt for one preview diff.",
    operatorNote: source.operatorNote?.trim() || "Operator note not supplied.",
    noSecrets: true,
    excerptCap: 1200,
  };
}
