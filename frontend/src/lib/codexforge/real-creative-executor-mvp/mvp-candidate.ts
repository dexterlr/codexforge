import type { RealCreativeMvpCandidate } from "./real-creative-mvp-types";

const SHARED_OUTPUT_BOUNDARY = [
  "artifact root required",
  "no parent traversal",
  "no source tree output unless reviewed",
  "metadata and provenance required",
];

const SHARED_APPROVAL = [
  "operator explicitly selects candidate",
  "operator acknowledges output boundary",
  "operator confirms no secrets",
  "operator confirms latest-message authority",
];

const SHARED_KILL_SWITCH = [
  "queued job cancellation",
  "timeout policy",
  "partial artifact handling",
  "future executor stop boundary before real render",
];

const SHARED_REVIEW = [
  "provenance label",
  "metadata attached",
  "safety review",
  "approve or reject in review route",
];

export function buildRealCreativeMvpCandidate(
  input: Partial<RealCreativeMvpCandidate> & Pick<RealCreativeMvpCandidate, "candidateId" | "label">
): RealCreativeMvpCandidate {
  return {
    executorKind: "unknown",
    adapterId: "none",
    scope: "design-only MVP candidate review",
    userValue: "Operator can compare a safe first path before implementation.",
    riskLevel: "medium",
    requiredBridgeHealth: ["local bridge health evidence present or explicitly not required"],
    requiredProbeEvidence: ["Future Guarded Health Probe evidence present if candidate depends on a local tool"],
    requiredOutputBoundary: SHARED_OUTPUT_BOUNDARY,
    requiredApproval: SHARED_APPROVAL,
    requiredKillSwitch: SHARED_KILL_SWITCH,
    requiredArtifactReview: SHARED_REVIEW,
    currentStatus: "design-only",
    blockedReasons: [],
    recommended: false,
    ...input,
  };
}

