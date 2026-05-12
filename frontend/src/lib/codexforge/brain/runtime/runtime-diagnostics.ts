import {
  CODEXFORGE_BRAIN_RUNTIME_CANONICAL_SCHEMA_PATH,
  CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES,
  CODEXFORGE_BRAIN_RUNTIME_FORBIDDEN_IMPORTS,
  CODEXFORGE_BRAIN_RUNTIME_REQUIRED_APIS,
} from "./runtime-contract";
import {
  CODEXFORGE_BRAIN_GRAPH_VERSION,
  type CodexForgeBrainGraph,
} from "@/lib/codexforge/brain/graph/types";

export type CodexForgeBrainRuntimeDiagnosticSeverity =
  | "info"
  | "warning"
  | "risk"
  | "blocker";

export type CodexForgeBrainRuntimeDiagnostic = {
  id: string;
  severity: CodexForgeBrainRuntimeDiagnosticSeverity;
  code: string;
  title: string;
  summary: string;
  evidence: readonly string[];
};

export type CodexForgeBrainRuntimeDiagnosticEventLike = {
  id?: string;
  type?: string;
  ts?: number;
};

export type CodexForgeBrainRuntimeDiagnosticGraphLike = Partial<
  Pick<CodexForgeBrainGraph, "version" | "nodes" | "edges">
> & {
  meta?: Partial<CodexForgeBrainGraph["meta"]>;
};

export type CodexForgeBrainRuntimeDiagnosticsInput = {
  apiMap?: Record<string, unknown>;
  events?: readonly CodexForgeBrainRuntimeDiagnosticEventLike[];
  graph?: CodexForgeBrainRuntimeDiagnosticGraphLike | null;
  now?: number;
  staleAfterMs?: number;
  legacyImportLabels?: readonly string[];
  nextStepLabels?: readonly string[];
  canonicalSchemaPath?: string;
};

const DEFAULT_STALE_AFTER_MS = 24 * 60 * 60 * 1000;

const SEVERITY_WEIGHT: Record<CodexForgeBrainRuntimeDiagnosticSeverity, number> =
  {
    blocker: 4,
    risk: 3,
    warning: 2,
    info: 1,
  };

function normalizeLabel(value: string): string {
  return value.trim().toLowerCase();
}

function containsForbiddenImport(label: string): boolean {
  const normalized = normalizeLabel(label);
  return CODEXFORGE_BRAIN_RUNTIME_FORBIDDEN_IMPORTS.some((forbidden) =>
    normalized.includes(forbidden.toLowerCase())
  );
}

function describesUnsafeGraphMutation(label: string): boolean {
  const normalized = normalizeLabel(label);
  const mentionsGraph = normalized.includes("graph");
  const mentionsMutation =
    normalized.includes("mutation") ||
    normalized.includes("mutate") ||
    normalized.includes("upsertnode") ||
    normalized.includes("connectnodes");
  const mentionsDirectUi =
    normalized.includes("ui") ||
    normalized.includes("page") ||
    normalized.includes("component") ||
    normalized.includes("wire");

  return mentionsGraph && mentionsMutation && mentionsDirectUi;
}

function diagnostic(
  severity: CodexForgeBrainRuntimeDiagnosticSeverity,
  code: string,
  title: string,
  summary: string,
  evidence: readonly string[] = []
): CodexForgeBrainRuntimeDiagnostic {
  return {
    id: `${severity}:${code}`,
    severity,
    code,
    title,
    summary,
    evidence: [...evidence].sort((a, b) => a.localeCompare(b)),
  };
}

function sortDiagnostics(
  diagnostics: CodexForgeBrainRuntimeDiagnostic[]
): CodexForgeBrainRuntimeDiagnostic[] {
  return diagnostics.sort((a, b) => {
    const severityDelta =
      SEVERITY_WEIGHT[b.severity] - SEVERITY_WEIGHT[a.severity];
    if (severityDelta !== 0) return severityDelta;
    return a.code.localeCompare(b.code) || a.id.localeCompare(b.id);
  });
}

