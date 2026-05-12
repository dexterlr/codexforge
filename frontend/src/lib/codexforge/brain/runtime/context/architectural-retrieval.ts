import type {
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph/types";
import type { CodexForgeBrainRuntimeEvent } from "../runtime-types";
import { inferSemanticRoute } from "./semantic-routing";

export type CodexForgeArchitecturalContext = {
  subsystem:
    | "runtime"
    | "memory"
    | "files"
    | "tools"
    | "chat"
    | "ui"
    | "api"
    | "smoke"
    | "docs";
  confidence: number;
  relatedFiles: string[];
  relatedConcepts: string[];
  constraints: string[];
  likelyEditBoundaries: string[];
  risks: string[];
  reasons: string[];
};

export type CodexForgeArchitecturalRetrievalInput = {
  graph?: CodexForgeBrainGraph;
  events?: readonly CodexForgeBrainRuntimeEvent[];
  filePaths?: readonly string[];
  tags?: readonly string[];
  concepts?: readonly string[];
  focusPath?: string;
};

function asRecord(node: CodexForgeBrainNode): Record<string, unknown> {
  return node.data as Record<string, unknown>;
}

function subsystemForPath(path: string): CodexForgeArchitecturalContext["subsystem"] {
  const lower = path.replaceAll("\\", "/").toLowerCase();
  if (lower.includes("/brain/runtime/memory/")) return "memory";
  if (lower.includes("/brain/runtime/")) return "runtime";
  if (lower.includes("/files/")) return "files";
  if (lower.includes("/tools/")) return "tools";
  if (lower.includes("/chat/")) return "chat";
  if (lower.includes("/app/api/")) return "api";
  if (lower.includes("scripts/smoke-")) return "smoke";
  if (lower.endsWith(".md") || lower.endsWith(".mdx")) return "docs";
  if (lower.endsWith(".tsx") || lower.includes("/components/")) return "ui";
  return "runtime";
}

function subsystemConstraints(subsystem: CodexForgeArchitecturalContext["subsystem"]): string[] {
  const shared = ["Use canonical brain graph types.", "Keep ordering deterministic."];
  const map: Record<CodexForgeArchitecturalContext["subsystem"], string[]> = {
    runtime: ["No IO in runtime modules.", "No legacy brain-graph imports.", ...shared],
    memory: ["Rank and dedupe before promotion.", "Expose explainable memory reasons.", ...shared],
    files: ["Read files only in server helpers.", "Keep API read-only and bounded.", ...shared],
    tools: ["Respect approval and mutation boundaries.", ...shared],
    chat: ["Avoid deep chat persistence rewrites.", ...shared],
    ui: ["Do not make UI own runtime graph state.", ...shared],
    api: ["Keep route fallbacks safe.", "Do not add network dependencies.", ...shared],
    smoke: ["Assert contracts with fixed markers.", ...shared],
    docs: ["Document constraints without changing runtime behavior.", ...shared],
  };
  return map[subsystem];
}

export function retrieveArchitecturalContext(
  input: CodexForgeArchitecturalRetrievalInput
): CodexForgeArchitecturalContext {
  const nodeFiles = (input.graph?.nodes ?? [])
    .map((node) => asRecord(node).filePath ?? asRecord(node).path ?? asRecord(node).repoPath)
    .filter((value): value is string => typeof value === "string" && value.length > 0);
  const eventFiles = (input.events ?? [])
    .map((event) =>
      event.type === "diff.generated" ? event.payload.filePath : undefined
    )
    .filter((value): value is string => Boolean(value));
  const paths = Array.from(
    new Set(
      [input.focusPath, ...(input.filePaths ?? []), ...nodeFiles, ...eventFiles].filter(
        (value): value is string => typeof value === "string" && value.length > 0
      )
    )
  ).sort();
  const focus = input.focusPath ?? paths[0] ?? "";
  const subsystem = subsystemForPath(focus);
  const route = inferSemanticRoute({
    path: focus,
    tags: input.tags,
    text: [...(input.concepts ?? []), ...(input.tags ?? [])].join(" "),
  });
  const concepts = Array.from(
    new Set([
      subsystem,
      route.route,
      ...(input.concepts ?? []),
      ...(input.tags ?? []),
      ...paths.flatMap((path) => {
        const lower = path.toLowerCase();
        return [
          lower.includes("runtime") ? "runtime context" : "",
          lower.includes("memory") ? "cognitive memory" : "",
          lower.includes("risk") ? "risk handling" : "",
          lower.includes("smoke") ? "smoke validation" : "",
          lower.includes("files") ? "files intelligence" : "",
        ];
      }),
    ].filter(Boolean))
  ).sort();

  return {
    subsystem,
    confidence: Math.min(1, Number((0.5 + route.confidence * 0.35 + (focus ? 0.15 : 0)).toFixed(4))),
    relatedFiles: paths.filter((path) => subsystemForPath(path) === subsystem).slice(0, 8),
    relatedConcepts: concepts.slice(0, 10),
    constraints: subsystemConstraints(subsystem),
    likelyEditBoundaries: [
      `Primary subsystem: ${subsystem}.`,
      "Keep changes inside runtime/context, exports, server helpers, and smoke contracts unless explicitly required.",
    ],
    risks: [
      subsystem === "runtime" ? "Runtime context modules must not read files or call APIs." : "",
      subsystem === "files" ? "Files integration must remain read-only and fallback-safe." : "",
      subsystem === "api" ? "Route output must stay optional for UI consumers." : "",
    ].filter(Boolean),
    reasons: [`subsystem:${subsystem}`, ...route.reasons].sort(),
  };
}

export function summarizeArchitecturalContext(
  context: CodexForgeArchitecturalContext
): string {
  return `${context.subsystem} architecture context with ${context.relatedFiles.length} related files, ${context.relatedConcepts.length} concepts, and ${context.risks.length} risks.`;
}
