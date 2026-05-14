import type { ArtifactPolicyBoundary } from "./artifact-types";

export function buildArtifactPolicyBoundary(): ArtifactPolicyBoundary {
  const rules = [
    {
      id: "source-mutation",
      label: "source mutation blocked",
      blocked: true,
      detail: "The executor returns previews only and cannot change project source files.",
      futureRequirement: "future artifact write requires guarded approval",
    },
    {
      id: "command-execution",
      label: "command execution blocked",
      blocked: true,
      detail: "The UI cannot launch local commands or shell-backed adapters.",
      futureRequirement: "future execution requires Operator Run Center and Local Bridge consent where relevant",
    },
    {
      id: "external-app-execution",
      label: "external app execution blocked",
      blocked: true,
      detail: "Blender, Unreal, ComfyUI, desktop, camera, and video render execution remain unavailable here.",
      futureRequirement: "route through approved local adapters after consent and audit checks",
    },
    {
      id: "broker-execution",
      label: "broker execution blocked",
      blocked: true,
      detail: "Trading and broker actions are outside this executor boundary.",
      futureRequirement: "no approval path exists for broker actions in this surface",
    },
    {
      id: "preview-generation",
      label: "preview generation allowed",
      blocked: false,
      detail: "Pure deterministic string and JSON previews may be generated locally.",
      futureRequirement: "preserve preview-only language and validation notes",
    },
  ];

  return {
    id: "artifact-policy-boundary-phase-10",
    mode: "preview-only",
    previewGenerationAllowed: true,
    futureArtifactWriteRequiresApproval: true,
    futureExecutionRequiresRunAndBridgeConsent: true,
    rules,
    blockedActions: rules.filter((rule) => rule.blocked).map((rule) => rule.label),
    summary: [
      "preview generation allowed",
      "source mutation blocked",
      "command execution blocked",
      "external app execution blocked",
      "approval required before future writes/execution",
    ],
  };
}

export function isArtifactGenerationBlocked(
  boundary: ArtifactPolicyBoundary,
  action: string
): boolean {
  const normalized = action.trim().toLowerCase();
  if (normalized.includes("preview")) return false;
  return boundary.rules.some(
    (rule) => rule.blocked && normalized.includes(rule.id.replaceAll("-", " "))
  ) || boundary.blockedActions.some((blocked) => normalized.includes(blocked));
}

export function summarizeArtifactPolicyBoundary(
  boundary: ArtifactPolicyBoundary
): string[] {
  return [
    ...boundary.summary,
    boundary.futureArtifactWriteRequiresApproval
      ? "future artifact write requires guarded approval"
      : "future artifact write gate missing",
    boundary.futureExecutionRequiresRunAndBridgeConsent
      ? "future execution requires Operator Run Center and Local Bridge consent where relevant"
      : "future execution consent gate missing",
  ];
}
