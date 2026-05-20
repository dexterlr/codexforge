import type {
  BridgeReadinessAudit,
  RealCreativeReadinessAuditItem,
  RealCreativeReadinessAuditStatus,
  RealCreativeReadinessInput,
} from "./real-creative-readiness-types";
import {
  buildRealCreativeReadinessStableId,
  summarizeRealCreativeAuditStatus,
} from "./real-creative-readiness-types";
import { buildRealCreativeReadinessInput } from "./readiness-input";

type BridgeCheckKey =
  | "bridgeProfileExists"
  | "bridgeProfileConfigured"
  | "healthTargetExists"
  | "healthResultSupplied"
  | "localAppRequirementVisible"
  | "localEndpointRequirementVisible"
  | "artifactBoundaryVisible"
  | "safeProbePolicyExists"
  | "realProbeBlocked"
  | "executorDependsOnBridgeReadiness";

const CHECKS: Array<{
  key: BridgeCheckKey;
  label: string;
  critical: boolean;
  missingStatus: RealCreativeReadinessAuditStatus;
  detail: string;
  nextStep: string;
}> = [
  { key: "bridgeProfileExists", label: "bridge profile exists", critical: true, missingStatus: "blocker", detail: "A target executor needs an explicit local bridge profile record before future execution can be considered.", nextStep: "Complete local bridge setup." },
  { key: "bridgeProfileConfigured", label: "bridge profile configured", critical: true, missingStatus: "needs-config", detail: "Profile metadata must be complete enough to review local app, path, endpoint, and artifact boundaries.", nextStep: "Fill missing local bridge profile configuration." },
  { key: "healthTargetExists", label: "health target exists", critical: true, missingStatus: "blocker", detail: "The target executor must map to a Local Bridge Health target.", nextStep: "Add the health target metadata." },
  { key: "healthResultSupplied", label: "health result supplied", critical: true, missingStatus: "needs-config", detail: "Readiness can use supplied health evidence only; it must not probe local tools in Phase 70.", nextStep: "Supply or review health result evidence." },
  { key: "localAppRequirementVisible", label: "local app requirement visible", critical: true, missingStatus: "blocker", detail: "The audit must show whether Blender, ComfyUI, Unreal, ffmpeg, a local renderer, or a manual exporter is required.", nextStep: "Document local app requirements." },
  { key: "localEndpointRequirementVisible", label: "local endpoint requirement visible if applicable", critical: false, missingStatus: "warning", detail: "ComfyUI and custom local services need endpoint requirements visible without calling those endpoints.", nextStep: "Document endpoint requirements without probing." },
  { key: "artifactBoundaryVisible", label: "artifact boundary visible", critical: true, missingStatus: "blocker", detail: "Executor output boundaries must be visible before any future artifact write path exists.", nextStep: "Define the artifact output boundary." },
  { key: "safeProbePolicyExists", label: "safe probe policy exists", critical: true, missingStatus: "blocker", detail: "Future probes require a safe metadata-only policy and explicit approval.", nextStep: "Review safe probe policy." },
  { key: "realProbeBlocked", label: "real probe still blocked unless future phase", critical: true, missingStatus: "blocker", detail: "Phase 70 must not call local endpoints, launch apps, run commands, or inspect the filesystem through execution paths.", nextStep: "Keep real probes blocked until Phase 71 or later." },
  { key: "executorDependsOnBridgeReadiness", label: "executor depends on bridge readiness", critical: true, missingStatus: "blocker", detail: "No future executor can bypass bridge readiness evidence.", nextStep: "Keep bridge health before real executor work." },
];

export function buildBridgeReadinessAuditItem(input: {
  input: RealCreativeReadinessInput;
  key: BridgeCheckKey;
  label: string;
  critical: boolean;
  missingStatus: RealCreativeReadinessAuditStatus;
  detail: string;
  nextStep: string;
}): RealCreativeReadinessAuditItem {
  const passed = input.input.evidence[input.key];
  return {
    itemId: buildRealCreativeReadinessStableId("bridge-readiness-item", [
      input.input.auditId,
      input.key,
    ]),
    label: input.label,
    status: passed ? "ready" : input.missingStatus,
    detail: input.detail,
    evidence: passed ? "Supplied readiness evidence passes this bridge check." : "Supplied readiness evidence is missing or incomplete.",
    critical: input.critical,
    nextStep: passed ? "Keep this bridge requirement visible." : input.nextStep,
  };
}

export function buildBridgeReadinessAudit(
  input: RealCreativeReadinessInput = buildRealCreativeReadinessInput()
): BridgeReadinessAudit {
  const items = CHECKS.map((check) => buildBridgeReadinessAuditItem({ input, ...check }));
  const status = summarizeRealCreativeAuditStatus(items);
  const audit = {
    auditId: buildRealCreativeReadinessStableId("bridge-readiness-audit", [
      input.auditId,
      input.targetExecutorKind,
    ]),
    targetExecutorKind: input.targetExecutorKind,
    status,
    items,
    blockerCount: items.filter((item) => item.status === "blocker" || item.status === "needs-config").length,
    warningCount: items.filter((item) => item.status === "warning").length,
    summary: [] as string[],
  };

  return { ...audit, summary: summarizeBridgeReadinessAudit(audit) };
}

export function summarizeBridgeReadinessAudit(
  audit: Pick<BridgeReadinessAudit, "items" | "status" | "blockerCount" | "warningCount">
): string[] {
  return [
    `Bridge readiness status: ${audit.status}.`,
    `${audit.blockerCount} bridge readiness blocker or configuration item(s), ${audit.warningCount} warning(s).`,
    "Executor readiness depends on local bridge readiness, artifact boundary visibility, safe probe policy, and real probe still blocked unless future phase.",
  ];
}
