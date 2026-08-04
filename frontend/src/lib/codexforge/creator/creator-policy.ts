import type { CreatorFilePolicy, CreatorModelEnvelope } from "./creator-types";

export const CREATOR_MAX_DESCRIPTION_LENGTH = 2_000;
export const CREATOR_MAX_PROJECT_TITLE_LENGTH = 80;
export const CREATOR_MAX_PROJECT_SLUG_LENGTH = 48;
export const CREATOR_MAX_MUTATION_BODY_BYTES = 16_384;
export const CREATOR_MAX_PROVIDER_OUTPUT_CHARACTERS = 65_536;
export const CREATOR_MAX_EXPLANATION_LENGTH = 512;
export const CREATOR_MAX_VALIDATION_ISSUES = 64;
export const CREATOR_MAX_AUDIT_EVENTS = 128;
export const CREATOR_MAX_IDEMPOTENCY_RECORDS = 128;
export const CREATOR_MAX_PROJECT_RECORDS = 256;
export const CREATOR_MAX_AUDIT_SUMMARY_LENGTH = 240;
export const CREATOR_PROJECT_ID_PATTERN = /^[a-f0-9]{24}$/;
export const CREATOR_PREVIEW_ID_PATTERN = /^[a-f0-9]{32}$/;
export const CREATOR_IDEMPOTENCY_KEY_PATTERN = /^[A-Za-z0-9._:-]{16,160}$/;

export const CREATOR_ALLOWED_MEDIA_TYPES = Object.freeze({
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".md": "text/markdown",
  ".txt": "text/plain",
}) satisfies Readonly<Record<string, string>>;

export const CREATOR_FILE_POLICY = Object.freeze({
  maximumFileCount: 12,
  maximumIndividualFileBytes: 24_576,
  maximumAggregateBytes: 49_152,
  maximumRelativePathLength: 120,
  maximumPathSegmentLength: 48,
  maximumDirectoryDepth: 3,
  allowedSegmentPattern: "^[A-Za-z0-9][A-Za-z0-9._-]*$",
  entrypoint: "index.html",
  allowedMediaTypes: CREATOR_ALLOWED_MEDIA_TYPES,
  duplicatePolicy: "reject-normalized-and-case-insensitive-collisions",
}) satisfies CreatorFilePolicy;

export const CREATOR_MODEL_ENVELOPE = Object.freeze({
  providerKey: "ollama-local",
  modelKey: "ollama-local::gpt-oss:20b",
  runtimeModel: "gpt-oss:20b",
  dataBoundary: "local-machine",
  maximumOutputTokens: 4096,
  fallback: "disabled",
  retry: "disabled",
  substitution: "disabled",
  paidExecution: "disabled",
}) satisfies CreatorModelEnvelope;

export const CREATOR_PRODUCTION_DATA_ROOT_LABEL = ".codexforge/creator";
export const CREATOR_TEST_DATA_ROOT_PREFIX = ".codexforge/creator-tests";
export const CREATOR_DESTINATION_BOUNDARY_LABEL =
  ".codexforge/creator/projects/<project-id>/revisions/<revision>/files";

export function buildCreatorDestinationBoundary(projectId: string, artifactRevision: number): string {
  if (!CREATOR_PROJECT_ID_PATTERN.test(projectId) || !Number.isSafeInteger(artifactRevision) || artifactRevision < 1 || artifactRevision > 2) {
    throw new Error("Creator destination identity is invalid.");
  }
  return CREATOR_DESTINATION_BOUNDARY_LABEL
    .replace("<project-id>", projectId)
    .replace("<revision>", String(artifactRevision).padStart(6, "0"));
}

export const CREATOR_CAPABILITY_STATEMENT =
  "Builds one bounded static Website/Browser App v0 using HTML, CSS, client-side JavaScript, JSON, safe SVG, Markdown, and text.";
export const CREATOR_LIMITATION_STATEMENT =
  "Does not build backends, databases, deployments, package-installed frameworks, native applications, games, video, email, voice, or screen-control workflows.";
export const CREATOR_ORDERED_PLAN_STEPS = Object.freeze([
  "Bind one exact local Private Alpha run awaiting approval.",
  "Record a separate manual approval for the exact scope.",
  "Require a separate explicit one-attempt execution.",
  "Parse and validate one complete static artifact contract.",
  "Atomically publish one creator-owned artifact revision.",
] as const);

export function sanitizeCreatorTestSuffix(value: string): string {
  const normalized = value.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  const bounded = normalized.replace(/^-+|-+$/g, "").slice(0, 48);
  if (!bounded) {
    throw new Error("Creator deterministic test suffix is invalid.");
  }
  return bounded;
}

export function buildCreatorTestDataRootLabel(suffix: string): string {
  return `${CREATOR_TEST_DATA_ROOT_PREFIX}/${sanitizeCreatorTestSuffix(suffix)}`;
}
