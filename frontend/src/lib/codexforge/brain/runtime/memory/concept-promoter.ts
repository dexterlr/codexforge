import type {
  CodexForgeBrainNode,
  CodexForgeBrainNodeId,
} from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeBrainConceptSynthesizedPayload,
  CodexForgeBrainRuntimeEvent,
  CodexForgeBrainRuntimeEventInput,
} from "../runtime-types";
import { normalizeMemoryFingerprint } from "./semantic-dedupe";

const MIN_DEFAULT_SIGNALS = 3;
const MIN_DEFAULT_CONFIDENCE = 0.62;
const STOP_WORDS = new Set([
  "about",
  "active",
  "also",
  "codexforge",
  "from",
  "have",
  "memory",
  "needs",
  "note",
  "that",
  "this",
  "with",
]);

type ConceptSignalBucket = {
  label: string;
  count: number;
  strength: number;
  sourceNodeIds: Set<CodexForgeBrainNodeId>;
  sourceEventIds: Set<string>;
  supportingSignals: Set<string>;
};

export type CodexForgePromotableConcept = {
  id: string;
  label: string;
  summary: string;
  confidence: number;
  supportingSignals: string[];
  sourceNodeIds: CodexForgeBrainNodeId[];
  sourceEventIds: string[];
  recommendedEventType: "concept.synthesized";
  eventPayload: CodexForgeBrainConceptSynthesizedPayload;
};

export type CodexForgeConceptPromotionResult = {
  candidate: CodexForgePromotableConcept;
  shouldPromote: boolean;
  reasons: string[];
  eventInput: CodexForgeBrainRuntimeEventInput;
};

export type CodexForgeFindPromotableConceptsInput = {
  nodes?: readonly CodexForgeBrainNode[];
  events?: readonly CodexForgeBrainRuntimeEvent[];
  minSignals?: number;
  minConfidence?: number;
  limit?: number;
};

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function stableHash(input: string): string {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(16);
}