export function runBrainRuntimeDiagnostics(
  input: CodexForgeBrainRuntimeDiagnosticsInput = {}
): CodexForgeBrainRuntimeDiagnostic[] {
  const diagnostics: CodexForgeBrainRuntimeDiagnostic[] = [];
  const events = input.events ?? [];
  const knownEventTypes = new Set<string>(CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES);

  if (input.apiMap) {
    const missingApis = CODEXFORGE_BRAIN_RUNTIME_REQUIRED_APIS.filter(
      (apiName) => typeof input.apiMap?.[apiName] !== "function"
    );

    if (missingApis.length > 0) {
      diagnostics.push(
        diagnostic(
          "blocker",
          "missing-required-apis",
          "Missing required runtime APIs",
          "The supplied runtime API map does not expose every required Phase 1 runtime function.",
          missingApis
        )
      );
    }
  }

  const unknownEventTypes = events
    .map((event) => event.type)
    .filter((type): type is string => Boolean(type))
    .filter((type) => !knownEventTypes.has(type));

  if (unknownEventTypes.length > 0) {
    diagnostics.push(
      diagnostic(
        "warning",
        "unknown-event-types",
        "Unknown runtime event types",
        "Runtime events include types outside the contract event architecture.",
        [...new Set(unknownEventTypes)]
      )
    );
  }

  if (events.length === 0) {
    diagnostics.push(
      diagnostic(
        "warning",
        "empty-event-stream",
        "Empty runtime event stream",
        "The runtime has no events to audit, reduce, or transform into timeline data."
      )
    );
  }

  if (input.graph) {
    if (!Array.isArray(input.graph.nodes) || input.graph.nodes.length === 0) {
      diagnostics.push(
        diagnostic(
          "risk",
          "graph-without-nodes",
          "Graph has no nodes",
          "The supplied graph cannot provide meaningful runtime context until nodes exist."
        )
      );
    }

    if (input.graph.version !== CODEXFORGE_BRAIN_GRAPH_VERSION) {
      diagnostics.push(
        diagnostic(
          "risk",
          "schema-drift-risk",
          "Schema drift risk",
          "The supplied graph version does not match the canonical graph schema version.",
          [
            `expected:${CODEXFORGE_BRAIN_GRAPH_VERSION}`,
            `actual:${String(input.graph.version)}`,
          ]
        )
      );
    }

    const updatedAt = input.graph.meta?.updatedAt;
    if (
      typeof input.now === "number" &&
      typeof updatedAt === "number" &&
      input.now - updatedAt > (input.staleAfterMs ?? DEFAULT_STALE_AFTER_MS)
    ) {
      diagnostics.push(
        diagnostic(
          "warning",
          "stale-graph-updated-at",
          "Stale graph updatedAt",
          "The supplied graph appears older than the configured runtime freshness window.",
          [`updatedAt:${updatedAt}`, `now:${input.now}`]
        )
      );
    }
  }

  if (
    input.canonicalSchemaPath &&
    input.canonicalSchemaPath !== CODEXFORGE_BRAIN_RUNTIME_CANONICAL_SCHEMA_PATH
  ) {
    diagnostics.push(
      diagnostic(
        "risk",
        "schema-path-drift-risk",
        "Schema drift risk",
        "The supplied schema path is not the canonical CodexForge brain graph schema path.",
        [
          `expected:${CODEXFORGE_BRAIN_RUNTIME_CANONICAL_SCHEMA_PATH}`,
          `actual:${input.canonicalSchemaPath}`,
        ]
      )
    );
  }

  const legacyImportLabels = (input.legacyImportLabels ?? []).filter(
    containsForbiddenImport
  );
  if (legacyImportLabels.length > 0) {
    diagnostics.push(
      diagnostic(
        "risk",
        "legacy-import-risk",
        "Legacy import risk",
        "Supplied import labels reference forbidden legacy graph modules.",
        legacyImportLabels
      )
    );
  }

  const unsafeNextSteps = (input.nextStepLabels ?? []).filter(
    describesUnsafeGraphMutation
  );
  if (unsafeNextSteps.length > 0) {
    diagnostics.push(
      diagnostic(
        "blocker",
        "unsafe-ui-graph-mutation",
        "Unsafe UI graph mutation path",
        "Next-step labels suggest wiring UI surfaces directly to graph mutations instead of runtime events.",
        unsafeNextSteps
      )
    );
  }

  if (diagnostics.length === 0) {
    diagnostics.push(
      diagnostic(
        "info",
        "runtime-diagnostics-clear",
        "Runtime diagnostics clear",
        "No deterministic runtime self-awareness findings were detected."
      )
    );
  }

  return sortDiagnostics(diagnostics);
}

export function summarizeBrainRuntimeDiagnostics(
  diagnostics: readonly CodexForgeBrainRuntimeDiagnostic[] =
    runBrainRuntimeDiagnostics()
): string {
  const counts: Record<CodexForgeBrainRuntimeDiagnosticSeverity, number> = {
    blocker: 0,
    risk: 0,
    warning: 0,
    info: 0,
  };

  for (const item of diagnostics) {
    counts[item.severity] += 1;
  }

  const lead =
    diagnostics.find((item) => item.severity === "blocker") ??
    diagnostics.find((item) => item.severity === "risk") ??
    diagnostics.find((item) => item.severity === "warning") ??
    diagnostics[0];

  return [
    `Brain runtime diagnostics: ${counts.blocker} blockers, ${counts.risk} risks, ${counts.warning} warnings, ${counts.info} info.`,
    lead ? `Top finding: ${lead.title}.` : "",
  ]
    .filter(Boolean)
    .join(" ");
}
