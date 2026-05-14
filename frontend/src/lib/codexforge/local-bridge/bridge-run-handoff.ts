import { buildBridgeAdapterMatrix } from "./bridge-adapters";
import { buildBridgeConsentBoundary } from "./bridge-consent";
import { buildBridgePolicyBoundary } from "./bridge-policy";
import type {
  BridgeAdapterMatrixItem,
  BridgeConsentBoundary,
  BridgePolicyBoundary,
  BridgeRunHandoff,
} from "./bridge-types";

export function buildBridgeRunHandoff(args: {
  selectedAdapter?: BridgeAdapterMatrixItem;
  consentBoundary?: BridgeConsentBoundary;
  policyBoundary?: BridgePolicyBoundary;
} = {}): BridgeRunHandoff {
  const selectedAdapter = args.selectedAdapter ?? buildBridgeAdapterMatrix().items[6];
  const consentBoundary = args.consentBoundary ?? buildBridgeConsentBoundary();
  const policyBoundary = args.policyBoundary ?? buildBridgePolicyBoundary();
  const blocked = selectedAdapter.readiness === "blocked" || selectedAdapter.family === "broker execution";

  return {
    id: `bridge-handoff:${selectedAdapter.family.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    selectedAdapter,
    consentBoundary,
    policyBoundary,
    previewRunPayload: {
      mode: "preview-only",
      adapter: selectedAdapter.label,
      capability: selectedAdapter.capability,
      action: "prepare-operator-run-center-handoff-preview",
    },
    validationChecklist: [
      "Confirm selected adapter.",
      "Confirm consent boundary.",
      "Confirm policy boundary.",
      "Confirm preview run payload.",
      "Confirm blocked/approval state.",
    ],
    blocked,
    approvalState: blocked ? "blocked" : "required-before-future-execution",
  };
}

export function summarizeBridgeRunHandoff(
  handoff: BridgeRunHandoff = buildBridgeRunHandoff()
): string[] {
  return [
    `Selected adapter: ${handoff.selectedAdapter.label}`,
    `Preview payload mode: ${handoff.previewRunPayload.mode}`,
    `Approval state: ${handoff.approvalState}`,
    handoff.blocked ? "Execution remains blocked." : "Future execution requires approval.",
  ];
}

export function buildBridgeRunPrompt(handoff: BridgeRunHandoff = buildBridgeRunHandoff()): string {
  return [
    "Prepare an Operator Run Center preview for the selected local bridge adapter.",
    `Adapter: ${handoff.selectedAdapter.label}`,
    `Capability: ${handoff.previewRunPayload.capability}`,
    `Mode: ${handoff.previewRunPayload.mode}`,
    `Approval state: ${handoff.approvalState}`,
    "Do not execute; only validate consent, policy, and handoff readiness.",
  ].join("\n");
}