function titleCase(value: string): string {
  return value
    .split(/[-\s_/\\:.]+/)
    .filter(Boolean)
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

function tokenizeConcepts(value: string): string[] {
  return normalizeMemoryFingerprint(value)
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(
      (token) =>
        token.length >= 4 &&
        token.length <= 40 &&
        !STOP_WORDS.has(token) &&
        !/^\d+$/.test(token)
    );
}

function nodeStrength(node: CodexForgeBrainNode): number {
  let strength = 0.4;
  if (node.meta.pinned) strength += 0.22;

  switch (node.meta.importance) {
    case "critical":
      strength += 0.28;
      break;
    case "high":
      strength += 0.2;
      break;
    case "medium":
      strength += 0.1;
      break;
    case "low":
      strength += 0.03;
      break;
  }

  if (node.meta.status === "active") strength += 0.08;
  if (node.meta.archived || node.meta.status === "archived") strength -= 0.18;

  return clamp01(strength);
}

function addSignal(
  buckets: Map<string, ConceptSignalBucket>,
  label: string,
  source: {
    nodeId?: CodexForgeBrainNodeId;
    eventId?: string;
    strength: number;
    signal: string;
  }
): void {
  const key = normalizeMemoryFingerprint(label);
  if (!key || STOP_WORDS.has(key)) return;

  const bucket =
    buckets.get(key) ??
    {
      label: titleCase(key),
      count: 0,
      strength: 0,
      sourceNodeIds: new Set<CodexForgeBrainNodeId>(),
      sourceEventIds: new Set<string>(),
      supportingSignals: new Set<string>(),
    };

  bucket.count += 1;
  bucket.strength += source.strength;
  bucket.supportingSignals.add(source.signal);
  if (source.nodeId) bucket.sourceNodeIds.add(source.nodeId);
  if (source.eventId) bucket.sourceEventIds.add(source.eventId);
  buckets.set(key, bucket);
}

function collectNodeSignals(
  buckets: Map<string, ConceptSignalBucket>,
  nodes: readonly CodexForgeBrainNode[]
): void {
  for (const node of nodes) {
    const data = node.data as Record<string, unknown>;
    const strength = nodeStrength(node);

    for (const tag of Array.isArray(data.tags) ? data.tags : []) {
      if (typeof tag === "string") {
        addSignal(buckets, tag, {
          nodeId: node.id,
          strength,
          signal: `node-tag:${tag}`,
        });
      }
    }

    for (const field of ["domain", "memoryType", "sourceLabel"]) {
      const value = data[field];
      if (typeof value === "string" && value.trim()) {
        addSignal(buckets, value, {
          nodeId: node.id,
          strength,
          signal: `node-field:${field}`,
        });
      }
    }

    for (const field of ["label", "content", "summary", "description", "text"]) {
      const value = data[field];
      if (typeof value !== "string") continue;

      for (const token of tokenizeConcepts(value)) {
        addSignal(buckets, token, {
          nodeId: node.id,
          strength,
          signal: `node-token:${token}`,
        });
      }
    }
  }
}

function collectEventSignals(
  buckets: Map<string, ConceptSignalBucket>,
  events: readonly CodexForgeBrainRuntimeEvent[]
): void {
  for (const event of events) {
    switch (event.type) {
      case "task.created":
        for (const tag of event.payload.tags ?? []) {
          addSignal(buckets, tag, {
            eventId: event.id,
            strength: 0.55,
            signal: `event-tag:${tag}`,
          });
        }
        if (event.payload.domain) {
          addSignal(buckets, event.payload.domain, {
            eventId: event.id,
            strength: 0.52,
            signal: `event-domain:${event.payload.domain}`,
          });
        }
        for (const token of tokenizeConcepts(event.payload.goal)) {
          addSignal(buckets, token, {
            eventId: event.id,
            strength: 0.5,
            signal: `event-goal:${token}`,
          });
        }
        break;
      case "memory.promoted":
        addSignal(buckets, event.payload.memoryType, {
          eventId: event.id,
          strength: event.payload.pinned ? 0.78 : 0.58,
          signal: `event-memory-type:${event.payload.memoryType}`,
        });
        for (const token of tokenizeConcepts(event.payload.content)) {
          addSignal(buckets, token, {
            eventId: event.id,
            strength: event.payload.pinned ? 0.76 : 0.56,
            signal: `event-memory:${token}`,
          });
        }
        break;
      case "concept.synthesized":
        addSignal(buckets, event.payload.label, {
          eventId: event.id,
          strength: clamp01(event.payload.confidence ?? 0.55),
          signal: `event-existing-concept:${event.payload.label}`,
        });
        break;
      default:
        break;
    }
  }
}

function bucketConfidence(bucket: ConceptSignalBucket): number {
  const sourceCount = bucket.sourceNodeIds.size + bucket.sourceEventIds.size;
  const averageStrength = bucket.strength / Math.max(1, bucket.count);

  return clamp01(
    averageStrength * 0.5 +
      Math.min(6, bucket.count) * 0.07 +
      Math.min(6, sourceCount) * 0.045
  );
}

export function findPromotableConcepts(
  input: CodexForgeFindPromotableConceptsInput
): CodexForgePromotableConcept[] {
  const buckets = new Map<string, ConceptSignalBucket>();
  const minSignals = input.minSignals ?? MIN_DEFAULT_SIGNALS;
  const minConfidence = input.minConfidence ?? MIN_DEFAULT_CONFIDENCE;

  collectNodeSignals(buckets, input.nodes ?? []);
  collectEventSignals(buckets, input.events ?? []);

  return [...buckets.entries()]
    .map(([key, bucket]) => {
      const confidence = bucketConfidence(bucket);
      const sourceNodeIds = [...bucket.sourceNodeIds].sort((a, b) =>
        a.localeCompare(b)
      );
      const sourceEventIds = [...bucket.sourceEventIds].sort((a, b) =>
        a.localeCompare(b)
      );
      const supportingSignals = [...bucket.supportingSignals].sort((a, b) =>
        a.localeCompare(b)
      );
      const conceptId = `concept:${stableHash(key)}`;
      const summary = `Repeated cognitive signal "${bucket.label}" across ${bucket.count} deterministic observations.`;
      const eventPayload: CodexForgeBrainConceptSynthesizedPayload = {
        conceptId,
        label: bucket.label,
        summary,
        confidence,
        sourceNodeIds,
        sourceEventIds,
      };

      return {
        id: conceptId,
        label: bucket.label,
        summary,
        confidence,
        supportingSignals,
        sourceNodeIds,
        sourceEventIds,
        recommendedEventType: "concept.synthesized" as const,
        eventPayload,
      };
    })
    .filter((candidate) => {
      const signalCount =
        candidate.sourceNodeIds.length +
        candidate.sourceEventIds.length +
        candidate.supportingSignals.length;

      return (
        candidate.confidence >= minConfidence &&
        (signalCount >= minSignals ||
          (candidate.confidence >= 0.78 && signalCount >= minSignals - 1))
      );
    })
    .sort((a, b) => {
      if (b.confidence !== a.confidence) return b.confidence - a.confidence;
      if (b.supportingSignals.length !== a.supportingSignals.length) {
        return b.supportingSignals.length - a.supportingSignals.length;
      }
      return a.id.localeCompare(b.id);
    })
    .slice(0, input.limit ?? 10);
}

export function promoteConceptCandidate(
  candidate: CodexForgePromotableConcept
): CodexForgeConceptPromotionResult {
  const supportCount =
    candidate.sourceNodeIds.length +
    candidate.sourceEventIds.length +
    candidate.supportingSignals.length;
  const shouldPromote = candidate.confidence >= 0.62 && supportCount >= 3;
  const reasons = [
    `confidence:${candidate.confidence.toFixed(2)}`,
    `supporting-signals:${supportCount}`,
    shouldPromote ? "promotion-threshold-met" : "promotion-threshold-not-met",
  ];

  return {
    candidate,
    shouldPromote,
    reasons,
    eventInput: {
      type: "concept.synthesized",
      actor: "runtime",
      payload: candidate.eventPayload,
      metadata: {
        supportingSignals: candidate.supportingSignals,
        recommendedEventType: candidate.recommendedEventType,
      },
    },
  };
}
