import {
  buildRuntimeHealthDashboard,
  buildRuntimeHealthSignal,
} from "./health-dashboard";
import {
  buildRuntimeSafetyPosture,
} from "./safety-posture";
import {
  buildSmokeCoverageMap,
} from "./smoke-coverage";
import type {
  CodexForgeRuntimeHealthDashboard,
  CodexForgeRuntimeHealthSignal,
  CodexForgeRuntimeSafetyPosture,
  CodexForgeRuntimeSmokeCoverageItem,
  CodexForgeRuntimeSubsystemReadiness,
} from "./health-types";

export const CODEXFORGE_RUNTIME_HEALTH_FIXTURE_TS = 1735689600000;

export function buildRuntimeHealthFixtureSignals(): CodexForgeRuntimeHealthSignal[] {
  return [
    buildRuntimeHealthSignal({
      id: "fixture:ready-runtime",
      title: "Runtime contract available",
      detail: "Required runtime APIs are represented in the deterministic contract.",
      severity: "info",
      status: "ready",
      source: "fixture",
      relatedSubsystem: "graph-runtime",
      evidence: ["appendEvent", "reduceGraph", "assembleContext"],
      reasons: ["ready runtime subsystem"],
    }),
    buildRuntimeHealthSignal({
      id: "fixture:degraded-context",
      title: "Context readiness degraded",
      detail: "Context should be inspected before routing work into agents.",
      severity: "high",
      status: "degraded",
      source: "fixture",
      relatedSubsystem: "context-assembler",
      evidence: ["predictive-context:partial"],
      reasons: ["degraded context subsystem"],
    }),
    buildRuntimeHealthSignal({
      id: "fixture:approval-boundary",
      title: "Approval boundary blocks action",
      detail: "Mutation, command, render, and external actions require explicit approval.",
      severity: "critical",
      status: "blocked",
      source: "fixture",
      relatedSubsystem: "approval-boundary",
      evidence: ["blocked approval boundary example"],
      reasons: ["approval-required next action"],
      nextSafeAction: {
        id: "fixture:approval-boundary:inspect",
        label: "Inspect boundary",
        detail: "Read the approval boundary before requesting any repair action.",
        readOnly: true,
        approvalRequired: false,
      },
    }),
  ];
}

export function buildRuntimeHealthFixtureSubsystems(): CodexForgeRuntimeSubsystemReadiness[] {
  return [
    {
      id: "graph-runtime",
      label: "Graph runtime",
      status: "ready",
      readinessScore: 1,
      severity: "info",
      reasons: ["ready runtime subsystem"],
      evidence: ["canonical graph runtime contract"],
      source: "fixture",
      nextSafeAction: {
        id: "fixture:graph-runtime:inspect",
        label: "Inspect graph contract",
        detail: "Review canonical graph contract and reducer boundary.",
        readOnly: true,
        approvalRequired: false,
      },
    },
    {
      id: "cognitive-memory",
      label: "Cognitive memory",
      status: "partial",
      readinessScore: 0.62,
      severity: "medium",
      reasons: ["partial memory subsystem"],
      evidence: ["memory clusters available; contradiction review pending"],
      source: "fixture",
      nextSafeAction: {
        id: "fixture:cognitive-memory:inspect",
        label: "Inspect memory evidence",
        detail: "Review ranked memory and contradiction candidates.",
        readOnly: true,
        approvalRequired: false,
      },
    },
    {
      id: "context-assembler",
      label: "Context assembler",
      status: "degraded",
      readinessScore: 0.4,
      severity: "high",
      reasons: ["degraded context subsystem"],
      evidence: ["stale predictive context warning"],
      source: "fixture",
      nextSafeAction: {
        id: "fixture:context-assembler:inspect",
        label: "Inspect context",
        detail: "Read stale context evidence before routing work.",
        readOnly: true,
        approvalRequired: false,
      },
    },
    {
      id: "approval-boundary",
      label: "Approval boundary",
      status: "blocked",
      readinessScore: 0,
      severity: "critical",
      reasons: ["blocked approval boundary example"],
      evidence: ["approval-required repair action is not executable here"],
      source: "fixture",
      nextSafeAction: {
        id: "fixture:approval-boundary:request",
        label: "Request explicit approval",
        detail: "Repair would require approval outside this read-only dashboard.",
        readOnly: false,
        approvalRequired: true,
        blocked: true,
      },
    },
  ];
}

