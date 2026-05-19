import {
  buildValidationRunnerStableId,
  type ValidationCommandCatalog,
  type ValidationCommandCatalogItem,
  type ValidationCommandCategory,
  type ValidationRiskLevel,
} from "./validation-runner-types";

const DEFAULT_COMMANDS = [
  "npm run build",
  "npm run smoke:codexforge:server",
  "git diff --check",
  "git status --short",
  "git diff --stat",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-local-project-reader.ps1",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-real-patch-preview.ps1",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-approved-patch-apply.ps1",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-validation-runner.ps1",
] as const;

function normalizeCommand(command: string): string {
  return command.trim().replace(/\s+/g, " ");
}

export function isSmokeCodexForgeScriptCommand(command: string): boolean {
  return /^powershell -ExecutionPolicy Bypass -File \.\\scripts\\smoke-codexforge-[a-z0-9-]+\.ps1$/i.test(
    normalizeCommand(command)
  );
}

export function isValidationCommandAllowlisted(command: string, suppliedCommands: readonly string[] = []): boolean {
  const normalized = normalizeCommand(command);
  if ((DEFAULT_COMMANDS as readonly string[]).includes(normalized)) return true;
  return suppliedCommands.map(normalizeCommand).includes(normalized) && isSmokeCodexForgeScriptCommand(normalized);
}

function categoryForCommand(command: string): ValidationCommandCategory {
  if (command === "npm run build") return "build";
  if (command === "npm run smoke:codexforge:server") return "server-smoke";
  if (command.startsWith("git diff") || command === "git status --short") return "git-check";
  if (command.includes("regression")) return "regression-check";
  if (isSmokeCodexForgeScriptCommand(command)) return "targeted-smoke";
  return "unknown";
}

function riskForCommand(command: string, allowlisted: boolean): ValidationRiskLevel {
  if (!allowlisted) return "blocked";
  if (command === "npm run build" || command === "npm run smoke:codexforge:server") return "medium";
  if (command.includes("smoke-codexforge-")) return "medium";
  return "low";
}

export function buildValidationCommandCatalogItem(args: {
  command: string;
  suppliedCommands?: readonly string[] | null;
  label?: string | null;
  purpose?: string | null;
  relatedPhaseOrSurface?: string | null;
}): ValidationCommandCatalogItem {
  const command = normalizeCommand(args.command);
  const suppliedCommands = args.suppliedCommands ?? [];
  const allowlisted = isValidationCommandAllowlisted(command, suppliedCommands);
  const category = categoryForCommand(command);
  const riskLevel = riskForCommand(command, allowlisted);
  return {
    id: buildValidationRunnerStableId("validation-command", command),
    label: args.label?.trim() || command,
    command,
    purpose: args.purpose?.trim() || (allowlisted ? "Approved validation command." : "Unknown command blocked by default."),
    category,
    riskLevel,
    allowlisted,
    requiresApproval: true,
    expectedDurationLabel:
      category === "build" || category === "server-smoke" ? "medium" : category === "targeted-smoke" ? "short to medium" : "short",
    outputRoutingHint:
      category === "build" || category.includes("smoke") ? "verification ingestion or regression triage" : "manual review",
    relatedPhaseOrSurface: args.relatedPhaseOrSurface?.trim() || "Validation Runner v1",
    noWriteExpectation: "no file writes; build/smoke may create ordinary tool output only",
  };
}

export function buildValidationCommandCatalog(commands: readonly string[] = DEFAULT_COMMANDS): ValidationCommandCatalog {
  const unique = Array.from(new Set(commands.map(normalizeCommand).filter(Boolean)));
  const items = unique.map((command) => buildValidationCommandCatalogItem({ command, suppliedCommands: unique }));
  const allowlistedCount = items.filter((item) => item.allowlisted).length;
  const blockedCount = items.length - allowlistedCount;
  const catalog: ValidationCommandCatalog = {
    id: "validation-command-catalog",
    items,
    allowlistedCount,
    blockedCount,
    summary: [],
  };
  return { ...catalog, summary: summarizeValidationCommandCatalog(catalog) };
}

export function summarizeValidationCommandCatalog(catalog: Pick<ValidationCommandCatalog, "items" | "allowlistedCount" | "blockedCount">): string[] {
  return [
    `${catalog.items.length} validation command(s) cataloged.`,
    `${catalog.allowlistedCount} allowlisted command(s), ${catalog.blockedCount} blocked unknown command(s).`,
    "Catalog is deterministic and does not execute commands or read the filesystem.",
  ];
}
