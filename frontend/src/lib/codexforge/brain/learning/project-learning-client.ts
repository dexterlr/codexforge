import type { ProjectMemoryEntry } from "./project-learning";
import type { ProjectMemoryFeed } from "./development-chat.server";

function isMemoryEntry(value: unknown): value is ProjectMemoryEntry {
  if (typeof value !== "object" || value === null) return false;
  const entry = value as Partial<ProjectMemoryEntry>;
  return typeof entry.id === "string" && typeof entry.text === "string" &&
    typeof entry.at === "string" && Number.isFinite(Date.parse(entry.at)) &&
    typeof entry.sourceId === "string" && typeof entry.sourceLabel === "string" &&
    (entry.sourceType === "jarvis" || entry.sourceType === "creator" || entry.sourceType === "project-note" || entry.sourceType === "codex-chat") &&
    (entry.kind === "decision" || entry.kind === "worked" || entry.kind === "did-not-work") &&
    (entry.relatedDecisionId === null || typeof entry.relatedDecisionId === "string");
}

export async function fetchProjectMemoryFeed(signal: AbortSignal, chatOnly = false): Promise<ProjectMemoryFeed> {
  const url = "/api/codexforge/brain/learning" + (chatOnly ? "?source=codex-chat" : "");
  const response = await fetch(url, {
    cache: "no-store",
    credentials: "same-origin",
    headers: { Accept: "application/json" },
    signal,
  });
  if (!response.ok) throw new Error("The local Brain could not read workspace history.");
  const body = await response.json();
  const status = body?.developmentChatStatus ?? "unconfigured";
  if (body?.ok !== true || !Array.isArray(body.result) || !body.result.every(isMemoryEntry) ||
      (chatOnly && body.result.some((entry: ProjectMemoryEntry) => entry.sourceType !== "codex-chat")) ||
      (status !== "connected" && status !== "unavailable" && status !== "unconfigured")) {
    throw new Error("The local Brain returned an unreadable memory record.");
  }
  return { result: body.result, developmentChatStatus: status };
}
