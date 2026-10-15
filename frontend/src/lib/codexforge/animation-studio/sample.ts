import type { Sequence, ShotManifest, StudioProject } from "./domain";

/** Synthetic planning fixture only: no external assets, real brands, or installed-engine claims. */
export const sampleProject: StudioProject = {
  schemaVersion: 1,
  projectId: "project_orbit",
  revision: 1,
  title: "Orbit — synthetic studio sample",
  description: "An original abstract sphere circles a geometric arch. This is planning data, not generated media.",
  createdAt: "2026-09-13T12:00:00.000Z",
  currency: "GBP",
};

export const sampleSequence: Sequence = {
  schemaVersion: 1,
  sequenceId: "sequence_orbit",
  projectId: "project_orbit",
  title: "A quiet orbit",
  shotIds: [],
};

export const sampleShot: ShotManifest = {
  schemaVersion: 1,
  shotId: "shot_orbit",
  sequenceId: "sequence_orbit",
  projectId: "project_orbit",
  revision: 1,
  description: "A matte coral sphere follows a circular path around a pale geometric arch on a dark stage.",
  storyPurpose: "Establish a calm, playful world using only original abstract forms.",
  duration: 6,
  fps: 24,
  resolution: { width: 1920, height: 1080 },
  aspectRatio: { width: 16, height: 9 },
  characters: [],
  environment: null,
  props: [],
  camera: { framing: "Wide, centered composition", movement: "Locked camera", lensMm: 50 },
  lighting: "Soft overhead key and a subtle rim light.",
  action: "The sphere completes one slow orbit, returning to its starting position.",
  dialogue: [],
  audio: [],
  identityStrictness: "CONSISTENT",
  continuityRequirements: ["Keep sphere color, arch proportions, and lighting direction consistent."],
  generationMethod: "3D",
  preferredEngine: null,
  fallbackEngine: null,
  sourceReferences: [],
  inputAssets: [],
  outputAssets: [],
  dependencies: [],
  status: "DRAFT",
  approvalState: "DRAFT",
  costEstimate: { currency: "GBP", minorUnits: 0 },
  actualCost: { currency: "GBP", minorUnits: 0 },
  generationAttempts: [],
  selectedVersion: null,
  qcResults: [],
  notes: ["Synthetic planning example only. Engine availability has not been checked and no execution is authorized."],
};
