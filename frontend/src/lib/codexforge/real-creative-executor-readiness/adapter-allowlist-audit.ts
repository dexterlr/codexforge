import type {
  AdapterAllowlistAudit,
  RealCreativeReadinessAuditItem,
  RealCreativeReadinessAuditStatus,
  RealCreativeReadinessInput,
} from "./real-creative-readiness-types";
import {
  buildRealCreativeReadinessStableId,
  summarizeRealCreativeAuditStatus,
} from "./real-creative-readiness-types";
import { buildRealCreativeReadinessInput } from "./readiness-input";

type AdapterCheckKey =
  | "adapterIdKnown"
  | "adapterKindKnown"
  | "adapterAllowlisted"
  | "allowedModeSafe"
  | "sideEffectsDocumented"
  | "approvalRequirementsDocumented"
  | "blockedModesDocumented"
  | "sourceRouteKnown"
  | "noBroadWildcardAdapters"
  | "noArbitraryCommandAdapter";

const CHECKS: Array<{
  key: AdapterCheckKey;
  label: string;
  critical: boolean;
  missingStatus: RealCreativeReadinessAuditStatus;
  detail: string;
  nextStep: string;
}> = [
  { key: "adapterIdKnown", label: "adapter id known", critical: true, missingStatus: "blocker", detail: "A future executor must reference a named adapter, not an implicit capability.", nextStep: "Review adapter allowlist." },
  { key: "adapterKindKnown", label: "adapter kind known", critical: true, missingStatus: "blocker", detail: "The adapter kind must map to blender, comfyui, unreal, ffmpeg, local-renderer, artifact-capture, manual-export, or mixed-pipeline.", nextStep: "Document adapter kind." },
  { key: "adapterAllowlisted", label: "adapter is allowlisted", critical: true, missingStatus: "blocker", detail: "Only explicit allowlist entries can ever reach a future guarded executor.", nextStep: "Add or review explicit adapter allowlist entry." },
  { key: "allowedModeSafe", label: "allowed mode is dry-run/future-guarded", critical: true, missingStatus: "blocker", detail: "Phase 70 accepts preview, dry-run, or future-guarded modes only; real execution remains blocked.", nextStep: "Change allowed mode to dry-run or future-guarded preview." },
  { key: "sideEffectsDocumented", label: "side effects documented", critical: true, missingStatus: "blocker", detail: "Potential local app launches, endpoint calls, renders, file writes, and resource use must be visible as future-only risks.", nextStep: "Document side effects." },
  { key: "approvalRequirementsDocumented", label: "approval requirements documented", critical: true, missingStatus: "blocker", detail: "Adapter execution cannot be considered unless approval requirements are explicit.", nextStep: "Document approval requirements." },
  { key: "blockedModesDocumented", label: "blocked modes documented", critical: true, missingStatus: "blocker", detail: "Unsafe or unimplemented execution modes must be listed as blocked.", nextStep: "Document blocked modes." },
  { key: "sourceRouteKnown", label: "source route known", critical: false, missingStatus: "warning", detail: "The adapter should link back to its preview route for operator review.", nextStep: "Document source route." },
  { key: "noBroadWildcardAdapters", label: "no broad wildcard adapters", critical: true, missingStatus: "blocker", detail: "Wildcard adapters are unsafe because they can hide unreviewed tool behavior.", nextStep: "Remove wildcard adapter posture." },
  { key: "noArbitraryCommandAdapter", label: "no arbitrary command adapter", critical: true, missingStatus: "blocker", detail: "Arbitrary command adapters are not valid real creative executor candidates.", nextStep: "Keep command execution out of creative adapter allowlists." },
];

export function buildAdapterAllowlistAuditItem(input: {
  input: RealCreativeReadinessInput;
  key: AdapterCheckKey;
  label: string;
  critical: boolean;
  missingStatus: RealCreativeReadinessAuditStatus;
  detail: string;
  nextStep: string;
}): RealCreativeReadinessAuditItem {
  const passed = input.input.evidence[input.key];
  return {
    itemId: buildRealCreativeReadinessStableId("adapter-allowlist-item", [
      input.input.auditId,
      input.key,
    ]),
    label: input.label,
    status: passed ? "ready" : input.missingStatus,
    detail: input.detail,
    evidence: passed ? "Allowlist evidence is explicit and bounded." : "Allowlist evidence is missing or unsafe.",
    critical: input.critical,
    nextStep: passed ? "Keep adapter allowlist narrow." : input.nextStep,
  };
}

export function buildAdapterAllowlistAudit(
  input: RealCreativeReadinessInput = buildRealCreativeReadinessInput()
): AdapterAllowlistAudit {
  const items = CHECKS.map((check) => buildAdapterAllowlistAuditItem({ input, ...check }));
  const status = summarizeRealCreativeAuditStatus(items);
  const audit = {
    auditId: buildRealCreativeReadinessStableId("adapter-allowlist-audit", [
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

  return { ...audit, summary: summarizeAdapterAllowlistAudit(audit) };
}

export function summarizeAdapterAllowlistAudit(
  audit: Pick<AdapterAllowlistAudit, "items" | "status" | "blockerCount" | "warningCount">
): string[] {
  return [
    `Adapter allowlist status: ${audit.status}.`,
    `${audit.items.length} adapter allowlist checks reviewed; ${audit.blockerCount} blocker/config item(s), ${audit.warningCount} warning(s).`,
    "Allowlist audit checks adapter id known, adapter kind known, dry-run/future-guarded mode, no broad wildcard adapters, and no arbitrary command adapter.",
  ];
}
