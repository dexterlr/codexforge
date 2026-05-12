import type {
  CodexForgeFileAction,
  CodexForgeFileKind,
  CodexForgeFileNode,
} from "./types";

const ACTIONS: CodexForgeFileAction[] = [
  "summarize",
  "explain",
  "refactor",
  "generate tests",
  "trace dependencies",
  "prepare patch",
  "analyze risk",
  "locate callers",
  "explain architecture role",
];

export function inferFileKind(path: string): CodexForgeFileKind {
  if (path.includes("/app/") && path.endsWith("route.ts")) return "route";
  if (path.endsWith(".tsx")) return "component";
  if (path.includes("/brain/runtime/memory/")) return "memory";
  if (path.includes("/brain/runtime/")) return "runtime";
  if (path.includes("/tools/")) return "tool";
  if (path.includes("scripts/smoke-")) return "smoke";
  if (path.endsWith(".css")) return "style";
  if (path.endsWith(".json") || path.endsWith(".config.ts")) return "config";
  if (path.endsWith(".md") || path.endsWith(".mdx")) return "docs";
  return "library";
}

export function inferOwnerArea(path: string): string {
  if (path.includes("/chat/")) return "Chat workspace";
  if (path.includes("/brain/runtime/memory/")) return "Cognitive memory";
  if (path.includes("/brain/runtime/")) return "Brain runtime";
  if (path.includes("/files/")) return "Files command center";
  if (path.includes("/tools/")) return "Local tools";
  if (path.includes("/app/api/")) return "Server routes";
  if (path.includes("scripts/smoke-")) return "Smoke validation";
  return "CodexForge foundation";
}

export function inferArchitectureRole(path: string): string {
  const kind = inferFileKind(path);

  if (path.includes("/app/api/")) {
    return "Server boundary that turns workspace requests into guarded runtime behavior.";
  }

  if (path.includes("/brain/runtime/memory/")) {
    return "Deterministic memory subsystem for ranking, aging, clustering, or promotion.";
  }

  if (path.includes("/brain/runtime/")) {
    return "Canonical cognitive runtime layer built on the brain graph schema.";
  }

  if (path.includes("/files/")) {
    return "AI-native file command surface for local intelligence and edit safety.";
  }

  if (kind === "tool") {
    return "Workspace tool adapter with local guardrails and structured results.";
  }

  if (kind === "smoke") {
    return "Regression contract that protects CodexForge product surfaces.";
  }

  if (kind === "component") {
    return "Client-facing product surface that renders CodexForge operator context.";
  }

  return "Supporting library surface used by CodexForge workflows.";
}

export function inferRelatedConcepts(path: string): string[] {
  const concepts = new Set<string>();
  const lowerPath = path.toLowerCase();

  if (lowerPath.includes("chat")) concepts.add("conversation state");
  if (lowerPath.includes("route")) concepts.add("server boundary");
  if (lowerPath.includes("runtime")) concepts.add("brain runtime");
  if (lowerPath.includes("memory")) concepts.add("cognitive memory");
  if (lowerPath.includes("tool")) concepts.add("local tool safety");
  if (lowerPath.includes("smoke")) concepts.add("smoke coverage");
  if (lowerPath.includes("files")) concepts.add("file command center");
  if (lowerPath.includes("graph")) concepts.add("canonical graph schema");
  if (lowerPath.includes("risk")) concepts.add("edit risk");

  if (concepts.size === 0) concepts.add("workspace architecture");

  return Array.from(concepts).sort();
}

export function summarizeFilePurpose(path: string): string {
  const name = path.split("/").pop() ?? path;
  const role = inferArchitectureRole(path);
  return `${name} is part of ${inferOwnerArea(path)}. ${role}`;
}

export function inferSafeNextActions(file: Pick<CodexForgeFileNode, "path" | "kind" | "tags">): CodexForgeFileAction[] {
  if (file.kind === "smoke") {
    return ["summarize", "explain", "analyze risk", "prepare patch"];
  }

  if (file.path.includes("/brain/runtime/")) {
    return [
      "summarize",
      "explain architecture role",
      "trace dependencies",
      "analyze risk",
      "generate tests",
    ];
  }

  if (file.kind === "component") {
    return [
      "summarize",
      "explain",
      "locate callers",
      "generate tests",
      "prepare patch",
    ];
  }

  return ACTIONS.slice(0, 6);
}

export function getAvailableFileActions(): CodexForgeFileAction[] {
  return [...ACTIONS];
}
