import type {
  CodexForgeBrainImportance,
  CodexForgeBrainNode,
  CodexForgeBrainStatus,
} from "@/lib/codexforge/brain/graph/types";
import type { CodexForgeBrainRuntimeEvent } from "../runtime-types";
import { normalizeMemoryFingerprint } from "./semantic-dedupe";

export type CodexForgeMemoryClusterSummary = {
  clusterId: string;
  label: string;
  itemCount: number;
  topKeywords: string[];
  importanceDistribution: Partial<Record<CodexForgeBrainImportance, number>>;
  statusDistribution: Partial<Record<CodexForgeBrainStatus, number>>;
  sourceCount: number;
  nextAction: string;
};

export type CodexForgeMemoryCluster = {
  id: string;
  label: string;
  itemIds: string[];
  items: CodexForgeBrainNode[];
  keywords: string[];
  sourceRefs: string[];
  summary: CodexForgeMemoryClusterSummary;
};

export type CodexForgeClusterMemorySignalsInput = {
  nodes: readonly CodexForgeBrainNode[];
  events?: readonly CodexForgeBrainRuntimeEvent[];
  limit?: number;
};

type ClusterBucket = {
  id: string;
  label: string;
  items: CodexForgeBrainNode[];
  keywords: Map<string, number>;
  sourceRefs: Set<string>;
};

const STOP_WORDS = new Set([
  "about",
  "active",
  "also",
  "and",
  "codexforge",
  "from",
  "into",
  "memory",
  "node",
  "that",
  "this",
  "with",
]);

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

function getNodeText(node: CodexForgeBrainNode): string {
  const data = node.data as Record<string, unknown>;
  const parts = [
    data.label,
    data.content,
    data.summary,
    data.description,
    data.text,
    data.goal,
    data.domain,
  ].filter((value): value is string => typeof value === "string" && value.trim().length > 0);

  return parts.join(" ");
}

function getTags(node: CodexForgeBrainNode): string[] {
  const data = node.data as Record<string, unknown>;
  return Array.isArray(data.tags)
    ? data.tags.filter((value): value is string => typeof value === "string")
    : [];
}

function extractKeywords(node: CodexForgeBrainNode): string[] {
  const text = normalizeMemoryFingerprint(getNodeText(node));
  const tokens = text
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(
      (token) =>
        token.length >= 4 &&
        token.length <= 36 &&
        !STOP_WORDS.has(token) &&
        !/^\d+$/.test(token)
    );

  return Array.from(new Set([...getTags(node), ...tokens])).sort((a, b) =>
    a.localeCompare(b)
  );
}

function primaryClusterKey(node: CodexForgeBrainNode): { id: string; label: string } {
  const tags = getTags(node).sort((a, b) => a.localeCompare(b));
  if (tags[0]) {
    return {
      id: `tag:${normalizeMemoryFingerprint(tags[0])}`,
      label: `Tag: ${tags[0]}`,
    };
  }

  const sourceRef = node.meta.sourceRefs?.[0];
  if (sourceRef) {
    return {
      id: `source:${sourceRef.type}:${sourceRef.id}`,
      label: `Source: ${sourceRef.type}`,
    };
  }

  const keywords = extractKeywords(node);
  if (keywords[0]) {
    return {
      id: `semantic:${stableHash(keywords.slice(0, 3).join(":"))}`,
      label: titleCase(keywords[0]),
    };
  }

  return {
    id: `kind:${node.kind}:${node.meta.status ?? "unknown"}:${node.meta.importance ?? "unknown"}`,
    label: `${titleCase(node.kind)} ${node.meta.status ?? "memory"}`,
  };
}

function addNodeToBucket(bucket: ClusterBucket, node: CodexForgeBrainNode): void {
  bucket.items.push(node);

  for (const keyword of extractKeywords(node)) {
    bucket.keywords.set(keyword, (bucket.keywords.get(keyword) ?? 0) + 1);
  }

  for (const sourceRef of node.meta.sourceRefs ?? []) {
    bucket.sourceRefs.add(`${sourceRef.type}:${sourceRef.id}`);
  }
}

function distribution<T extends string>(
  values: readonly (T | undefined)[]
): Partial<Record<T, number>> {
  const counts: Partial<Record<T, number>> = {};

  for (const value of values) {
    if (!value) continue;
    counts[value] = (counts[value] ?? 0) + 1;
  }

  return counts;
}

function topKeywords(bucket: ClusterBucket, limit = 8): string[] {
  return [...bucket.keywords.entries()]
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0].localeCompare(b[0]);
    })
    .slice(0, limit)
    .map(([keyword]) => keyword);
}

export function summarizeMemoryCluster(
  cluster: Pick<CodexForgeMemoryCluster, "id" | "label" | "items" | "keywords" | "sourceRefs">
): CodexForgeMemoryClusterSummary {
  const importanceDistribution = distribution(
    cluster.items.map((item) => item.meta.importance)
  );
  const statusDistribution = distribution(cluster.items.map((item) => item.meta.status));
  const blockedOrError =
    (statusDistribution.blocked ?? 0) + (statusDistribution.error ?? 0);
  const active = statusDistribution.active ?? 0;
  const nextAction =
    blockedOrError > 0
      ? "Review blocked or error memories before injecting context."
      : active > 0
        ? "Prefer active cluster items for near-term context."
        : "Keep cluster available for diagnostics and future context assembly.";

  return {
    clusterId: cluster.id,
    label: cluster.label,
    itemCount: cluster.items.length,
    topKeywords: cluster.keywords.slice(0, 8),
    importanceDistribution,
    statusDistribution,
    sourceCount: cluster.sourceRefs.length,
    nextAction,
  };
}

export function clusterMemorySignals(
  input: CodexForgeClusterMemorySignalsInput
): CodexForgeMemoryCluster[] {
  const buckets = new Map<string, ClusterBucket>();

  for (const node of [...input.nodes].sort((a, b) => a.id.localeCompare(b.id))) {
    const key = primaryClusterKey(node);
    const bucket =
      buckets.get(key.id) ??
      {
        id: `cluster:${stableHash(key.id)}`,
        label: key.label,
        items: [],
        keywords: new Map<string, number>(),
        sourceRefs: new Set<string>(),
      };

    addNodeToBucket(bucket, node);
    buckets.set(key.id, bucket);
  }

  for (const event of input.events ?? []) {
    const bucketId = `event:${event.type}`;
    const bucket = buckets.get(bucketId);
    if (!bucket) continue;
    bucket.sourceRefs.add(`runtime-event:${event.id}`);
  }

  return [...buckets.values()]
    .map((bucket) => {
      const items = [...bucket.items].sort((a, b) => a.id.localeCompare(b.id));
      const sourceRefs = [...bucket.sourceRefs].sort((a, b) => a.localeCompare(b));
      const keywords = topKeywords(bucket);
      const baseCluster = {
        id: bucket.id,
        label: bucket.label,
        itemIds: items.map((item) => item.id),
        items,
        keywords,
        sourceRefs,
      };

      return {
        ...baseCluster,
        summary: summarizeMemoryCluster(baseCluster),
      };
    })
    .sort((a, b) => {
      if (b.items.length !== a.items.length) return b.items.length - a.items.length;
      return a.id.localeCompare(b.id);
    })
    .slice(0, input.limit ?? 12);
}
