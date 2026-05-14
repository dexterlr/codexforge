import type { ArtifactExportRequest } from "@/lib/codexforge/artifact-workspace";

export type ProductionPackSourceSurface = "creative" | "patch-preview" | "operator-run" | "mixed";
export type ProductionPackMode = "preview-pack";
export type ProductionPackItemType =
  | "production-plan.md"
  | "storyboard.md"
  | "render-queue.preview.json"
  | "blender-script.preview.py"
  | "comfyui-workflow.preview.json"
  | "unreal-command.preview.txt"
  | "patch-plan.md"
  | "run-replay.md"
  | "validation-checklist.md"
  | "artifact-ledger.json";

export type ProductionPackValidationState = "valid-preview-pack" | "needs-review" | "blocked";
export type ProductionPackLedgerState =
  | "planned"
  | "ready-for-review"
  | "awaiting-export-approval"
  | "exported-to-artifact-workspace"
  | "blocked";

export type ProductionPackItem = {
  id: string;
  type: ProductionPackItemType;
  title: string;
  content: string;
  targetRelativePath: string;
  previewOnly: true;
  sourceSurface: ProductionPackSourceSurface;
  safetyNote: string;
};

export type ProductionPackManifest = {
  id: string;
  packId: string;
  title: string;
  itemCount: number;
  items: Array<{ id: string; type: ProductionPackItemType; targetRelativePath: string }>;
  sourceSurfaces: ProductionPackSourceSurface[];
  safetyPosture: string;
  approvalBoundary: string;
  suggestedExportTargetPaths: string[];
  validationChecklist: string[];
  summary: string[];
};

export type ProductionPackValidationIssue = {
  id: string;
  severity: "warning" | "blocked";
  label: string;
  detail: string;
};

export type ProductionPackValidationReport = {
  id: string;
  state: ProductionPackValidationState;
  issues: ProductionPackValidationIssue[];
  summary: string[];
};

export type ProductionPackLedgerItem = {
  id: string;
  itemId: string;
  targetRelativePath: string;
  state: ProductionPackLedgerState;
  note: string;
};

export type ProductionPackLedger = {
  id: string;
  state: ProductionPackLedgerState;
  items: ProductionPackLedgerItem[];
  summary: string[];
};

export type ProductionPackReplay = {
  id: string;
  sourceBrief: string;
  selectedPackItems: string[];
  safetyPosture: string;
  exportChecklist: string[];
  validationCommands: string[];
  followUpPrompt: string;
  summary: string[];
};

export type ProductionPack = {
  id: string;
  title: string;
  sourceSurface: ProductionPackSourceSurface;
  sourceRunId: string;
  mode: ProductionPackMode;
  items: ProductionPackItem[];
  manifest: ProductionPackManifest;
  exportRequests: ArtifactExportRequest[];
  exportReadiness: string;
  validation: ProductionPackValidationReport;
  ledger: ProductionPackLedger;
  replay: ProductionPackReplay;
  safetyBoundary: string;
  nextAction: string;
  summary: string[];
};

export type ProductionPackInput = {
  id?: string;
  title?: string;
  sourceSurface?: ProductionPackSourceSurface;
  sourceRunId?: string;
  sourceBrief?: string;
};

export function buildProductionPackReactKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