export function buildDefaultRealCreativeMvpCandidates(): RealCreativeMvpCandidate[] {
  return [
    buildRealCreativeMvpCandidate({
      candidateId: "artifact-capture-only",
      label: "Artifact capture only",
      executorKind: "artifact-capture",
      adapterId: "artifact-capture",
      scope: "Capture an already supplied or placeholder artifact into a review packet without writing files.",
      userValue: "Gives the operator a real review loop shape with the smallest blast radius.",
      riskLevel: "low",
      requiredBridgeHealth: ["artifact workspace boundary visible"],
      requiredProbeEvidence: ["no local tool probe required", "sandbox evidence labels placeholder artifacts"],
      currentStatus: "mvp-candidate",
      recommended: true,
    }),
    buildRealCreativeMvpCandidate({
      candidateId: "manual-export-review-loop",
      label: "Manual export review loop",
      executorKind: "manual-export",
      adapterId: "manual-export",
      scope: "Operator manually exports outside CodexForge, then CodexForge reviews metadata and approval posture.",
      userValue: "Useful first workflow when local execution remains blocked.",
      riskLevel: "low",
      requiredBridgeHealth: ["manual export source identified"],
      requiredProbeEvidence: ["operator-supplied export evidence", "sandbox review handoff evidence"],
      currentStatus: "sandbox-ready",
    }),
    buildRealCreativeMvpCandidate({
      candidateId: "blender-script-dry-run-to-file-preview",
      label: "Blender script dry-run to file preview",
      executorKind: "blender",
      adapterId: "blender-adapter-preview",
      scope: "Preview a future Blender script request and output filename only.",
      userValue: "High planning value, but still too close to local app execution for the first MVP.",
      riskLevel: "high",
      requiredBridgeHealth: ["Blender profile configured", "Future Guarded Health Probe result reviewed"],
      requiredProbeEvidence: ["blender-version probe evidence", "dry-run script review evidence"],
      currentStatus: "not-recommended",
      blockedReasons: ["real Blender execution is blocked", "file output would need executor implementation"],
    }),
    buildRealCreativeMvpCandidate({
      candidateId: "comfyui-manual-workflow-export",
      label: "ComfyUI manual workflow export",
      executorKind: "comfyui",
      adapterId: "comfyui-adapter-preview",
      scope: "Review a manually exported workflow manifest without calling a local endpoint.",
      userValue: "Good future candidate after manual export evidence is clearer.",
      riskLevel: "medium",
      requiredBridgeHealth: ["ComfyUI profile documented, endpoint not called"],
      requiredProbeEvidence: ["manual workflow export evidence", "no arbitrary endpoint evidence"],
      currentStatus: "sandbox-ready",
      blockedReasons: ["local HTTP endpoint execution remains blocked"],
    }),
    buildRealCreativeMvpCandidate({
      candidateId: "ffmpeg-version-probe-only",
      label: "ffmpeg version probe only",
      executorKind: "ffmpeg",
      adapterId: "ffmpeg-probe-preview",
      scope: "Future metadata probe only, never media processing.",
      userValue: "Confirms setup but does not create creative value.",
      riskLevel: "medium",
      requiredBridgeHealth: ["ffmpeg target allowlisted"],
      requiredProbeEvidence: ["ffmpeg-version evidence reviewed"],
      currentStatus: "probe-ready",
      blockedReasons: ["probe-only is not creative job execution"],
    }),
    buildRealCreativeMvpCandidate({
      candidateId: "blender-version-probe-only",
      label: "Blender version probe only",
      executorKind: "blender",
      adapterId: "blender-version-probe",
      scope: "Future metadata probe only, never Blender job execution.",
      userValue: "Confirms setup before any future Blender executor work.",
      riskLevel: "medium",
      requiredBridgeHealth: ["Blender target allowlisted"],
      requiredProbeEvidence: ["blender-version evidence reviewed"],
      currentStatus: "probe-ready",
      blockedReasons: ["probe-only is not creative job execution"],
    }),
    buildRealCreativeMvpCandidate({
      candidateId: "comfyui-health-probe-only",
      label: "ComfyUI health probe only",
      executorKind: "comfyui",
      adapterId: "comfyui-health-probe",
      scope: "Future metadata endpoint probe only, never workflow execution.",
      userValue: "Confirms endpoint shape when local HTTP probes become guarded.",
      riskLevel: "medium",
      requiredBridgeHealth: ["ComfyUI endpoint target allowlisted"],
      requiredProbeEvidence: ["comfyui-health-endpoint evidence reviewed"],
      currentStatus: "probe-ready",
      blockedReasons: ["local HTTP calls are blocked in Phase 72"],
    }),
    buildRealCreativeMvpCandidate({
      candidateId: "local-renderer-placeholder",
      label: "Local renderer placeholder",
      executorKind: "local-renderer",
      adapterId: "local-renderer-placeholder",
      scope: "Placeholder request model only.",
      userValue: "Keeps future renderer concept visible without selecting it.",
      riskLevel: "high",
      currentStatus: "unknown",
      blockedReasons: ["renderer identity and stop boundary are undefined"],
    }),
    buildRealCreativeMvpCandidate({
      candidateId: "blocked-mixed-pipeline",
      label: "Blocked mixed pipeline",
      executorKind: "mixed-pipeline",
      adapterId: "mixed-pipeline",
      scope: "Multiple tools in one future pipeline.",
      userValue: "Too broad for first real execution MVP.",
      riskLevel: "blocked",
      currentStatus: "blocked",
      blockedReasons: ["mixed-pipeline rejected as first MVP", "blast radius spans multiple adapters"],
    }),
  ];
}

export function summarizeRealCreativeMvpCandidate(candidate: RealCreativeMvpCandidate): string[] {
  return [
    `Candidate: ${candidate.label} (${candidate.candidateId}).`,
    `Executor kind: ${candidate.executorKind}; adapter: ${candidate.adapterId}.`,
    `Status: ${candidate.currentStatus}; risk: ${candidate.riskLevel}.`,
    `Recommended: ${String(candidate.recommended)}.`,
    `Blocked reasons: ${candidate.blockedReasons.length === 0 ? "none" : candidate.blockedReasons.join("; ")}.`,
  ];
}
