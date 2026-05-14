import type {
  CodexForgePatchRiskBoard,
  CodexForgePatchRiskInput,
  CodexForgePatchRiskLevel,
} from "./patch-preview-types";

function normalizePath(path: string): string {
  return path.replace(/\\/g, "/").toLowerCase();
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function riskSignalLevel(score: number): CodexForgePatchRiskLevel {
  return classifyPatchRisk(score);
}

function hasAny(value: string, hints: string[]): boolean {
  return hints.some((hint) => value.includes(hint));
}

export function scorePatchRisk(input: CodexForgePatchRiskInput): number {
  const path = normalizePath(input.filePath);
  const role = input.fileRole.toLowerCase();
  let score = 18;

  if (hasAny(path, ["/app/", "page.tsx", "route.ts"])) score += 14;
  if (hasAny(path, ["/components/", ".tsx"])) score += 8;
  if (hasAny(path, ["/runtime/", "/server/", "/api/"])) score += 18;
  if (hasAny(path, ["/scripts/", "smoke-"])) score += 10;
  if (hasAny(path, ["/tools/", "policy", "approval", "guard"])) score += 18;
  if (hasAny(path, ["/brain/", "memory", "ingestion"])) score += 14;
  if (hasAny(path, ["/capabilities/", "broker", "camera", "pc", "trading"])) score += 16;
  if (role.includes("route") || role.includes("runtime")) score += 8;
  if (role.includes("policy") || role.includes("safety")) score += 16;
  if ((input.relatedBrainMemoryCount ?? 0) >= 4) score += 6;
  if (!input.hasTestsOrSmokeScripts) score += 12;
  if (input.appearsSafetyCritical) score += 22;
  if (input.requiresApproval) score += 10;

  return clampScore(score);
}

export function classifyPatchRisk(score: number): CodexForgePatchRiskLevel {
  if (score >= 82) return "critical";
  if (score >= 62) return "high";
  if (score >= 38) return "medium";
  return "low";
}

export function buildPatchRiskBoard(
  input: CodexForgePatchRiskInput
): CodexForgePatchRiskBoard {
  const path = normalizePath(input.filePath);
  const score = scorePatchRisk(input);
  const level = classifyPatchRisk(score);
  const signals: CodexForgePatchRiskBoard["signals"] = [
    {
      id: "path-role",
      label: "Path and role",
      level: riskSignalLevel(
        scorePatchRisk({
          ...input,
          relatedBrainMemoryCount: 0,
          hasTestsOrSmokeScripts: true,
          appearsSafetyCritical: false,
          requiresApproval: false,
        })
      ),
      score: scorePatchRisk({
        ...input,
        relatedBrainMemoryCount: 0,
        hasTestsOrSmokeScripts: true,
        appearsSafetyCritical: false,
        requiresApproval: false,
      }),
      summary: `File role "${input.fileRole}" with route/component/runtime/smoke hints from ${input.filePath}.`,
    },
    {
      id: "brain-context",
      label: "Brain context",
      level: (input.relatedBrainMemoryCount ?? 0) >= 4 ? "medium" : "low",
      score: clampScore((input.relatedBrainMemoryCount ?? 0) * 12),
      summary: `${input.relatedBrainMemoryCount ?? 0} related Brain memories are attached to the preview context.`,
    },
    {
      id: "validation-coverage",
      label: "Validation coverage",
      level: input.hasTestsOrSmokeScripts ? "low" : "medium",
      score: input.hasTestsOrSmokeScripts ? 20 : 50,
      summary: input.hasTestsOrSmokeScripts
        ? "Related smoke or test scripts are available."
        : "No related smoke script was detected, so validation risk is higher.",
    },
    {
      id: "approval-safety",
      label: "Approval safety",
      level: input.appearsSafetyCritical || input.requiresApproval ? "high" : "low",
      score: input.appearsSafetyCritical ? 78 : input.requiresApproval ? 58 : 18,
      summary:
        input.appearsSafetyCritical || input.requiresApproval
          ? "Policy, broker, PC, camera, route, runtime, or approval-sensitive surface requires an approval boundary."
          : "No safety-critical capability hint detected for preview planning.",
    },
  ];

  return {
    filePath: input.filePath,
    level,
    score,
    signals,
    summary: summarizePatchRisk({ filePath: input.filePath, level, score, signals, summary: "" }),
  };
}

export function summarizePatchRisk(board: CodexForgePatchRiskBoard): string {
  const safetyHint = normalizePath(board.filePath).includes("policy")
    ? " Policy-sensitive file."
    : "";
  return `${board.level} patch-preview risk at ${board.score}/100 for ${board.filePath}.${safetyHint}`;
}
