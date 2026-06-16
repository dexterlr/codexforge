import type { FirstControlledLaunchPlan, FirstControlledLaunchPlanBoundary, FirstControlledLaunchPlanModel } from "./first-controlled-launch-plan-types";
import { buildFirstControlledLaunchPlanStableKey } from "./first-controlled-launch-plan-types";

export const FIRST_CONTROLLED_LAUNCH_PLAN_LANGUAGE = [
  "First controlled launch plan",
  "First controlled launch plan does not execute launch",
  "Controlled launch actions require explicit operator approval",
  "Unapproved controlled launch paths remain blocked",
  "Launch stage groups",
  "Boundary approval checklist",
] as const;

const FIRST_CONTROLLED_LAUNCH_PLAN_SAFETY_DETAILS = [
  "no controlled launch execution",
  "no Daily Beta 1 launch execution",
  "no provider API calls",
  "no local model calls",
  "no connector API calls",
  "no automation creation",
  "no launch approval automation",
  "no go/no-go auto-pass",
  "no approval packet send behavior",
  "no rollback trigger",
  "no monitoring job creation",
  "no support runbook publish/send behavior",
  "no Minecraft/project/server build execution yet",
  "no copyrighted franchise asset/name/logo/map/dialogue/music copying",
  "actual server/build/project execution still requires approved execution boundaries",
] as const;

export function buildFirstControlledLaunchPlan(input: Omit<FirstControlledLaunchPlan, "id"> & { idHint: string }): FirstControlledLaunchPlan {
  const { idHint, ...firstControlledLaunchPlan } = input;
  return { id: buildFirstControlledLaunchPlanStableKey("first-controlled-launch-plan", idHint, input.status), ...firstControlledLaunchPlan };
}

export function buildFirstControlledLaunchPlans(): FirstControlledLaunchPlan[] {
  return [
    buildFirstControlledLaunchPlan({
      idHint: "daily-beta-1-first-controlled-launch-plan",
      status: "blocked",
      firstControlledLaunchPlanIdentity: "First controlled launch plan identity: daily-beta-1-first-controlled-launch-plan plans the first controlled launch without executing it.",
      launchStageGroups: [
        "Launch stage groups: pre-launch boundary review, operator task review, rollback/monitoring review, evidence/result/recovery review, controlled launch review route, controlled launch evidence route, and next recommended action.",
        "Launch stage groups stay planning-only; this page does not execute launch, run commands, call providers, call local models, call connectors, create automations, or mutate files.",
      ],
      operatorTaskChecklist: [
        "Operator task checklist: operator approval, owner assignment, communication plan, support owner, rollback owner, monitoring owner, evidence owner, and final hold point must be explicit.",
        "Operator task checklist does not create reminders, schedules, conditional watches, notifications, background jobs, or automations.",
      ],
      boundaryApprovalChecklist: [
        "Boundary approval checklist: provider, local model, connector, automation, file/test/project execution, shell, git, build, smoke, evidence, output, credential, memory, rollback, monitoring, and support boundaries must be approved before execution.",
        "Boundary approval checklist is honest that actual server/build/project execution still requires approved execution boundaries.",
      ],
      rollbackMonitoringChecklist: [
        "Rollback/monitoring checklist: rollback actions and monitoring setup remain review-only and require explicit operator approval.",
        "Rollback/monitoring checklist confirms no rollback trigger, no monitoring job creation, no polling loop creation, and no notification sending from UI.",
      ],
      evidenceResultRecoveryChecklist: [
        "Evidence/result/recovery checklist: evidence capture, result acceptance, output storage, audit retention, recovery triggers, and hardening actions stay blocked until approved implementations exist.",
        "Evidence/result/recovery checklist does not store provider/model/connector outputs, ingest evidence automatically, or mutate memory.",
      ],
      deniedLaunchPlanActions: [
        "Denied launch plan actions: execute launch, launch Daily Beta 1, call providers, call local models, call connectors, create automations, execute workflows, run commands, run tests, mutate files, apply patches, trigger rollback, start monitoring jobs, send notifications, publish support runbooks, store credentials, store outputs, or auto-promote memory.",
      ],
      unresolvedLaunchPlanBlockers: [
        "Unresolved launch plan blockers stay blocked: missing go/no-go approval, missing launch boundary approval, missing approval packet approval, missing rollback approval, missing monitoring approval, missing support approval, and missing approved execution boundaries.",
      ],
      controlledLaunchReviewRoute: "Controlled launch review route: /end-to-end-controlled-rollout-review reviews controlled rollout decisions without executing rollout.",
      controlledLaunchEvidenceRoute: "Controlled launch evidence route: /end-to-end-workflow-evidence-review reviews evidence without ingesting or storing it automatically.",
      nextRecommendedAction: "Next recommended action: keep first controlled launch execution blocked, resolve launch plan blockers, then request explicit operator approval only after bounded execution boundaries are proven.",
      advancedFirstControlledLaunchPlanDetails: `Advanced first controlled launch plan details: ${FIRST_CONTROLLED_LAUNCH_PLAN_SAFETY_DETAILS.join("; ")}; no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation/launch data sending without approval.`,
    }),
  ];
}

export function buildFirstControlledLaunchPlanBoundary(): FirstControlledLaunchPlanBoundary {
  return { reviewOnly: true, approvalRequired: true, controlledLaunchExecutionAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, fileMutationAllowedFromUi: false, commandExecutionAllowedFromUi: false, credentialStorageAllowed: false, outputStorageAllowed: false };
}

export function summarizeFirstControlledLaunchPlan(model: Pick<FirstControlledLaunchPlanModel, "firstControlledLaunchPlans">): string {
  return "First controlled launch plan reviews " + model.firstControlledLaunchPlans.length + " controlled launch plan without executing launch. Controlled launch actions require explicit operator approval, and unapproved controlled launch paths remain blocked.";
}

export function buildFirstControlledLaunchPlanModel(): FirstControlledLaunchPlanModel {
  const firstControlledLaunchPlans = buildFirstControlledLaunchPlans();
  const model: FirstControlledLaunchPlanModel = {
    title: "First controlled launch plan",
    summary: "",
    firstControlledLaunchPlans,
    boundary: buildFirstControlledLaunchPlanBoundary(),
    language: [...FIRST_CONTROLLED_LAUNCH_PLAN_LANGUAGE],
    advancedDetails: [
      "First controlled launch plan",
      "First controlled launch plan identity",
      "Launch stage groups",
      "Operator task checklist",
      "Boundary approval checklist",
      "Rollback monitoring checklist",
      "Evidence result recovery checklist",
      "Denied launch plan actions",
      "Unresolved launch plan blockers",
      "Controlled launch review route",
      "Controlled launch evidence route",
      "Next recommended action",
      "First controlled launch plan does not execute launch",
      "Controlled launch actions require explicit operator approval",
      "Unapproved controlled launch paths remain blocked",
      "advanced first controlled launch plan details collapsed/secondary",
      ...FIRST_CONTROLLED_LAUNCH_PLAN_SAFETY_DETAILS,
    ],
  };
  return { ...model, summary: summarizeFirstControlledLaunchPlan(model) };
}
