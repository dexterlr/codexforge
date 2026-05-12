import { clampScore, tokenizeContextText } from "./relevance-engine";

export type CodexForgeSemanticRoute =
  | "file"
  | "task"
  | "diff"
  | "execution"
  | "memory"
  | "architecture"
  | "risk"
  | "research"
  | "design"
  | "trading"
  | "blender"
  | "decks"
  | "marketing"
  | "general";

export type CodexForgeSemanticRoutingInput = {
  text?: string;
  path?: string;
  domain?: string;
  tags?: readonly string[];
  eventType?: string;
};

export type CodexForgeSemanticRouteResult = {
  route: CodexForgeSemanticRoute;
  confidence: number;
  reasons: string[];
  preferredContextSections: string[];
};

const ROUTE_SECTIONS: Record<CodexForgeSemanticRoute, string[]> = {
  file: ["relevantFiles", "architecture", "risks", "nextSafeActions"],
  task: ["relevantTasks", "blockers", "nextSafeActions", "priorExecutions"],
  diff: ["relevantFiles", "risks", "priorExecutions", "nextSafeActions"],
  execution: ["priorExecutions", "risks", "blockers", "nextSafeActions"],
  memory: ["relevantMemories", "architecture", "risks"],
  architecture: ["architecturalConcepts", "relevantFiles", "risks"],
  risk: ["risks", "blockers", "nextSafeActions"],
  research: ["relevantMemories", "architecturalConcepts", "nextSafeActions"],
  design: ["relevantFiles", "architecturalConcepts", "nextSafeActions"],
  trading: ["risks", "priorExecutions", "nextSafeActions"],
  blender: ["relevantFiles", "priorExecutions", "nextSafeActions"],
  decks: ["relevantFiles", "relevantTasks", "nextSafeActions"],
  marketing: ["relevantTasks", "relevantMemories", "nextSafeActions"],
  general: ["relevantFiles", "relevantMemories", "relevantTasks", "nextSafeActions"],
};

const ROUTE_KEYWORDS: Record<CodexForgeSemanticRoute, string[]> = {
  file: ["file", "path", "component", "route.ts", "runtime-file", "preview"],
  task: ["task", "goal", "todo", "plan", "next", "blocker"],
  diff: ["diff", "patch", "change", "modified", "generated"],
  execution: ["execution", "run", "command", "tool", "validation", "smoke"],
  memory: ["memory", "remember", "decision", "fact", "concept"],
  architecture: ["architecture", "runtime", "schema", "subsystem", "boundary"],
  risk: ["risk", "failure", "error", "blocked", "approval", "mutation"],
  research: ["research", "finding", "source", "web"],
  design: ["design", "ui", "component", "layout", "brand"],
  trading: ["trade", "trading", "market", "price", "ticker"],
  blender: ["blender", "3d", "render", "scene", "model"],
  decks: ["deck", "slide", "presentation"],
  marketing: ["marketing", "campaign", "copy", "landing"],
  general: [],
};

function routePathHints(path: string | undefined): CodexForgeSemanticRoute[] {
  const lower = (path ?? "").replaceAll("\\", "/").toLowerCase();
  const routes: CodexForgeSemanticRoute[] = [];
  if (!lower) return routes;
  if (lower.includes("/brain/runtime/")) routes.push("architecture");
  if (lower.includes("/brain/runtime/memory/")) routes.push("memory");
  if (lower.includes("/files/")) routes.push("file");
  if (lower.includes("/app/api/")) routes.push("execution");
  if (lower.includes("scripts/smoke-")) routes.push("execution", "risk");
  if (lower.includes(".tsx")) routes.push("design");
  if (lower.includes("diff")) routes.push("diff");
  return routes;
}

export function inferSemanticRoute(
  input: CodexForgeSemanticRoutingInput
): CodexForgeSemanticRouteResult {
  const tokens = new Set(
    tokenizeContextText(
      [input.text, input.path, input.domain, ...(input.tags ?? []), input.eventType]
        .filter(Boolean)
        .join(" ")
    )
  );
  const scores = new Map<CodexForgeSemanticRoute, number>();
  const reasons = new Map<CodexForgeSemanticRoute, string[]>();

  for (const route of Object.keys(ROUTE_KEYWORDS) as CodexForgeSemanticRoute[]) {
    scores.set(route, 0);
    reasons.set(route, []);
    for (const keyword of ROUTE_KEYWORDS[route]) {
      if (tokens.has(keyword) || input.path?.toLowerCase().includes(keyword)) {
        scores.set(route, (scores.get(route) ?? 0) + 1);
        reasons.get(route)?.push(`keyword:${keyword}`);
      }
    }
  }

  for (const route of routePathHints(input.path)) {
    scores.set(route, (scores.get(route) ?? 0) + 2);
    reasons.get(route)?.push(`path:${route}`);
  }

  if (input.eventType === "failure.detected") {
    scores.set("risk", (scores.get("risk") ?? 0) + 3);
    reasons.get("risk")?.push("event:failure.detected");
  }
  if (input.eventType?.startsWith("execution.")) {
    scores.set("execution", (scores.get("execution") ?? 0) + 2);
    reasons.get("execution")?.push(`event:${input.eventType}`);
  }
  if (input.eventType === "diff.generated") {
    scores.set("diff", (scores.get("diff") ?? 0) + 3);
    reasons.get("diff")?.push("event:diff.generated");
  }

  const ranked = [...scores.entries()].sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
  );
  const fallback: [CodexForgeSemanticRoute, number] = ["general", 0];
  const [route, score] = ranked[0] && ranked[0][1] > 0 ? ranked[0] : fallback;

  return {
    route,
    confidence: clampScore(score / 5),
    reasons: reasons.get(route)?.length ? reasons.get(route)!.sort() : ["fallback:general"],
    preferredContextSections: ROUTE_SECTIONS[route],
  };
}

export function routeContextFocus(
  input: CodexForgeSemanticRoutingInput
): CodexForgeSemanticRouteResult {
  return inferSemanticRoute(input);
}
