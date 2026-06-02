import { buildArtifactCaptureSummary } from "@/lib/codexforge/local-video-artifact-capture-mvp";
import type {
  RealLocalOutputArtifactCaptureBoundary,
  RealLocalOutputArtifactCaptureCheck,
  RealLocalOutputArtifactCaptureCheckId,
  RealLocalOutputArtifactCaptureCheckStatus,
  RealLocalOutputArtifactCaptureRecord,
  RealLocalOutputArtifactCaptureSummary,
} from "./real-local-output-artifact-capture-types";

const OUTPUT_CAPTURE_CHECK_COPY: Record<RealLocalOutputArtifactCaptureCheckId, string> = {
  "local output reference summary": "Local output reference summary is safe to show above the fold and avoids full local paths.",
  "artifact type": "Artifact type is recorded in plain English so review can route the output correctly.",
  "source trial": "Source trial records whether the output came from image, keyframe, or video draft trial.",
  "checksum status placeholder": "Checksum/status placeholder is used when no backend checksum has been calculated yet.",
  "review inbox handoff": "Review inbox handoff is required before reuse or promotion.",
  "recovery path": "Recovery path is recorded so failed or questionable outputs can be handled without deletion.",
  "export handoff": "Export handoff is prepared for later packaging without mutating the artifact.",
  "retention note": "Retention note explains that capture records the output and does not delete artifacts.",
  "no artifact deletion": "No artifact deletion is allowed from this capture boundary.",
  "no memory auto-promotion": "No memory auto-promotion is allowed; review stays manual.",
  "full local paths stay secondary": "Full local paths stay secondary and collapsed, never above the fold.",
};

export function buildRealLocalOutputArtifactCaptureRecord(): RealLocalOutputArtifactCaptureRecord {
  const capture = buildArtifactCaptureSummary();
  return {
    id: "real-local-output-artifact-capture-record",
    localOutputReferenceSummary: "Local output reference summary: reviewed local output label, source request, and supplied metadata only.",
    artifactType: capture.input.artifactKind,
    sourceTrial: "source trial: local image, keyframe, or video draft trial selected by reviewed handoff",
    checksumStatusPlaceholder: "checksum/status placeholder: pending backend checksum; status remains supplied-metadata until verified",
    reviewInboxHandoff: "Review inbox handoff: send the capture record to video review before reuse.",
    recoveryPath: "Recovery path: route failed or questionable output to recovery before retry.",
    exportHandoff: "Export handoff: prepare metadata for later export packaging without changing the artifact.",
    retentionNote: "Retention note: capture records what was produced and keeps artifacts; no delete behavior is exposed.",
    noDeleteBehavior: true,
    noMemoryAutoPromotion: true,
    fullLocalPathsStaySecondary: true,
  };
}

export function buildRealLocalOutputArtifactCaptureCheck(
  id: RealLocalOutputArtifactCaptureCheckId,
  status: RealLocalOutputArtifactCaptureCheckStatus
): RealLocalOutputArtifactCaptureCheck {
  return {
    id,
    status,
    label: id,
    plainEnglish: OUTPUT_CAPTURE_CHECK_COPY[id],
    blocksCapture: status === "blocked" || status === "needs-review",
  };
}

export function buildRealLocalOutputArtifactCaptureChecks(): RealLocalOutputArtifactCaptureCheck[] {
  return [
    buildRealLocalOutputArtifactCaptureCheck("local output reference summary", "ready"),
    buildRealLocalOutputArtifactCaptureCheck("artifact type", "ready"),
    buildRealLocalOutputArtifactCaptureCheck("source trial", "ready"),
    buildRealLocalOutputArtifactCaptureCheck("checksum status placeholder", "needs-review"),
    buildRealLocalOutputArtifactCaptureCheck("review inbox handoff", "ready"),
    buildRealLocalOutputArtifactCaptureCheck("recovery path", "ready"),
    buildRealLocalOutputArtifactCaptureCheck("export handoff", "ready"),
    buildRealLocalOutputArtifactCaptureCheck("retention note", "ready"),
    buildRealLocalOutputArtifactCaptureCheck("no artifact deletion", "ready"),
    buildRealLocalOutputArtifactCaptureCheck("no memory auto-promotion", "ready"),
    buildRealLocalOutputArtifactCaptureCheck("full local paths stay secondary", "ready"),
  ];
}

export function buildRealLocalOutputArtifactCaptureBoundary(): RealLocalOutputArtifactCaptureBoundary {
  return {
    id: "real-local-output-artifact-capture-boundary",
    capturesLocalOutputReferenceSummary: true,
    reviewInboxHandoff: true,
    recoveryPath: true,
    exportHandoff: true,
    retentionNote: true,
    artifactDeletionAllowed: false,
    arbitraryFileBrowsingAllowed: false,
    fullLocalPathsAboveFoldAllowed: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    automaticRunAllowed: false,
  };
}

export function summarizeRealLocalOutputArtifactCapture(summary: RealLocalOutputArtifactCaptureSummary): string {
  return `Real artifact capture from local output: Local output reference summary, Review inbox handoff, No artifact deletion, No memory auto-promotion, and Full local paths stay secondary. Status ${summary.status}.`;
}

export function buildRealLocalOutputArtifactCaptureSummary(): RealLocalOutputArtifactCaptureSummary {
  const checks = buildRealLocalOutputArtifactCaptureChecks();
  const blocked = checks.some((check) => check.status === "blocked");
  const needsReview = checks.some((check) => check.status === "needs-review");
  const status = blocked ? "blocked" : needsReview ? "needs-review" : "capture-ready";
  const summary: RealLocalOutputArtifactCaptureSummary = {
    record: buildRealLocalOutputArtifactCaptureRecord(),
    checks,
    boundary: buildRealLocalOutputArtifactCaptureBoundary(),
    status,
    summary: "",
  };
  return { ...summary, summary: summarizeRealLocalOutputArtifactCapture(summary) };
}
