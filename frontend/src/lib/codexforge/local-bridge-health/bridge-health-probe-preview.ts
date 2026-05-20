import type { BridgeHealthProbePreview, BridgeHealthProbePreviewItem, BridgeHealthTarget } from "./local-bridge-health-types";
import { buildDefaultBridgeHealthTargets } from "./bridge-health-target";

export function buildBridgeHealthProbePreviewItem(input: BridgeHealthProbePreviewItem): BridgeHealthProbePreviewItem {
  return input;
}

function probeTypeForTarget(target: BridgeHealthTarget): BridgeHealthProbePreviewItem["probeType"] {
  if (target.id === "comfyui-local") return "local-http-health-future";
  if (target.id === "ffmpeg-local") return "version-command-future";
  if (target.id === "artifact-output-root") return "directory-boundary-future";
  if (target.targetKind === "executable") return "check-path-exists-future";
  if (target.targetKind === "manual") return "manual-confirmation";
  return "metadata-only";
}

export function buildBridgeHealthProbePreview(targets: BridgeHealthTarget[] = buildDefaultBridgeHealthTargets()): BridgeHealthProbePreview {
  const items = targets.map((target, index) =>
    buildBridgeHealthProbePreviewItem({
      id: `probe-preview-${target.id}`,
      order: index + 1,
      targetId: target.id,
      label: `${target.label} probe preview`,
      wouldCheck: target.expectedLocalRequirement,
      probeType: probeTypeForTarget(target),
      sideEffectSummary: "Preview only: no actual probe, no command execution, no HTTP calls, no filesystem writes, and no endpoint calls.",
      blocked: target.probeMode !== "safe-metadata-only",
      requiredApproval: "Future guarded health probe requires explicit operator approval and allowlist.",
      expectedResultShape: "status, configured flag, reachable status, missing config, blockers, warnings, evidence source, confidence",
      noExecutionGuarantee: "no-execution guarantee: preview only and no local app launch",
    })
  );
  return { id: "local-bridge-health-probe-preview", items, summary: summarizeBridgeHealthProbePreview({ id: "local-bridge-health-probe-preview", items, summary: [] }) };
}

export function summarizeBridgeHealthProbePreview(preview: BridgeHealthProbePreview): string[] {
  return [
    `${preview.items.length} probe preview items prepared.`,
    `${preview.items.filter((item) => item.blocked).length} preview items are blocked until future guarded health probe approval.`,
    "Probe preview says no actual probe, no command execution, no HTTP calls, no file writes, and no endpoint calls.",
  ];
}
