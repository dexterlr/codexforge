import type {
  CreativeExecutorArtifactCapture,
  CreativeExecutorArtifactCaptureItem,
  CreativeExecutorRequest,
} from "./guarded-creative-executor-types";
import { buildCreativeExecutorStableId } from "./guarded-creative-executor-types";
import { buildCreativeExecutorRequest } from "./creative-executor-request";

export function buildCreativeExecutorArtifactCaptureItem(
  input: CreativeExecutorArtifactCaptureItem
): CreativeExecutorArtifactCaptureItem {
  return input;
}

export function buildCreativeExecutorArtifactCapture(
  request: CreativeExecutorRequest = buildCreativeExecutorRequest()
): CreativeExecutorArtifactCapture {
  const items = request.expectedOutputArtifacts.map((artifact, index) =>
    buildCreativeExecutorArtifactCaptureItem({
      artifactId: buildCreativeExecutorStableId("creative-executor-artifact", [
        request.requestId,
        artifact,
        index,
      ]),
      type: artifact,
      sourceExecutorKind: request.requestedExecutorKind,
      placeholderPath: `{future-executor-output}/${request.adapterId}/${artifact}-${index + 1}`,
      metadataToCapture: [
        "source packet id",
        "adapter id",
        "executor kind",
        "operator approval id",
        "dry-run id",
        "latest-message authority note",
      ],
      provenanceSource: request.sourcePacketId,
      reviewRoute: "/artifacts/review",
      retentionStrategy: "retain as reviewed artifact metadata until operator export decision",
      safetyNote: "Artifact capture is planned metadata only; no file writes occur from UI.",
      captureStatus: index === 0 ? "waiting-for-future-executor" : "planned",
    })
  );

  return {
    captureId: buildCreativeExecutorStableId("creative-executor-artifact-capture", [request.requestId]),
    requestId: request.requestId,
    items,
    ready: items.length > 0,
    summary: summarizeCreativeExecutorArtifactCapture({ items, ready: items.length > 0 }),
  };
}

export function summarizeCreativeExecutorArtifactCapture(
  capture: Pick<CreativeExecutorArtifactCapture, "items" | "ready">
): string[] {
  return [
    `Artifact capture ready: ${String(capture.ready)}.`,
    `${capture.items.length} capture items planned.`,
    "Artifact capture has waiting-for-future-executor for future executor outputs.",
    "No artifact files are written from this UI.",
  ];
}
