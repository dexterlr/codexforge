import type {
  CreatorCreateProjectInput,
  CreatorCreateProjectResult,
  CreatorMutationKind,
  CreatorProjectActionResult,
  CreatorProjectState,
} from "./creator-types";

const CREATOR_API_BASE = "/api/codexforge/creator";

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export function buildCreatorClientIdempotencyKey(): string {
  const id = globalThis.crypto?.randomUUID?.();
  if (!id) throw new Error("Browser random UUID support is required.");
  return `creator-ui-${id}`;
}

function assertProjectId(projectId: string): string {
  if (!/^[a-f0-9]{24}$/.test(projectId)) throw new Error("Creator project ID is invalid.");
  return projectId;
}

async function readPayload(response: Response): Promise<unknown> {
  const source = await response.text();
  if (!source.trim()) return null;
  try {
    return JSON.parse(source) as unknown;
  } catch {
    return null;
  }
}

async function requestCreator<T>(
  target: string,
  init: RequestInit,
  read: (payload: unknown) => T
): Promise<T> {
  if (!target.startsWith(CREATOR_API_BASE) || target.includes("\\") || /(^|\/)\.\.(?:\/|$)/.test(target)) {
    throw new Error("Creator API target is not allowlisted.");
  }
  const response = await fetch(target, { ...init, cache: "no-store" });
  const payload = await readPayload(response);
  if (!response.ok) {
    const record = asRecord(payload);
    const error = record ? asRecord(record.error) : null;
    throw new Error(
      error && typeof error.message === "string"
        ? error.message
        : `Creator request failed with status ${response.status}.`
    );
  }
  return read(payload);
}

function readProject(payload: unknown): CreatorProjectState {
  const record = asRecord(payload);
  const project = record ? asRecord(record.project) : null;
  if (!record || record.ok !== true || !project) throw new Error("Creator response was malformed.");
  return project as CreatorProjectState;
}

export function createCreatorProject(
  input: CreatorCreateProjectInput,
  idempotencyKey = buildCreatorClientIdempotencyKey()
): Promise<CreatorCreateProjectResult> {
  return requestCreator(
    `${CREATOR_API_BASE}/projects`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(input),
    },
    (payload) => {
      const record = asRecord(payload);
      if (!record || typeof record.created !== "boolean") throw new Error("Creator response was malformed.");
      return { created: record.created, project: readProject(payload) };
    }
  );
}

export function fetchCreatorProject(projectId: string): Promise<CreatorProjectState> {
  return requestCreator(
    `${CREATOR_API_BASE}/projects/${assertProjectId(projectId)}`,
    {},
    readProject
  );
}

export function actOnCreatorProject(
  projectId: string,
  action: CreatorMutationKind,
  expectedRevision: number,
  idempotencyKey = buildCreatorClientIdempotencyKey()
): Promise<CreatorProjectActionResult> {
  return requestCreator(
    `${CREATOR_API_BASE}/projects/${assertProjectId(projectId)}/actions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
        "If-Match": `"${expectedRevision}"`,
      },
      body: JSON.stringify({ action, expectedRevision }),
    },
    (payload) => {
      const record = asRecord(payload);
      if (!record || typeof record.replayed !== "boolean") throw new Error("Creator response was malformed.");
      return { replayed: record.replayed, project: readProject(payload) };
    }
  );
}
