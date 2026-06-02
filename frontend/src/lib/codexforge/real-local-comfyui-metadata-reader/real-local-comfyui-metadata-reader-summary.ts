import { buildComfyUiMetadataSummary } from "@/lib/codexforge/comfyui-metadata-probe";
import type {
  RealLocalComfyUiMetadataCapabilityStatus,
  RealLocalComfyUiMetadataCapabilitySummary,
  RealLocalComfyUiMetadataReaderContract,
  RealLocalComfyUiMetadataReaderSummary,
} from "./real-local-comfyui-metadata-reader-types";

export function buildRealLocalComfyUiMetadataReaderContract(): RealLocalComfyUiMetadataReaderContract {
  return {
    id: "real-local-comfyui-metadata-reader-contract",
    title: "Real local ComfyUI metadata reader",
    localOnly: true,
    metadataIsSummarizedSafely: true,
    arbitraryLocalFileBrowsingAllowed: false,
    fullLocalPathsAboveFoldAllowed: false,
    rawMetadataAboveFoldAllowed: false,
    cloudCallsAllowed: false,
    secretsShown: false,
  };
}

export function buildRealLocalComfyUiMetadataCapabilitySummary(args: {
  id: string;
  label: string;
  status: RealLocalComfyUiMetadataCapabilityStatus;
  plainEnglish: string;
}): RealLocalComfyUiMetadataCapabilitySummary {
  return {
    id: args.id,
    label: args.label,
    status: args.status,
    plainEnglish: args.plainEnglish,
  };
}

export function buildRealLocalComfyUiMetadataCapabilitySummaries(): RealLocalComfyUiMetadataCapabilitySummary[] {
  return [
    buildRealLocalComfyUiMetadataCapabilitySummary({
      id: "status-source",
      label: "detected ComfyUI status source",
      status: "unknown",
      plainEnglish: "Detected ComfyUI status source is summarized safely and may come from an existing preview or a future approved local probe.",
    }),
    buildRealLocalComfyUiMetadataCapabilitySummary({
      id: "node-type-summary",
      label: "available node/type summary",
      status: "unknown",
      plainEnglish: "Available node/type summary is compact and does not show a giant raw JSON block above the fold.",
    }),
    buildRealLocalComfyUiMetadataCapabilitySummary({
      id: "model-checkpoint-visibility",
      label: "model/checkpoint visibility status",
      status: "not-read",
      plainEnglish: "Model/checkpoint visibility status avoids arbitrary local file browsing and avoids full local paths above the fold.",
    }),
    buildRealLocalComfyUiMetadataCapabilitySummary({
      id: "workflow-compatibility",
      label: "workflow compatibility hints",
      status: "unknown",
      plainEnglish: "Workflow compatibility hints connect metadata readiness to workflow dry run and package validation.",
    }),
    buildRealLocalComfyUiMetadataCapabilitySummary({
      id: "missing-capabilities",
      label: "missing capability hints",
      status: "unknown",
      plainEnglish: "Missing capability hints stay in plain English so a novice can see what blocks the next step.",
    }),
  ];
}

export function summarizeRealLocalComfyUiMetadataReader(
  summary: RealLocalComfyUiMetadataReaderSummary
): string {
  return `${summary.contract.title}: Metadata is summarized safely from ${summary.sourceLabel}; Advanced metadata is secondary, No arbitrary local file browsing, and No secrets are shown.`;
}

export function buildRealLocalComfyUiMetadataReaderSummary(): RealLocalComfyUiMetadataReaderSummary {
  const existingMetadata = buildComfyUiMetadataSummary();
  const contract = buildRealLocalComfyUiMetadataReaderContract();
  const summary: RealLocalComfyUiMetadataReaderSummary = {
    contract,
    status: existingMetadata.result.localOnlyStatus === "not-local" ? "blocked" : "needs-review",
    statusSource: "existing-preview",
    sourceLabel: existingMetadata.result.resultSource,
    capabilitySummary: buildRealLocalComfyUiMetadataCapabilitySummaries(),
    modelCheckpointVisibilityStatus:
      "Model and checkpoint visibility can be summarized as present, missing, or unknown without browsing arbitrary files.",
    workflowCompatibilityHints: [
      "Use node/type summary to flag missing custom nodes before submit trial.",
      "Use model visibility status to mark missing model/node risk without exposing full local paths.",
      "Send package readiness to the workflow package validator before any approved submit trial.",
    ],
    missingCapabilityHints: [
      "Unknown ComfyUI version stays needs review.",
      "Unknown node list stays needs review.",
      "Unknown model/checkpoint visibility stays needs review.",
    ],
    privacySafetyNotes: [
      "No secrets are shown.",
      "No cloud APIs are called.",
      "No arbitrary local file browsing.",
      "Advanced metadata is secondary and collapsed.",
    ],
    advancedMetadataSecondary: true,
    summary: "",
  };
  return { ...summary, summary: summarizeRealLocalComfyUiMetadataReader(summary) };
}
