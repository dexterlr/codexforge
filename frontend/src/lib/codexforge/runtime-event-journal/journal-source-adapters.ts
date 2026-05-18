import { buildRuntimeEventJournalEntry } from "./journal-entry-model";
import type {
  RuntimeEventJournalActivityFeedSource,
  RuntimeEventJournalBrainRuntimeSource,
  RuntimeEventJournalEntry,
  RuntimeEventJournalMemoryPromotionGateSource,
  RuntimeEventJournalOperatorMemoryInboxSource,
  RuntimeEventJournalRuntimeExecutorSource,
  RuntimeEventJournalSourceSummary,
} from "./runtime-event-journal-types";

function sourceRoutes(routes?: readonly string[]): string[] {
  return routes && routes.length > 0 ? [...routes] : ["/runtime-journal"];
}

function joinSummary(summary?: readonly string[] | null, fallback = "Review lifecycle state."): string {
  return summary && summary.length > 0 ? summary.join(" ") : fallback;
}

export function buildJournalEntriesFromRuntimeExecutor(
  input: RuntimeEventJournalRuntimeExecutorSource = {}
): RuntimeEventJournalEntry[] {
  const request = input.request;
  const requestId = request?.id ?? input.result?.requestId ?? input.summary?.id ?? "runtime-event-executor:pending-review";
  const eventType = request?.requestedEventType ?? input.validation?.eventType ?? input.result?.eventType ?? "memory.promoted";
  const routes = sourceRoutes(request?.relatedRoutes ?? ["/memory-inbox", "/runtime-journal"]);
  const files = request?.relatedFiles ?? [];
  const evidence = request?.evidenceRefs ?? input.result?.reviewRefs ?? [];
  const auditRefs = input.auditLedger?.items.map((item) => item.id) ?? [];
  const entries: RuntimeEventJournalEntry[] = [
    buildRuntimeEventJournalEntry({
      type: "request.created",
      title: request ? "Runtime executor request created" : "Runtime executor request waiting for review",
      detail: request ? joinSummary(request.summary, `${eventType} request ${requestId} created.`) : "Runtime Event Executor source is visible; create and review a request elsewhere before execution.",
      source: "runtime-event-executor",
      sourceId: request?.sourceGateId ?? "runtime-event-executor",
      runtimeEventType: eventType,
      requestId,
      relatedRoutes: routes,
      relatedFiles: files,
      evidenceRefs: evidence,
      auditRefs,
      reviewRequired: true,
      severity: request ? "info" : "warning",
    }),
  ];

  if (input.policy) {
    entries.push(
      buildRuntimeEventJournalEntry({
        type: "policy.checked",
        title: input.policy.allowed ? "Runtime executor policy allowed" : "Runtime executor policy blocked",
        detail: input.policy.allowed ? joinSummary(input.policy.summary, "Policy allows the request after explicit checks.") : `Policy blocked: ${input.policy.blockedReasons.join(", ") || "review required"}.`,
        source: "runtime-event-executor",
        sourceId: input.policy.id,
        runtimeEventType: eventType,
        requestId: input.policy.requestId,
        relatedRoutes: routes,
        relatedFiles: files,
        evidenceRefs: evidence,
        auditRefs,
        resultStatus: input.policy.allowed ? "request-ready" : "policy-blocked",
        reviewRequired: !input.policy.allowed,
        severity: input.policy.allowed ? "success" : "risk",
      })
    );
  }

  if (input.validation) {
    entries.push(
      buildRuntimeEventJournalEntry({
        type: "validation.checked",
        title: input.validation.valid ? "Runtime payload validation passed" : "Runtime payload validation failed",
        detail: input.validation.valid ? joinSummary(input.validation.summary, "Payload validation passed.") : `Validation blocked: ${input.validation.blockedReasons.join(", ") || "review required"}.`,
        source: "runtime-event-executor",
        sourceId: input.validation.id,
        runtimeEventType: input.validation.eventType,
        requestId,
        relatedRoutes: routes,
        relatedFiles: files,
        evidenceRefs: evidence,
        auditRefs,
        resultStatus: input.validation.valid ? "request-ready" : "validation-failed",
        reviewRequired: !input.validation.valid,
        severity: input.validation.valid ? "success" : "risk",
      })
    );
  }

  if (input.approval) {
    entries.push(
      buildRuntimeEventJournalEntry({
        type: "approval.reviewed",
        title: input.approval.approved ? "Runtime event approval captured" : "Runtime event approval still required",
        detail: joinSummary(input.approval.summary, input.approval.approved ? "Explicit approval is visible." : "Explicit approval is not yet visible."),
        source: "runtime-event-executor",
        sourceId: input.approval.id,
        runtimeEventType: eventType,
        requestId: input.approval.requestId,
        approvalId: input.approval.id,
        relatedRoutes: routes,
        relatedFiles: files,
        evidenceRefs: evidence,
        auditRefs,
        resultStatus: input.approval.approved ? "request-ready" : "approval-required",
        reviewRequired: !input.approval.approved,
        severity: input.approval.approved ? "success" : "warning",
      })
    );
  }

  if (input.reducerPreview) {
    entries.push(
      buildRuntimeEventJournalEntry({
        type: "reducerPreview.built",
        title: input.reducerPreview.ready ? "Reducer preview built" : "Reducer preview blocked",
        detail: joinSummary(input.reducerPreview.summary, `Expected node delta ${input.reducerPreview.expectedNodeChanges}; edge delta ${input.reducerPreview.expectedEdgeChanges}.`),
        source: "runtime-event-executor",
        sourceId: input.reducerPreview.id,
        runtimeEventType: eventType,
        requestId: input.reducerPreview.requestId,
        relatedRoutes: routes,
        relatedFiles: files,
        evidenceRefs: evidence,
        reducerTraceRefs: [input.reducerPreview.id],
        auditRefs,
        resultStatus: input.reducerPreview.ready ? "request-ready" : "blocked",
        reviewRequired: !input.reducerPreview.ready,
        severity: input.reducerPreview.ready ? "info" : "warning",
      })
    );
  }

  if (input.result) {
    const status = input.result.status;
    const blocked = !input.result.ok || ["approval-required", "policy-blocked", "validation-failed", "blocked", "failed"].includes(status);
    entries.push(
      buildRuntimeEventJournalEntry({
        type: status === "dry-run-complete" ? "dryRun.completed" : blocked ? "execution.blocked" : status === "executed" ? "event.appended" : "execution.ready",
        title: blocked ? "Runtime executor result blocked" : status === "executed" ? "Runtime event appended through executor" : "Runtime executor dry-run result captured",
        detail: blocked ? `Result blocked: ${input.result.errors.join(", ") || input.result.nextSafeAction}.` : joinSummary(input.result.summary, input.result.nextSafeAction),
        source: "runtime-event-executor",
        sourceId: input.result.id,
        runtimeEventType: input.result.eventType,
        runtimeEventId: input.result.eventId,
        requestId: input.result.requestId,
        relatedRoutes: routes,
        relatedFiles: files,
        evidenceRefs: input.result.reviewRefs.length > 0 ? input.result.reviewRefs : evidence,
        reducerTraceRefs: input.reducerPreview ? [input.reducerPreview.id] : [],
        auditRefs,
        resultStatus: status,
        reviewRequired: status !== "executed",
        severity: blocked ? "blocker" : status === "executed" ? "success" : "info",
      }),
      buildRuntimeEventJournalEntry({
        type: "result.captured",
        title: "Runtime executor result captured",
        detail: joinSummary(input.result.summary, `Result status: ${status}.`),
        source: "runtime-event-executor",
        sourceId: `${input.result.id}:captured`,
        runtimeEventType: input.result.eventType,
        runtimeEventId: input.result.eventId,
        requestId: input.result.requestId,
        relatedRoutes: routes,
        relatedFiles: files,
        evidenceRefs: input.result.reviewRefs.length > 0 ? input.result.reviewRefs : evidence,
        reducerTraceRefs: input.reducerPreview ? [input.reducerPreview.id] : [],
        auditRefs,
        resultStatus: status,
        reviewRequired: blocked,
        severity: blocked ? "warning" : "info",
      })
    );
  }

  return entries;
}

