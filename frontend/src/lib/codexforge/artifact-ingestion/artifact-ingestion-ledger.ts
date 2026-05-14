import type {
  ArtifactBrainSignal,
  ArtifactIngestionLedger,
  ArtifactIngestionLedgerItem,
  ArtifactIngestionLedgerState,
  ArtifactIngestionReadiness,
  ArtifactIngestionSource,
  ArtifactMemoryCandidate,
  ArtifactIngestionEvent,
} from "./artifact-ingestion-types";
import { buildArtifactIngestionStableKey } from "./artifact-ingestion-types";

export function buildArtifactIngestionLedgerItem(args: {
  source: ArtifactIngestionSource;
  events: ArtifactIngestionEvent[];
  memoryCandidates: ArtifactMemoryCandidate[];
  brainSignals: ArtifactBrainSignal[];
  readiness?: ArtifactIngestionReadiness;
}): ArtifactIngestionLedgerItem {
  const readinessScore = args.readiness?.score ?? 0;
  const state = selectLedgerState(args.source, readinessScore);

  return {
    id: buildArtifactIngestionStableKey("artifact-ingestion-ledger", args.source.sourcePackId, args.source.artifactId),
    artifactId: args.source.artifactId,
    title: args.source.title,
    state,
    targetWorkspacePath: args.source.targetWorkspacePath,
    eventCount: args.events.length,
    memoryCandidateCount: args.memoryCandidates.length,
    brainSignalCount: args.brainSignals.length,
    readinessScore,
    note: buildLedgerNote(state),
  };
}

export function buildArtifactIngestionLedger(args: {
  sources: ArtifactIngestionSource[];
  events: ArtifactIngestionEvent[];
  memoryCandidates: ArtifactMemoryCandidate[];
  brainSignals: ArtifactBrainSignal[];
  readiness: ArtifactIngestionReadiness[];
}): ArtifactIngestionLedger {
  const items = args.sources.map((source) =>
    buildArtifactIngestionLedgerItem({
      source,
      events: args.events.filter((event) => event.artifactId === source.artifactId),
      memoryCandidates: args.memoryCandidates.filter((candidate) => candidate.artifactId === source.artifactId),
      brainSignals: args.brainSignals.filter((signal) => signal.artifactId === source.artifactId),
      readiness: args.readiness.find((item) => item.artifactId === source.artifactId),
    })
  );
  const ledger: ArtifactIngestionLedger = {
    id: "artifact-ingestion-ledger-phase-15",
    items,
    summary: [],
  };

  return { ...ledger, summary: summarizeArtifactIngestionLedger(ledger) };
}

export function summarizeArtifactIngestionLedger(ledger: ArtifactIngestionLedger): string[] {
  const ready = ledger.items.filter((item) => item.state === "ready-for-review").length;
  const blocked = ledger.items.filter((item) => item.state === "blocked").length;
  const runtimeReady = ledger.items.filter((item) => item.state === "ready-for-runtime-event").length;

  return [
    `${ledger.items.length} artifact ingestion ledger item(s).`,
    `${ready} ready for review; ${runtimeReady} ready for future runtime event; ${blocked} blocked.`,
    "Ledger is read-only and records candidates without persistence writes.",
  ];
}

function selectLedgerState(
  source: ArtifactIngestionSource,
  readinessScore: number
): ArtifactIngestionLedgerState {
  if (source.validationResult === "blocked") return "blocked";
  if (source.exported && readinessScore >= 82) return "ready-for-runtime-event";
  if (readinessScore >= 64) return "ready-for-review";
  return "candidate";
}

function buildLedgerNote(state: ArtifactIngestionLedgerState): string {
  const notes: Record<ArtifactIngestionLedgerState, string> = {
    candidate: "Candidate captured for operator review.",
    "ready-for-review": "Review before promotion.",
    "ready-for-runtime-event": "Future guarded runtime event can be considered after review.",
    blocked: "Blocked until validation or safety posture changes.",
    "future-persisted": "Reserved for future persistence acknowledgement.",
  };

  return notes[state];
}
