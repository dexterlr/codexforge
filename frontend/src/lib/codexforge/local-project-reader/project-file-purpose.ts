import type { ProjectFileMetadata, ProjectFilePurpose } from "./local-project-reader-types";
import { getProjectFileName, normalizeProjectReaderPath } from "./project-file-metadata";

function purposeEvidence(label: string, evidence: string[]): ProjectFilePurpose {
  return {
    path: "",
    kind: label,
    summary: "",
    evidence,
    suggestedInspection: "Inspect this file first, then decide whether Safe Patch Preview is needed.",
  };
}

function applyPurpose(
  path: string,
  kind: string,
  summary: string,
  evidence: string[],
  suggestedInspection = "Inspect this file first, then decide whether Safe Patch Preview is needed."
): ProjectFilePurpose {
  return { path, kind, summary, evidence, suggestedInspection };
}

export function inferProjectFilePurpose(
  input: string | Pick<ProjectFileMetadata, "path" | "category" | "probableRole">
): ProjectFilePurpose {
  const path = normalizeProjectReaderPath(typeof input === "string" ? input : input.path);
  const lower = path.toLowerCase();
  const name = getProjectFileName(lower);

  if (name === "page.tsx" || name === "page-client.tsx") {
    return applyPurpose(
      path,
      "route surface",
      "Route surface for a visible Next.js page or its client-side cockpit.",
      ["page.tsx / page-client.tsx -> route surface"],
      "Inspect route props, client boundary, and visible read-only controls before patch planning."
    );
  }

  if (name === "route.ts") {
    return applyPurpose(
      path,
      "API route",
      "Server route boundary that can expose project data or guarded workflow APIs.",
      ["route.ts -> API route"],
      "Inspect request method, path traversal guard, size cap, binary guard, and mutation absence."
    );
  }

  if (lower.includes("components/")) {
    return applyPurpose(
      path,
      "UI component",
      "User interface component that renders operator-facing state.",
      ["components -> UI component"],
      "Inspect props, copy-only actions, overflow behavior, and stable keys."
    );
  }

  if (lower.includes("scripts/smoke-codexforge")) {
    return applyPurpose(
      path,
      "smoke validation",
      "PowerShell smoke script that validates source markers and safe behavior.",
      ["smoke-codexforge -> smoke validation"],
      "Inspect assertions before changing related source markers."
    );
  }

  if (lower.includes("/tools/") || lower.includes("tool-") || lower.includes("-tool")) {
    return applyPurpose(
      path,
      "tool boundary",
      "Tool boundary for local reads, execution policy, or guarded capabilities.",
      ["tool files -> tool boundary"],
      "Inspect capability safety, handler behavior, and approval posture."
    );
  }

  if (name === "index.ts") {
    return applyPurpose(path, "barrel exports", "Barrel file that exposes domain exports.", ["index.ts -> barrel/domain exports"]);
  }

  if (name === "types.ts" || name.endsWith("types.ts")) {
    return applyPurpose(path, "type contract", "Type contract shared by domain and UI code.", ["types.ts -> type contract"]);
  }

  if (lower.includes("storage")) {
    return applyPurpose(
      path,
      "persistence/storage boundary",
      "Storage or persistence boundary that needs extra inspection.",
      ["storage.ts -> persistence/storage boundary"],
      "Inspect for writes, append-only behavior, and approval requirements."
    );
  }

  if (lower.includes("graph") || lower.includes("runtime") || lower.includes("brain")) {
    return applyPurpose(
      path,
      "Brain/runtime boundary",
      "Brain graph, runtime, or continuity boundary where mutation safety matters.",
      ["graph/runtime/brain -> Brain/runtime boundary"],
      "Inspect for graph mutation, appendEvent, saveBrainGraph, and auto-persistence risks."
    );
  }

  if (lower.includes("patch") || lower.includes("apply") || lower.includes("diff")) {
    return applyPurpose(
      path,
      "mutation-sensitive workflow",
      "Patch, apply, or diff workflow surface that must stay preview or approval gated.",
      ["patch/apply/diff -> mutation-sensitive workflow"],
      "Inspect for direct apply-diff, write-file, and approval bypass risk."
    );
  }

  if (lower.includes("command") || lower.includes("nav") || lower.includes("shell")) {
    return applyPurpose(
      path,
      "operator navigation",
      "Command palette, navigation, or shell route-discovery surface.",
      ["command/nav/shell -> operator navigation"],
      "Inspect route labels, no-mutation posture, and latest-message authority copy."
    );
  }

  const fallback = purposeEvidence("project file", ["fallback deterministic purpose"]);
  return {
    ...fallback,
    path,
    summary: "Project file available for read-only inspection.",
  };
}

export function buildProjectFilePurposeSummary(
  input: string | Pick<ProjectFileMetadata, "path" | "category" | "probableRole">
): ProjectFilePurpose {
  return inferProjectFilePurpose(input);
}

export function summarizeProjectFilePurpose(purpose: ProjectFilePurpose): string {
  return `${purpose.path}: ${purpose.kind}. ${purpose.summary}`;
}