export function buildJournalEntriesFromMemoryPromotionGate(
  input: RuntimeEventJournalMemoryPromotionGateSource = {}
): RuntimeEventJournalEntry[] {
  const gateId = input.gateInput?.id ?? input.summary?.promotionGateId ?? "memory-promotion-gate:pending-review";
  const requestId = input.requestPacket?.id ?? gateId;
  const routes = sourceRoutes(input.gateInput?.relatedRoutes ?? ["/memory-inbox", "/runtime-journal"]);
  const files = input.gateInput?.relatedFiles ?? [];
  const evidence = input.eventPreview?.evidenceRefs ?? input.gateInput?.sourceIds ?? input.gateInput?.evidenceSnippets ?? [];
  const auditRefs = input.auditLedger?.items.map((item) => item.id) ?? [];
  const entries: RuntimeEventJournalEntry[] = [
    buildRuntimeEventJournalEntry({
      type: "memoryPromotion.previewed",
      title: input.eventPreview ? "Memory promotion event preview built" : "Memory promotion journal handoff waiting",
      detail: input.eventPreview ? joinSummary(input.eventPreview.summary, input.eventPreview.futureReducerBoundary) : "Memory Promotion Gate can hand off preview state to the journal without auto-promotion.",
      source: "memory-promotion-gate",
      sourceId: input.eventPreview?.id ?? gateId,
      runtimeEventType: "memory.promoted",
      runtimeEventId: input.eventPreview?.eventId,
      requestId,
      relatedRoutes: routes,
      relatedFiles: files,
      evidenceRefs: evidence,
      auditRefs,
      resultStatus: "preview-only",
      reviewRequired: true,
      severity: input.eventPreview?.blockedReasons.length ? "risk" : "info",
    }),
  ];

  if (input.approvalPacket) {
    entries.push(
      buildRuntimeEventJournalEntry({
        type: input.approvalPacket.approved ? "memoryPromotion.approved" : "memoryPromotion.blocked",
        title: input.approvalPacket.approved ? "Memory promotion approval packet approved" : "Memory promotion approval packet blocked",
        detail: input.approvalPacket.approved ? joinSummary(input.approvalPacket.summary, "Approval is visible for handoff.") : `Approval blockers: ${input.approvalPacket.readinessBlockedReasons.join(", ") || "explicit approval required"}.`,
        source: "memory-promotion-gate",
        sourceId: input.approvalPacket.id,
        runtimeEventType: "memory.promoted",
        requestId,
        approvalId: input.approvalPacket.id,
        relatedRoutes: routes,
        relatedFiles: files,
        evidenceRefs: evidence,
        auditRefs,
        resultStatus: input.approvalPacket.approved ? "request-ready" : "approval-required",
        reviewRequired: !input.approvalPacket.approved,
        severity: input.approvalPacket.approved ? "success" : "warning",
      })
    );
  }

  if (input.policy) {
    entries.push(
      buildRuntimeEventJournalEntry({
        type: "policy.checked",
        title: input.policy.allowed ? "Memory promotion policy allowed" : "Memory promotion policy blocked",
        detail: input.policy.allowed ? joinSummary(input.policy.summary, "Policy confirmation is visible.") : `Policy blocked: ${input.policy.blockedReasons.join(", ") || "review required"}.`,
        source: "memory-promotion-gate",
        sourceId: input.policy.id,
        runtimeEventType: input.policy.eventType,
        requestId,
        relatedRoutes: routes,
        relatedFiles: files,
        evidenceRefs: evidence,
        auditRefs,
        resultStatus: input.policy.allowed ? "request-ready" : "policy-blocked",
        reviewRequired: !input.policy.allowed,
        severity: input.policy.allowed ? "success" : "risk",
      })
    );
  }

  if (input.requestPacket) {
    entries.push(
      buildRuntimeEventJournalEntry({
        type: input.requestPacket.state === "request-ready" ? "execution.ready" : "execution.blocked",
        title: input.requestPacket.state === "request-ready" ? "Memory promotion request ready for guarded handoff" : "Memory promotion request blocked",
        detail: input.requestPacket.state === "request-ready" ? joinSummary(input.requestPacket.summary, "Request packet is ready for guarded review.") : `Request blocked: ${input.requestPacket.blockedReasons.join(", ") || "execution remains blocked"}.`,
        source: "memory-promotion-gate",
        sourceId: input.requestPacket.id,
        runtimeEventType: "memory.promoted",
        requestId: input.requestPacket.id,
        relatedRoutes: routes,
        relatedFiles: files,
        evidenceRefs: evidence,
        auditRefs,
        resultStatus: input.requestPacket.state,
        reviewRequired: true,
        severity: input.requestPacket.state === "request-ready" ? "success" : "blocker",
      })
    );
  }

  return entries;
}

