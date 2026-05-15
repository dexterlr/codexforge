import {
  type ExecutionReadinessInput,
  type ExecutionRiskFactor,
  type ExecutionRiskFactorId,
  type ExecutionRiskReadiness,
  type ExecutionRiskStatus,
} from "./execution-readiness-types";

const RISK_SCORE: Record<ExecutionRiskStatus, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};

function includesAny(value: string, needles: string[]): boolean {
  return needles.some((needle) => value.includes(needle));
}

function pathText(input: ExecutionReadinessInput): string {
  return input.impactedFiles.join(" ").toLowerCase();
}

function noteText(input: ExecutionReadinessInput): string {
  return input.riskNotes.join(" ").toLowerCase();
}

function buildFactor(
  id: ExecutionRiskFactorId,
  label: string,
  active: boolean,
  activeStatus: ExecutionRiskStatus,
  activeDetail: string,
  inactiveDetail: string
): ExecutionRiskFactor {
  return {
    id,
    label,
    status: active ? activeStatus : "low",
    detail: active ? activeDetail : inactiveDetail,
  };
}

function buildRiskFactors(input: ExecutionReadinessInput): ExecutionRiskFactor[] {
  const paths = pathText(input);
  const notes = noteText(input);
  const broadImpact =
    input.impactedFiles.length > 5 ||
    input.steps.length > 8 ||
    input.taskDomain === "automation";

  return [
    buildFactor(
      "safety-critical-file",
      "Safety-critical file",
      includesAny(paths, ["auth", "security", "permission", "policy", ".env", "secret", "payment", "safety"]),
      "critical",
      "Impacted files include safety, policy, auth, secret, or payment-sensitive paths.",
      "No safety-critical file pattern detected."
    ),
    buildFactor(
      "route-api-file",
      "Route/API file",
      includesAny(paths, ["src/app", "/api/", "\\api\\", "route.ts", "page.tsx"]),
      "high",
      "Impacted files include route, page, or API surfaces.",
      "No route/API file pattern detected."
    ),
    buildFactor(
      "graph-runtime-file",
      "Graph/runtime file",
      includesAny(paths, ["brain", "graph", "runtime", "local-bridge", "operator"]),
      "high",
      "Impacted files include graph, runtime, bridge, or operator surfaces.",
      "No graph/runtime file pattern detected."
    ),
    buildFactor(
      "memory-merge-file",
      "Memory/merge file",
      includesAny(paths, ["memory", "merge", "recall"]),
      "high",
      "Impacted files include memory, recall, or merge surfaces.",
      "No memory/merge file pattern detected."
    ),
    buildFactor(
      "tool-policy-file",
      "Tool policy file",
      includesAny(paths, ["tool-policy", "tool-policy-guard", "tool-policy-visibility"]),
      "critical",
      "Impacted files include tool policy guards or visibility.",
      "No tool policy file pattern detected."
    ),
    buildFactor(
      "smoke-script-touched",
      "Smoke script touched",
      includesAny(paths, ["scripts/smoke", "scripts\\smoke"]),
      "medium",
      "Impacted files include smoke scripts; smoke coverage must be reviewed.",
      "No smoke script path detected."
    ),
    buildFactor(
      "missing-test-plan",
      "Missing test plan",
      input.suggestedTests.length === 0,
      "high",
      "No suggested tests were provided for readiness review.",
      "Suggested tests are present."
    ),
    buildFactor(
      "stale-memory-context",
      "Stale memory context",
      includesAny(notes, ["stale", "outdated", "old memory"]) ||
        (input.relatedMemories.length === 0 && input.taskGoal.toLowerCase().includes("memory")),
      "medium",
      "Risk notes or missing memory context indicate stale memory risk.",
      "No stale memory context signal detected."
    ),
    buildFactor(
      "unresolved-contradiction",
      "Unresolved contradiction",
      includesAny(notes, ["contradiction", "conflict", "disagree", "unresolved"]),
      "high",
      "Risk notes include unresolved contradiction or conflict.",
      "No unresolved contradiction signal detected."
    ),
    buildFactor(
      "broad-impact",
      "Broad impact",
      broadImpact,
      "high",
      "Impacted files, steps, or domain indicate broad impact.",
      "Impact stays narrow enough for normal review."
    ),
  ];
}

export function classifyExecutionRiskReadiness(
  inputOrFactors: ExecutionReadinessInput | ExecutionRiskFactor[]
): ExecutionRiskStatus {
  const factors = Array.isArray(inputOrFactors)
    ? inputOrFactors
    : buildRiskFactors(inputOrFactors);
  const maxScore = Math.max(...factors.map((factor) => RISK_SCORE[factor.status]), 1);
  const highOrCriticalCount = factors.filter(
    (factor) => factor.status === "high" || factor.status === "critical"
  ).length;

  if (maxScore >= RISK_SCORE.critical) return "critical";
  if (highOrCriticalCount >= 2) return "critical";
  if (maxScore >= RISK_SCORE.high) return "high";
  if (maxScore >= RISK_SCORE.medium) return "medium";
  return "low";
}

export function buildExecutionRiskReadiness(
  input: ExecutionReadinessInput
): ExecutionRiskReadiness {
  const factors = buildRiskFactors(input);
  const status = classifyExecutionRiskReadiness(factors);
  const draft: ExecutionRiskReadiness = {
    id: "execution-risk-readiness",
    inputId: input.id,
    status,
    factors,
    summary: [],
  };

  return {
    ...draft,
    summary: summarizeExecutionRiskReadiness(draft),
  };
}

export function summarizeExecutionRiskReadiness(
  readiness: ExecutionRiskReadiness
): string[] {
  const active = readiness.factors.filter((factor) => factor.status !== "low");

  return [
    `Execution risk readiness is ${readiness.status}.`,
    `${active.length} risk factors require review before future execution approval.`,
    "Risk scoring is deterministic and uses only local input fields.",
  ];
}
