import type {
  ArtifactBrainSignal,
  ArtifactIngestionReadiness,
  ArtifactIngestionReadinessDimension,
  ArtifactIngestionSource,
  ArtifactMemoryCandidate,
} from "./artifact-ingestion-types";
import { buildArtifactIngestionStableKey } from "./artifact-ingestion-types";

export function buildArtifactIngestionReadiness(args: {
  source: ArtifactIngestionSource;
  memoryCandidate?: ArtifactMemoryCandidate;
  brainSignals?: ArtifactBrainSignal[];
}): ArtifactIngestionReadiness {
  const dimensions: ArtifactIngestionReadinessDimension[] = [
    buildDimension(
      "artifact-metadata-quality",
      "Artifact metadata quality",
      scoreMetadata(args.source),
      "Title, type, target workspace path, and artifact id are present."
    ),
    buildDimension(
      "validation-quality",
      "Validation quality",
      args.source.validationResult === "valid-export" ? 92 : args.source.validationResult === "blocked" ? 0 : 58,
      `Validation result is ${args.source.validationResult}.`
    ),
    buildDimension(
      "replay-quality",
      "Replay quality",
      args.source.replaySummary.length > 0 ? 82 : 52,
      args.source.replaySummary.length > 0 ? "Replay summary is available." : "Replay summary is sparse."
    ),
    buildDimension(
      "source-traceability",
      "Source traceability",
      args.source.sourceSurface && args.source.sourceRunId ? 86 : 44,
      "Source surface and run id support review."
    ),
    buildDimension(
      "memory-confidence",
      "Memory confidence",
      Math.round((args.memoryCandidate?.confidence ?? 0.45) * 100),
      "Deterministic cognitive memory scoring produced a candidate confidence."
    ),
    buildDimension(
      "graph-signal-readiness",
      "Graph signal readiness",
      scoreSignals(args.brainSignals ?? []),
      "Brain signals are candidates only and await future guarded runtime ingestion."
    ),
    buildDimension(
      "safety-posture",
      "Safety posture",
      args.source.safetyPosture.toLowerCase().includes("source mutation blocked") ? 94 : 70,
      "Safety posture is explicit and local-first."
    ),
  ];
  const score = scoreArtifactIngestionReadiness(dimensions);
  const readiness: ArtifactIngestionReadiness = {
    id: buildArtifactIngestionStableKey("artifact-ingestion-readiness", args.source.sourcePackId, args.source.artifactId),
    artifactId: args.source.artifactId,
    score,
    state: dimensions.some((dimension) => dimension.state === "blocked")
      ? "blocked"
      : score >= 72
        ? "ready-for-review"
        : "needs-review",
    dimensions,
    summary: [],
  };

  return { ...readiness, summary: summarizeArtifactIngestionReadiness(readiness) };
}

export function scoreArtifactIngestionReadiness(
  dimensionsOrReadiness: ArtifactIngestionReadinessDimension[] | ArtifactIngestionReadiness
): number {
  const dimensions = Array.isArray(dimensionsOrReadiness)
    ? dimensionsOrReadiness
    : dimensionsOrReadiness.dimensions;

  if (dimensions.length === 0) return 0;
  return Math.round(dimensions.reduce((sum, dimension) => sum + dimension.score, 0) / dimensions.length);
}

export function summarizeArtifactIngestionReadiness(
  readinessOrItems: ArtifactIngestionReadiness | ArtifactIngestionReadiness[]
): string[] {
  if (Array.isArray(readinessOrItems)) {
    const ready = readinessOrItems.filter((item) => item.state === "ready-for-review").length;
    const blocked = readinessOrItems.filter((item) => item.state === "blocked").length;
    return [
      `${readinessOrItems.length} artifact ingestion readiness record(s).`,
      `${ready} ready for review; ${blocked} blocked.`,
      "Readiness is advisory and does not persist memory or graph changes.",
    ];
  }

  return [
    `Artifact ${readinessOrItems.artifactId} readiness score is ${readinessOrItems.score}.`,
    `State: ${readinessOrItems.state}.`,
    "Review before promotion; no direct graph mutation.",
  ];
}

function buildDimension(
  id: ArtifactIngestionReadinessDimension["id"],
  label: string,
  score: number,
  detail: string
): ArtifactIngestionReadinessDimension {
  const bounded = Math.min(100, Math.max(0, score));
  return {
    id,
    label,
    score: bounded,
    state: bounded >= 72 ? "ready" : bounded > 0 ? "needs-review" : "blocked",
    detail,
  };
}

function scoreMetadata(source: ArtifactIngestionSource): number {
  const fields = [
    source.artifactId,
    source.title,
    source.artifactType,
    source.targetWorkspacePath,
    source.sourceSurface,
    source.sourceRunId,
  ];
  return Math.round((fields.filter((field) => field.trim().length > 0).length / fields.length) * 100);
}

function scoreSignals(signals: ArtifactBrainSignal[]): number {
  if (signals.length === 0) return 44;
  const ready = signals.filter((signal) => signal.readiness === "ready").length;
  const blocked = signals.filter((signal) => signal.readiness === "blocked").length;
  return Math.round((ready / signals.length) * 100 - blocked * 12 + 58);
}