export function buildJournalEntriesFromOperatorMemoryInbox(
  input: RuntimeEventJournalOperatorMemoryInboxSource = {}
): RuntimeEventJournalEntry[] {
  const cards = [...(input.cards ?? [])];
  if (cards.length === 0) {
    return [
      buildRuntimeEventJournalEntry({
        type: "request.created",
        title: "Operator memory inbox ready for journal handoff",
        detail: "Reviewed inbox cards can become runtime event request context, but the journal does not promote memory.",
        source: "operator-memory-inbox",
        sourceId: input.summary?.id ?? "operator-memory-inbox:pending-review",
        runtimeEventType: "memory.promoted",
        requestId: input.summary?.id ?? "operator-memory-inbox:pending-review",
        relatedRoutes: ["/memory-inbox", "/runtime-journal"],
        resultStatus: "preview-only",
        reviewRequired: true,
        severity: "info",
      }),
    ];
  }

  return cards.map((card) =>
    buildRuntimeEventJournalEntry({
      type: card.promotionReadiness === "ready-after-review" || card.reviewState === "promotion-ready" ? "memoryPromotion.previewed" : "request.created",
      title: `Inbox card journal handoff: ${card.title}`,
      detail: joinSummary(card.summary, card.proposedMemoryText),
      source: "operator-memory-inbox",
      sourceId: card.id,
      runtimeEventType: "memory.promoted",
      requestId: card.id,
      relatedRoutes: sourceRoutes([...card.relatedRoutes, "/runtime-journal"]),
      relatedFiles: card.relatedFiles,
      evidenceRefs: card.sourceIds.length > 0 ? card.sourceIds : card.evidenceSnippets,
      resultStatus: "preview-only",
      reviewRequired: card.reviewState !== "promotion-ready",
      severity: card.reviewState === "blocked" ? "risk" : card.reviewState === "promotion-ready" ? "info" : "warning",
    })
  );
}