export function buildRuntimeHealthFixtureSmokeCoverage(): CodexForgeRuntimeSmokeCoverageItem[] {
  return buildSmokeCoverageMap([
    {
      id: "brain-runtime",
      label: "Brain runtime",
      present: true,
      coverageLevel: 1,
      reason: "smoke coverage present",
      evidence: ["smoke-codexforge-brain-runtime.ps1"],
    },
    {
      id: "brain-recommendations",
      label: "Brain recommendations",
      present: true,
      coverageLevel: 1,
      reason: "smoke coverage present",
      evidence: ["smoke-codexforge-brain-recommendations.ps1"],
    },
    {
      id: "tool-policy",
      label: "Tool policy",
      present: false,
      coverageLevel: 0,
      reason: "smoke coverage missing",
      evidence: ["descriptor missing"],
    },
  ]);
}

export function buildRuntimeHealthFixtureSafetyPosture(): CodexForgeRuntimeSafetyPosture {
  return buildRuntimeSafetyPosture({
    generatedAt: CODEXFORGE_RUNTIME_HEALTH_FIXTURE_TS,
    recommendations: [
      {
        id: "fixture-recommendation-read-only",
        kind: "stabilize-runtime",
        title: "Inspect runtime health",
        summary: "read-only next action",
        whyItMatters: "Health repair should start with evidence.",
        severity: "medium",
        status: "recommended",
        confidence: 1,
        score: 0.8,
        createdAt: CODEXFORGE_RUNTIME_HEALTH_FIXTURE_TS,
        updatedAt: CODEXFORGE_RUNTIME_HEALTH_FIXTURE_TS,
        reasons: ["read-only next action"],
        evidence: [],
        relatedNodeIds: [],
        relatedFilePaths: [],
        sourceRefs: [],
        nextSafeAction: {
          id: "fixture:read-only-action",
          label: "Inspect evidence",
          description: "Review fixture health evidence.",
          safety: "read-only",
          approvalRequired: false,
          readOnly: true,
        },
      },
      {
        id: "fixture-recommendation-approval",
        kind: "protect-approval-boundary",
        title: "Approval required repair",
        summary: "approval-required next action",
        whyItMatters: "Mutation cannot happen from the dashboard.",
        severity: "high",
        status: "blocked",
        confidence: 1,
        score: 0.9,
        createdAt: CODEXFORGE_RUNTIME_HEALTH_FIXTURE_TS,
        updatedAt: CODEXFORGE_RUNTIME_HEALTH_FIXTURE_TS,
        reasons: ["safety posture warning"],
        evidence: [],
        relatedNodeIds: [],
        relatedFilePaths: [],
        sourceRefs: [],
        nextSafeAction: {
          id: "fixture:approval-required-action",
          label: "Request approval",
          description: "Approval is required outside this dashboard.",
          safety: "approval-required",
          approvalRequired: true,
          readOnly: false,
        },
      },
    ],
  });
}

export function buildRuntimeHealthFixtureDashboard(): CodexForgeRuntimeHealthDashboard {
  return buildRuntimeHealthDashboard({
    generatedAt: CODEXFORGE_RUNTIME_HEALTH_FIXTURE_TS,
    memoryReadiness: {
      status: "partial",
      score: 0.62,
      evidence: ["partial memory subsystem"],
    },
    contextReadiness: {
      status: "degraded",
      score: 0.4,
      evidence: ["degraded context subsystem"],
    },
    smokeCoverageDescriptors: [
      { id: "brain-runtime", present: true, coverageLevel: 1, reason: "smoke coverage present" },
      { id: "brain-recommendations", present: true, coverageLevel: 1, reason: "smoke coverage present" },
      { id: "tool-policy", present: false, coverageLevel: 0, reason: "smoke coverage missing" },
    ],
    subsystemOverrides: buildRuntimeHealthFixtureSubsystems(),
  });
}
