import {
  isArtifactExtensionAllowed,
  isArtifactSourceMutationPath,
  validateArtifactWorkspacePath,
} from "@/lib/codexforge/artifact-workspace";
import type {
  ProductionPack,
  ProductionPackItem,
  ProductionPackManifest,
  ProductionPackValidationIssue,
  ProductionPackValidationReport,
} from "./production-pack-types";

const COMMAND_WORDING = ["shell execution", "child_process", "spawn(", "exec(", "desktop control"];
const EXTERNAL_WORDING = ["launch blender", "launch unreal", "launch comfyui", "render video"];

export function validateProductionPackItem(item: ProductionPackItem): ProductionPackValidationIssue[] {
  const issues: ProductionPackValidationIssue[] = [];
  const text = `${item.content}\n${item.targetRelativePath}\n${item.safetyNote}`.toLowerCase();
  const pathValidation = validateArtifactWorkspacePath(item.targetRelativePath);

  if (!item.content.trim()) issues.push(issue("empty content", "blocked", `${item.type} has empty content.`));
  if (!isArtifactExtensionAllowed(item.targetRelativePath)) {
    issues.push(issue("unsupported extension", "blocked", `${item.targetRelativePath} is outside the allowlist.`));
  }
  if (isArtifactSourceMutationPath(item.targetRelativePath) || !pathValidation.allowed) {
    issues.push(issue("source mutation path", "blocked", `${item.targetRelativePath} is blocked by the workspace guard.`));
  }
  if (COMMAND_WORDING.some((word) => text.includes(word))) {
    issues.push(issue("command execution wording", "warning", `${item.type} mentions command execution boundaries.`));
  }
  if (EXTERNAL_WORDING.some((word) => text.includes(word))) {
    issues.push(issue("external execution wording", "warning", `${item.type} mentions external execution boundaries.`));
  }
  if (!text.includes("preview-only") && !text.includes("preview pack")) {
    issues.push(issue("missing preview-only language", "blocked", `${item.type} must state preview-only.`));
  }
  if (!text.includes("approval")) {
    issues.push(issue("missing approval boundary", "blocked", `${item.type} must state the approval boundary.`));
  }

  return issues;
}

export function validateProductionPack(pack: ProductionPack): ProductionPackValidationReport {
  const issues = pack.items.flatMap(validateProductionPackItem);
  issues.push(...validateManifest(pack.manifest));
  issues.push(...duplicates(pack.items.map((item) => item.id), "duplicate item ids"));
  issues.push(...duplicates(pack.items.map((item) => item.targetRelativePath), "duplicate target paths"));

  const report: ProductionPackValidationReport = {
    id: `${pack.id}:validation`,
    state: issues.some((entry) => entry.severity === "blocked")
      ? "blocked"
      : issues.length > 0
        ? "needs-review"
        : "valid-preview-pack",
    issues,
    summary: [],
  };

  return { ...report, summary: summarizeProductionPackValidation(report) };
}

export function summarizeProductionPackValidation(report: ProductionPackValidationReport): string[] {
  if (report.issues.length === 0) return ["valid-preview-pack: manifest, items, targets, and approval boundary are reviewable."];
  return [
    `${report.state}: ${report.issues.length} validation note(s).`,
    ...report.issues.map((entry) => `${entry.label}: ${entry.detail}`),
  ];
}

function validateManifest(manifest: ProductionPackManifest | null | undefined): ProductionPackValidationIssue[] {
  if (!manifest) return [issue("missing manifest", "blocked", "Production pack manifest is required.")];
  const text = `${manifest.safetyPosture}\n${manifest.approvalBoundary}`.toLowerCase();
  const issues: ProductionPackValidationIssue[] = [];
  if (!text.includes("approval")) issues.push(issue("missing approval boundary", "blocked", "Manifest must include approval boundary."));
  if (!text.includes("source mutation")) issues.push(issue("missing source mutation boundary", "blocked", "Manifest must block source mutation."));
  return issues;
}

function duplicates(values: string[], label: string): ProductionPackValidationIssue[] {
  const seen = new Set<string>();
  const duplicateValues = values.filter((value) => {
    if (seen.has(value)) return true;
    seen.add(value);
    return false;
  });
  return Array.from(new Set(duplicateValues)).map((value) => issue(label, "blocked", value));
}

function issue(
  label: string,
  severity: ProductionPackValidationIssue["severity"],
  detail: string
): ProductionPackValidationIssue {
  return {
    id: `production-pack-${label.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`,
    severity,
    label,
    detail,
  };
}