export function buildJournalEntriesFromActivityFeed(
  input: RuntimeEventJournalActivityFeedSource = {}
): RuntimeEventJournalEntry[] {
  const events = [...(input.events ?? [])];
  if (events.length === 0) {
    return [
      buildRuntimeEventJournalEntry({
        type: "request.created",
        title: "Activity feed runtime journal source visible",
        detail: "Global Activity Feed can link runtime lifecycle visibility without persisting journal entries.",
        source: "global-activity-feed",
        sourceId: input.summary?.id ?? "global-activity-feed:runtime-journal",
        runtimeEventType: "unknown",
        requestId: input.summary?.id ?? "global-activity-feed:runtime-journal",
        relatedRoutes: ["/activity", "/runtime-journal"],
        resultStatus: "preview-only",
        reviewRequired: false,
        severity: "info",
      }),
    ];
  }

  return events.map((event) => {
    const memoryCandidate = event.type === "memory.candidateCreated";
    const blocked = event.status === "blocked" || event.severity === "blocker";
    return buildRuntimeEventJournalEntry({
      type: memoryCandidate ? "memoryPromotion.previewed" : blocked ? "execution.blocked" : "request.created",
      title: `Activity journal source: ${event.title}`,
      detail: event.detail,
      source: "global-activity-feed",
      sourceId: event.id,
      runtimeEventType: memoryCandidate ? "memory.promoted" : "unknown",
      requestId: event.relatedIds[0] ?? event.id,
      relatedRoutes: sourceRoutes([...event.relatedRoutes, "/runtime-journal"]),
      relatedFiles: event.relatedFiles,
      evidenceRefs: event.relatedIds,
      resultStatus: blocked ? "blocked" : "preview-only",
      reviewRequired: event.reviewRequired,
      severity: blocked ? "blocker" : event.severity === "warning" ? "warning" : "info",
      timestampLabel: event.timestampLabel,
      sortKey: event.sortKey,
    });
  });
}

