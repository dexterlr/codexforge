import { classifyGroundedFixRisk, scoreGroundedFixRisk } from "./fix-risk-model";
import { uniqueGroundedFixStrings, type GroundedFixCandidate, type GroundedFixFileImpact, type GroundedFixFileImpactItem } from "./grounded-fix-types";

function smokeScriptsFor(filePath: string): string[] {
  const path = filePath.toLowerCase();
  const scripts = ["scripts/smoke-codexforge-grounded-fix-recommendation.ps1"];
  if (path.includes("evidence-grounded-chat") || path.includes("/ai/")) scripts.push("scripts/smoke-codexforge-evidence-grounded-chat.ps1");
  if (path.includes("patch-preview") || path.includes("files")) scripts.push("scripts/smoke-codexforge-patch-preview.ps1");
  if (path.includes("mission-control")) scripts.push("scripts/smoke-codexforge-mission-control.ps1");
  if (path.includes("task")) scripts.push("scripts/smoke-codexforge-task-activation.ps1");
  return uniqueGroundedFixStrings(scripts);
}

export function buildGroundedFixFileImpactItem(args: {
  filePath: string;
  candidate?: GroundedFixCandidate;
  role?: GroundedFixFileImpactItem["role"];
  riskHints?: readonly string[];
}): GroundedFixFileImpactItem {
  const score = scoreGroundedFixRisk({ targetFiles: [args.filePath], signals: [], mutationRequired: true });
  return {
    filePath: args.filePath,
    role: args.role ?? "primary-target",
    impactLevel: classifyGroundedFixRisk(score),
    reason: "Target file is part of a reviewed fix recommendation and must be inspected before patch preview.",
    riskHints: uniqueGroundedFixStrings([...(args.riskHints ?? []), ...(args.candidate?.relatedRisks ?? [])]),
    requiredVerification: [
      "Verify current files before edits.",
      "Confirm evidence is context, not proof.",
      "Produce preview diff only in Safe Patch Preview.",
    ],
    suggestedSmokeScripts: smokeScriptsFor(args.filePath),
    safePatchPreviewRequired: true,
  };
}

export function buildGroundedFixFileImpact(candidate: GroundedFixCandidate): GroundedFixFileImpact {
  const items = candidate.targetFiles.map((filePath) =>
    buildGroundedFixFileImpactItem({ filePath, candidate, role: "primary-target" })
  );
  return {
    id: "grounded-fix-file-impact",
    candidateId: candidate.id,
    items,
    summary: summarizeGroundedFixFileImpact(items),
  };
}

export function summarizeGroundedFixFileImpact(items: readonly GroundedFixFileImpactItem[]): string[] {
  const smoke = uniqueGroundedFixStrings(items.flatMap((item) => item.suggestedSmokeScripts));
  return [
    `${items.length} impacted files require current inspection.`,
    `${smoke.length} smoke scripts are suggested for verification.`,
    "Safe Patch Preview is required before any file edit.",
  ];
}
