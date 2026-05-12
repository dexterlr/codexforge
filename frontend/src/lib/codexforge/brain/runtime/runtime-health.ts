import {
  CODEXFORGE_BRAIN_RUNTIME_CANONICAL_SCHEMA_PATH,
  CODEXFORGE_BRAIN_RUNTIME_COGNITIVE_MEMORY_APIS,
  CODEXFORGE_BRAIN_RUNTIME_REQUIRED_APIS,
  getCodexForgeBrainRuntimeContract,
} from "./runtime-contract";
import type { CodexForgeBrainRuntimeContext } from "./runtime-types";
import { CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES } from "./runtime-types";

export type CodexForgeBrainRuntimeHealthReport = {
  version: string;
  ok: boolean;
  canonicalSchemaPath: string;
  requiredApis: readonly string[];
  cognitiveMemoryApis: readonly string[];
  cognitiveMemoryReady: boolean;
  eventTypes: readonly string[];
  forbiddenImports: readonly string[];
  warnings: readonly string[];
  risks: readonly string[];
  nextSafeSteps: readonly string[];
};

export type CodexForgeBrainRuntimeHealthInput = {
  apiMap?: Record<string, unknown>;
  context?: Pick<
    CodexForgeBrainRuntimeContext,
    | "cognitiveMemory"
    | "contradictionCandidates"
    | "memoryClusters"
    | "memorySummary"
  >;
};

function includesAll(
  values: readonly string[],
  requiredValues: readonly string[]
): boolean {
  return requiredValues.every((value) => values.includes(value));
}

function hasDuplicates(values: readonly string[]): boolean {
  return new Set(values).size !== values.length;
}

export function evaluateBrainRuntimeHealth(
  input: CodexForgeBrainRuntimeHealthInput = {}
): CodexForgeBrainRuntimeHealthReport {
  const contract = getCodexForgeBrainRuntimeContract();
  const warnings: string[] = [];
  const risks: string[] = [];
  let cognitiveMemoryApisReady = includesAll(
    contract.cognitiveMemoryApis,
    CODEXFORGE_BRAIN_RUNTIME_COGNITIVE_MEMORY_APIS
  );

  if (
    contract.canonicalSchemaPath !==
    CODEXFORGE_BRAIN_RUNTIME_CANONICAL_SCHEMA_PATH
  ) {
    risks.push("Runtime contract points at a noncanonical graph schema path.");
  }

  if (!includesAll(contract.requiredApis, CODEXFORGE_BRAIN_RUNTIME_REQUIRED_APIS)) {
    risks.push("Runtime contract is missing one or more required runtime APIs.");
  }

  if (
    !includesAll(
      contract.cognitiveMemoryApis,
      CODEXFORGE_BRAIN_RUNTIME_COGNITIVE_MEMORY_APIS
    )
  ) {
    risks.push("Runtime contract is missing one or more cognitive memory APIs.");
  }

  if (input.apiMap) {
    const missingMemoryApis = CODEXFORGE_BRAIN_RUNTIME_COGNITIVE_MEMORY_APIS.filter(
      (apiName) => typeof input.apiMap?.[apiName] !== "function"
    );

    if (missingMemoryApis.length > 0) {
      cognitiveMemoryApisReady = false;
      risks.push(
        `Runtime API map is missing cognitive memory APIs: ${missingMemoryApis
          .sort((a, b) => a.localeCompare(b))
          .join(", ")}.`
      );
    }
  }

  if (!includesAll(contract.eventTypes, CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES)) {
    risks.push("Runtime contract event types do not match runtime event architecture.");
  }

  if (!contract.forbiddenImports.some((value) => value.includes("brain-graph"))) {
    risks.push("Runtime contract does not block legacy graph imports.");
  }

  if (hasDuplicates(contract.requiredApis)) {
    warnings.push("Runtime contract lists duplicate required APIs.");
  }

  if (hasDuplicates(contract.eventTypes)) {
    warnings.push("Runtime contract lists duplicate event types.");
  }

  if (contract.nextSafeSteps.length === 0) {
    warnings.push("Runtime contract has no next safe steps.");
  }

  if (input.context) {
    const memorySummary = input.context.memorySummary;
    const cognitiveMemoryCount = input.context.cognitiveMemory?.length ?? 0;
    const contradictionCount = input.context.contradictionCandidates?.length ?? 0;
    const duplicateClusterCount = memorySummary?.duplicateClusterCount ?? 0;

    if ((memorySummary?.candidateCount ?? cognitiveMemoryCount) === 0) {
      warnings.push("Runtime context has no cognitive memory signals.");
    }

    if (contradictionCount > 0) {
      risks.push(
        `Runtime context has ${contradictionCount} cognitive memory contradiction candidates.`
      );
    }

    if (memorySummary?.archivedDominatesContext) {
      warnings.push("Archived or stale memory dominates cognitive context.");
    }

    if (duplicateClusterCount > 0) {
      warnings.push(
        `Runtime context has ${duplicateClusterCount} duplicate memory clusters.`
      );
    }
  }

  return {
    version: contract.version,
    ok: warnings.length === 0 && risks.length === 0,
    canonicalSchemaPath: contract.canonicalSchemaPath,
    requiredApis: contract.requiredApis,
    cognitiveMemoryApis: contract.cognitiveMemoryApis,
    cognitiveMemoryReady:
      cognitiveMemoryApisReady &&
      warnings.every((warning) => !warning.includes("no cognitive memory signals")),
    eventTypes: contract.eventTypes,
    forbiddenImports: contract.forbiddenImports,
    warnings,
    risks,
    nextSafeSteps: contract.nextSafeSteps,
  };
}

export function summarizeBrainRuntimeHealth(
  report: CodexForgeBrainRuntimeHealthReport = evaluateBrainRuntimeHealth()
): string {
  const status = report.ok ? "ok" : "attention required";
  const issueCount = report.warnings.length + report.risks.length;
  const issueText =
    issueCount === 0
      ? "no warnings or risks"
      : `${report.risks.length} risks and ${report.warnings.length} warnings`;

  return [
    `Brain runtime ${report.version}: ${status}.`,
    `Canonical schema: ${report.canonicalSchemaPath}.`,
    `Required APIs: ${report.requiredApis.join(", ")}.`,
    `Cognitive memory: ${report.cognitiveMemoryReady ? "ready" : "attention required"}.`,
    `Events: ${report.eventTypes.length}.`,
    `Health findings: ${issueText}.`,
    report.nextSafeSteps[0] ? `Next safe step: ${report.nextSafeSteps[0]}` : "",
  ]
    .filter(Boolean)
    .join(" ");
}