export function buildJournalEntriesFromBrainRuntime(
  input: RuntimeEventJournalBrainRuntimeSource = {}
): RuntimeEventJournalEntry[] {
  const events = [...(input.events ?? input.store?.events ?? [])];
  if (events.length === 0) {
    return [
      buildRuntimeEventJournalEntry({
        type: "reducerPreview.built",
        title: "Brain runtime reducer preview boundary visible",
        detail: "Journal references the Brain runtime reducer as a read-only preview surface and does not append events.",
        source: "brain-runtime",
        sourceId: input.sourceId ?? "brain-runtime:event-store",
        runtimeEventType: "unknown",
        requestId: "brain-runtime:event-store",
        relatedRoutes: sourceRoutes(input.relatedRoutes ?? ["/brain", "/runtime-journal"]),
        reducerTraceRefs: ["brain-runtime:canonical-graph-schema"],
        resultStatus: "preview-only",
        reviewRequired: false,
        severity: "info",
      }),
    ];
  }

  return events.map((event) =>
    buildRuntimeEventJournalEntry({
      type: "event.appended",
      title: `Runtime event visible: ${event.type}`,
      detail: "Existing runtime event is visible as append-only audit context; this journal does not append another event.",
      source: "brain-runtime",
      sourceId: input.sourceId ?? "brain-runtime:event-store",
      runtimeEventType: event.type,
      runtimeEventId: event.id,
      requestId: typeof event.metadata?.requestId === "string" ? event.metadata.requestId : event.correlationId,
      relatedRoutes: sourceRoutes(input.relatedRoutes ?? ["/brain", "/runtime-journal"]),
      evidenceRefs: event.source ? [`${event.source.type}:${event.source.id}`] : [],
      reducerTraceRefs: [event.id],
      auditRefs: [event.id],
      resultStatus: "executed",
      reviewRequired: false,
      severity: "success",
      timestampLabel: String(event.ts),
      sortKey: String(event.ts).padStart(16, "0"),
    })
  );
}

export function summarizeRuntimeJournalSources(entries: readonly RuntimeEventJournalEntry[]): RuntimeEventJournalSourceSummary[] {
  const sources = Array.from(new Set(entries.map((entry) => String(entry.source)))).sort();
  return sources.map((source) => {
    const sourceEntries = entries.filter((entry) => entry.source === source);
    return {
      source,
      entryCount: sourceEntries.length,
      blockedCount: sourceEntries.filter((entry) => entry.type === "execution.blocked" || entry.severity === "blocker").length,
      reviewRequiredCount: sourceEntries.filter((entry) => entry.reviewRequired).length,
      topEntryTitle: sourceEntries[0]?.title ?? "No entries",
      summary: [`${sourceEntries.length} runtime journal entrie(s) from ${source}.`],
    };
  });
}
