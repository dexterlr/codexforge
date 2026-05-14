import type { ArtifactExportRequest } from "@/lib/codexforge/artifact-workspace";
import type { ExportResultLedgerItem } from "@/lib/codexforge/artifact-export-flow";
import type { ProductionPack } from "@/lib/codexforge/production-pack";
import {
  buildArtifactIngestionStableKey,
  type ArtifactIngestionEvent,
  type ArtifactIngestionEventType,
  type ArtifactIngestionInput,
  type ArtifactIngestionSource,
} from "./artifact-ingestion-types";

export function buildArtifactIngestionSource(args: {
  request?: ArtifactExportRequest;
  result?: ExportResultLedgerItem;
  pack?: ProductionPack;
}): ArtifactIngestionSource {
  const request = args.request;
  const result = args.result;
  const packItem = args.pack?.items.find((item) => item.id === request?.artifactId || item.id === result?.artifactId);

  return {
    artifactId: String(result?.artifactId ?? request?.artifactId ?? packItem?.id ?? "artifact-candidate"),
    title: String(request?.title ?? packItem?.title ?? result?.artifactId ?? "Artifact ingestion candidate"),
    artifactType: String(request?.type ?? packItem?.type ?? "artifact"),
    sourceSurface: String(result?.sourceSurface ?? request?.sourceSurface ?? args.pack?.sourceSurface ?? "artifact-workspace"),
    sourceRunId: String(request?.sourceRunId ?? args.pack?.sourceRunId ?? result?.sourcePackId ?? "artifact-workspace-review"),
    targetWorkspacePath: String(result?.exportedPath || result?.targetPath || request?.targetRelativePath || packItem?.targetRelativePath || ""),
    validationResult: result?.status === "exported" ? "valid-export" : request?.approved ? "needs-review" : "unknown",
    safetyPosture: String(
      result?.safetyNote ??
        packItem?.safetyNote ??
        args.pack?.safetyBoundary ??
        "artifact ingestion candidate only; review before promotion; no direct graph mutation"
    ),
    replaySummary: args.pack?.replay.summary ?? [],
    tags: buildArtifactTags(request?.type ?? packItem?.type, args.pack?.sourceSurface, result?.status),
    sourcePackId: args.pack?.id ?? result?.sourcePackId,
    exported: result?.status === "exported",
  };
}

export function buildArtifactIngestionEvent(args: {
  source: ArtifactIngestionSource;
  type: ArtifactIngestionEventType;
}): ArtifactIngestionEvent {
  const id = buildArtifactIngestionStableKey("artifact-ingestion-event", args.type, args.source.sourcePackId, args.source.artifactId);
  const event: ArtifactIngestionEvent = {
    id,
    type: args.type,
    artifactId: args.source.artifactId,
    title: args.source.title,
    sourceSurface: args.source.sourceSurface,
    sourceRunId: args.source.sourceRunId,
    targetWorkspacePath: args.source.targetWorkspacePath,
    sourcePackId: args.source.sourcePackId,
    payload: {
      artifactType: args.source.artifactType,
      validationResult: args.source.validationResult,
      safetyPosture: args.source.safetyPosture,
      replaySummary: args.source.replaySummary,
      tags: args.source.tags,
      exported: args.source.exported === true,
    },
    summary: [],
  };

  return { ...event, summary: summarizeSingleEvent(event) };
}

export function buildArtifactIngestionEvents(input: ArtifactIngestionInput): ArtifactIngestionEvent[] {
  const sources = buildSources(input);
  const events = sources.flatMap((source) => {
    const eventTypes: ArtifactIngestionEventType[] = [
      "artifact.created",
      source.exported ? "artifact.exported" : "artifact.reviewed",
      "artifact.validated",
      "replay.created",
      "memory.candidate.created",
    ];

    if (source.sourcePackId) {
      eventTypes.splice(2, 0, "production-pack.exported");
    }

    return eventTypes.map((type) => buildArtifactIngestionEvent({ source, type }));
  });

  return dedupeEvents(events);
}

export function summarizeArtifactIngestionEvents(events: ArtifactIngestionEvent[]): string[] {
  const exported = events.filter((event) => event.type === "artifact.exported").length;
  const memoryCandidates = events.filter((event) => event.type === "memory.candidate.created").length;
  const productionPacks = events.filter((event) => event.type === "production-pack.exported").length;

  return [
    `${events.length} deterministic artifact ingestion event candidate(s).`,
    `${exported} artifact.exported event candidate(s).`,
    `${productionPacks} production-pack.exported event candidate(s).`,
    `${memoryCandidates} memory.candidate.created event candidate(s).`,
    "Events are pure data for review before promotion and perform no direct graph mutation.",
  ];
}

export function buildArtifactIngestionSources(input: ArtifactIngestionInput): ArtifactIngestionSource[] {
  return buildSources(input);
}

function buildSources(input: ArtifactIngestionInput): ArtifactIngestionSource[] {
  const resultItems = input.resultItems ?? input.exportLedger?.items ?? [];
  const requests = input.exportRequests ?? input.pack?.exportRequests ?? [];
  const sources = resultItems.length > 0
    ? resultItems.map((result) => ({
        result,
        request: requests.find((request) => request.artifactId === result.artifactId),
      }))
    : requests.map((request) => ({ request }));

  return sources.map((source) => buildArtifactIngestionSource({ ...source, pack: input.pack }));
}

function buildArtifactTags(
  type: unknown,
  sourceSurface: unknown,
  status: unknown
): string[] {
  return [
    "artifact-ingestion",
    String(type ?? "artifact").replace(/[^a-z0-9._-]+/gi, "-").toLowerCase(),
    String(sourceSurface ?? "workspace").replace(/[^a-z0-9._-]+/gi, "-").toLowerCase(),
    status === "exported" ? "exported" : "review-required",
  ].filter(Boolean);
}

function dedupeEvents(events: ArtifactIngestionEvent[]): ArtifactIngestionEvent[] {
  const seen = new Set<string>();
  const deduped: ArtifactIngestionEvent[] = [];

  for (const event of events) {
    if (seen.has(event.id)) continue;
    seen.add(event.id);
    deduped.push(event);
  }

  return deduped;
}

function summarizeSingleEvent(event: ArtifactIngestionEvent): string[] {
  return [
    `${event.type} for ${event.title}.`,
    `source: ${event.sourceSurface}; target: ${event.targetWorkspacePath || "pending workspace path"}.`,
  ];
}
