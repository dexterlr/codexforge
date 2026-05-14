import { buildArtifactBrainSignals, summarizeArtifactBrainSignals } from "./artifact-brain-signals";
import { buildArtifactIngestionEvents, buildArtifactIngestionSources, summarizeArtifactIngestionEvents } from "./artifact-ingestion-events";
import { buildArtifactIngestionLedger } from "./artifact-ingestion-ledger";
import { buildArtifactIngestionReadiness, summarizeArtifactIngestionReadiness } from "./artifact-ingestion-readiness";
import { buildArtifactMemoryCandidates, summarizeArtifactMemoryCandidates } from "./artifact-memory-candidates";
import {
  buildArtifactIngestionStableKey,
  type ArtifactIngestionBundle,
  type ArtifactIngestionInput,
} from "./artifact-ingestion-types";

export function buildArtifactIngestionSummary(input: ArtifactIngestionInput): ArtifactIngestionBundle {
  const sources = buildArtifactIngestionSources(input);
  const events = buildArtifactIngestionEvents(input);
  const memoryCandidates = buildArtifactMemoryCandidates(input);
  const brainSignals = buildArtifactBrainSignals(input);
  const readiness = sources.map((source) =>
    buildArtifactIngestionReadiness({
      source,
      memoryCandidate: memoryCandidates.find((candidate) => candidate.artifactId === source.artifactId),
      brainSignals: brainSignals.filter((signal) => signal.artifactId === source.artifactId),
    })
  );
  const ledger = buildArtifactIngestionLedger({
    sources,
    events,
    memoryCandidates,
    brainSignals,
    readiness,
  });
  const bundle: ArtifactIngestionBundle = {
    id: buildArtifactIngestionStableKey("artifact-ingestion-bundle", input.pack?.id, input.exportLedger?.id, sources.length),
    sources,
    events,
    memoryCandidates,
    brainSignals,
    readiness,
    ledger,
    summary: [],
  };

  return { ...bundle, summary: summarizeArtifactIngestionBundle(bundle) };
}

export function summarizeArtifactIngestionBundle(bundle: ArtifactIngestionBundle): string[] {
  return [
    ...summarizeArtifactIngestionEvents(bundle.events),
    ...summarizeArtifactMemoryCandidates(bundle.memoryCandidates),
    ...summarizeArtifactBrainSignals(bundle.brainSignals),
    ...summarizeArtifactIngestionReadiness(bundle.readiness),
    "Artifact ingestion is local-first, deterministic, read-only, and ready for future guarded persistence.",
  ];
}
