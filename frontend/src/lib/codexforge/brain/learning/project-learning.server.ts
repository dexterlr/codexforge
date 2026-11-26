import "server-only";

import { projectCreatorCatalogue } from "@/lib/codexforge/creator/creator-persistence.server";
import { getCreatorRuntimePersistence } from "@/lib/codexforge/creator/creator-runtime.server";
import type { CreatorAuditEvent, CreatorProjectState } from "@/lib/codexforge/creator/creator-types";
import {
  createJarvisChatPersistence,
  createJarvisChatPersistenceForTesting,
} from "@/lib/codexforge/jarvis-chat/jarvis-chat-persistence.server";
import { resolveJarvisCreatorRuntimeIdentity } from "@/lib/codexforge/jarvis-chat/jarvis-creator-runtime-identity.server";
import { extractConversationMemory, type ProjectMemoryEntry } from "./project-learning";
import { readProjectNoteMemory } from "./project-note-memory.server";
import { readDevelopmentChatMemory, type ProjectMemoryFeed } from "./development-chat.server";

function creatorEvidence(
  project: CreatorProjectState,
  event: CreatorAuditEvent
): Pick<ProjectMemoryEntry, "kind" | "text"> | null {
  const binding = project.runBindings.find((run) => run.sourceRunId === event.sourceRunId);
  const purpose = binding?.purpose;
  const operation = purpose ?? "website creation";
  const responseContract = binding?.responseContractVersion === "server-owned-page-v1"
    ? "the server-owned page contract"
    : "the artifact bundle contract";
  switch (event.eventType) {
    case "approval.recorded":
      return { kind: "decision", text: `The operator approved the ${operation} run.` };
    case "topology.repair_requested":
      return { kind: "decision", text: "The operator authorized rebuilding the document structure locally." };
    case "revision.materialized": {
      const repaired = project.auditEvents.some((other) =>
        other.stateRevision === event.stateRevision && other.eventType === "topology.repair_completed"
      );
      const runLabel = binding ? `The ${operation} run using ${responseContract}` : "The website creation run";
      const approach = repaired ? "Rebuilding the document structure locally" : runLabel;
      return {
        kind: "worked",
        text: `${approach} produced artifact revision ${event.artifactRevision} that passed Creator validation and was saved locally.`,
      };
    }
    case "output.rejected":
      return {
        kind: "did-not-work",
        text: event.summary === "The returned output was rejected before materialization." && binding
          ? `The ${operation} output did not match ${responseContract} and could not be published.`
          : `Blocking Creator checks prevented publishing the ${operation} output.`,
      };
    case "repair.result_rejected":
      return { kind: "did-not-work", text: "The repair attempt did not produce a publishable replacement." };
    case "topology.repair_rejected":
      return { kind: "did-not-work", text: "Rebuilding the document structure locally did not produce an accepted repair." };
    case "failure.recorded": {
      // A rejected repair and its terminal failure describe a single outcome.
      const rejectionAlreadyRecorded = project.auditEvents.some((other) =>
        other.stateRevision === event.stateRevision &&
        ["output.rejected", "repair.result_rejected", "topology.repair_rejected"].includes(other.eventType)
      );
      if (rejectionAlreadyRecorded) return null;
      return {
        kind: "did-not-work",
        text: purpose ? `Creator recorded a failure during ${purpose}.` : "Creator recorded a project operation failure.",
      };
    }
    default:
      return null;
  }
}

function extractCreatorMemory(project: CreatorProjectState): ProjectMemoryEntry[] {
  const entries: ProjectMemoryEntry[] = [];
  const decisionsByRun = new Map<string, string>();
  for (const event of project.auditEvents) {
    const evidence = creatorEvidence(project, event);
    if (!evidence) continue;
    const id = `creator:${project.identity.projectId}:${event.eventId}`;
    const runId = event.sourceRunId;
    entries.push({
      ...evidence,
      id,
      at: event.occurredAt,
      sourceType: "creator",
      sourceId: project.identity.projectId,
      sourceLabel: project.identity.projectTitle,
      relatedDecisionId: evidence.kind !== "decision" && runId ? decisionsByRun.get(runId) ?? null : null,
    });
    if (evidence.kind === "decision" && runId) decisionsByRun.set(runId, id);
  }
  return entries;
}

export async function readProjectMemoryFeed(): Promise<ProjectMemoryFeed> {
  const { testSuffix } = resolveJarvisCreatorRuntimeIdentity();
  const chat = testSuffix ? createJarvisChatPersistenceForTesting(testSuffix) : createJarvisChatPersistence();
  const creator = getCreatorRuntimePersistence();
  const [fromChat, fromCreator, fromNotes, development] = await Promise.all([
    chat.projectLiveConversations(extractConversationMemory),
    projectCreatorCatalogue(creator, extractCreatorMemory),
    testSuffix ? [] : readProjectNoteMemory(),
    readDevelopmentChatMemory(),
  ]);
  const result = [...fromChat, ...fromCreator, ...fromNotes, ...development.result]
    .sort((a, b) => b.at.localeCompare(a.at) || a.id.localeCompare(b.id));
  return { result, developmentChatStatus: development.developmentChatStatus };
}

export async function readProjectMemory(): Promise<ProjectMemoryEntry[]> {
  return (await readProjectMemoryFeed()).result;
}
