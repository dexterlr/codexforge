import type { FirstControlledLaunchHardening, FirstControlledLaunchHardeningBoundary, FirstControlledLaunchHardeningModel } from "./first-controlled-launch-hardening-types";
import { buildFirstControlledLaunchHardeningStableKey } from "./first-controlled-launch-hardening-types";

export const FIRST_CONTROLLED_LAUNCH_HARDENING_LANGUAGE = [
  "First controlled launch hardening",
  "First controlled launch hardening does not apply changes",
  "Controlled launch hardening changes require explicit operator approval",
  "Unresolved controlled launch hardening blockers stay blocked",
  "Hardening groups",
  "Boundary readiness status",
] as const;

const FIRST_CONTROLLED_LAUNCH_HARDENING_SAFETY_DETAILS = [
  "no hardening apply behavior",
  "no patch apply behavior",
  "no workflow execution",
  "no file mutation",
  "no file write",
  "no memory mutation",
  "no controlled launch execution",
  "no Daily Beta 1 launch execution",
  "no launch approval automation",
  "no launch readiness lock automation",
  "no go-live behavior",
  "no evidence ingestion",
  "no result persistence",
  "no recovery trigger",
  "no handoff send behavior",
  "no provider API calls",
  "no provider traffic routing",
  "no prompt sending to providers",
  "no provider output persistence",
  "no local model calls",
  "no local bridge endpoint calls",
  "no connector API calls",
  "no connector data fetch",
  "no connector data persistence",
  "no automation execution",
  "no automation creation",
  "no reminder creation",
  "no task scheduling",
  "no schedule creation",
  "no conditional watch creation",
  "no polling loop creation",
  "no background job creation",
  "no notification sending",
  "no approval automation",
  "no approval decision persistence",
  "no policy auto-apply",
  "no settings persistence",
  "no preference persistence",
  "no file deletion",
  "no export/write behavior",
  "no command execution",
  "no shell/git/test/build/smoke execution from UI",
  "no creative asset generation",
  "no research execution",
  "no coding workflow execution",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no Minecraft/project/server build execution yet",
  "no copyrighted franchise asset/name/logo/map/dialogue/music copying",
  "actual project/server building still requires approved file, command, local runtime, package, and deployment execution boundaries",
  "actual server/build/project execution still requires approved execution boundaries",
  "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation/launch data sending without approval",
  "no arbitrary project scanning",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open from UI",
  "no auto-open local files",
  "no memory/RAG ingestion",
  "no memory auto-promotion",
  "no Brain graph mutation",
  "no appendEvent/saveBrainGraph calls from UI",
  "no plugin execution",
  "no tool execution",
  "no agent execution",
  "no extension runtime executor",
  "no MCP runtime",
  "no MCP tool calls",
  "no localStorage API key storage",
  "no sessionStorage API key storage",
  "no token storage",
  "no endpoint storage",
  "no credential storage",
  "no output storage",
  "no connector data storage",
  "no automation data storage",
  "no process.env printing",
  "no API keys or secrets displayed",
  "no example real key/token/endpoint values",
  "no route coverage removal",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "checkpoint documentation smoke still exists and remains registered",
  "server-only path boundary markers remain intact",
  "no Math.random",
  "no Date.now",
  "no mojibake",
  "no obvious duplicate React key patterns",
] as const;

export function buildFirstControlledLaunchHardening(input: Omit<FirstControlledLaunchHardening, "id"> & { idHint: string }): FirstControlledLaunchHardening {
  const { idHint, ...controlledLaunchHardening } = input;
  return { id: buildFirstControlledLaunchHardeningStableKey("first-controlled-launch-hardening", idHint, input.status), ...controlledLaunchHardening };
}

export function buildFirstControlledLaunchHardenings(): FirstControlledLaunchHardening[] {
  return [
    buildFirstControlledLaunchHardening({
      idHint: "daily-beta-1-first-controlled-launch-hardening",
      status: "blocked",
      controlledLaunchHardeningIdentity: "Controlled launch hardening identity: daily-beta-1-first-controlled-launch-hardening reviews hardening needs without applying changes.",
      hardeningGroups: [
        "Hardening groups: launch review status, evidence/result/recovery status, boundary readiness status, operator readiness checklist, denied hardening actions, unresolved hardening blockers, controlled launch candidate route, controlled launch handoff route, and next recommended action.",
        "Hardening groups stay review-only; this page does not apply changes, apply patches, execute workflows, mutate files, mutate memory, call providers, call local models, call connectors, or create automations.",
      ],
      launchReviewStatus: [
        "Launch review status: controlled launch review remains blocked until boundary approvals, operator decision review, rollback/monitoring review, evidence review, result review, and recovery review are complete.",
      ],
      evidenceResultRecoveryStatus: [
        "Evidence/result/recovery status: evidence is not ingested, results are not stored, and recovery is not triggered from this UI.",
      ],
      boundaryReadinessStatus: [
        "Boundary readiness status: provider, local model, connector, automation, file/test/project execution, shell, git, build, smoke, local runtime, package, deployment, credential, output, and memory boundaries remain approval-gated.",
        "Boundary readiness status is honest that actual project/server building still requires approved file, command, local runtime, package, and deployment execution boundaries.",
      ],
      operatorReadinessChecklist: [
        "Operator readiness checklist: hardening owner, launch owner, rollback owner, monitoring owner, support owner, evidence owner, result owner, and final decision owner must be explicit before any hardening work exists.",
      ],
      deniedHardeningActions: [
        "Denied hardening actions: apply changes, apply patches, mutate files, mutate memory, execute workflows, run commands, run tests, launch Daily Beta 1, approve launch, trigger recovery, lock readiness, send handoff, call providers, call local models, call connectors, create automations, store outputs, or store credentials.",
      ],
      unresolvedHardeningBlockers: [
        "Unresolved controlled launch hardening blockers stay blocked: missing hardening owner, missing evidence review, missing result review, missing recovery review, missing boundary approval, missing operator decision, and missing approved execution boundaries.",
      ],
      controlledLaunchCandidateRoute: "Controlled launch candidate route: /daily-beta-1-controlled-launch-candidate summarizes controlled launch readiness without going live.",
      controlledLaunchHandoffRoute: "Controlled launch handoff route: /daily-beta-1-controlled-launch-handoff packages handoff guidance without sending it.",
      nextRecommendedAction: "Next recommended action: keep hardening changes unapplied, review the controlled launch candidate, then prepare handoff guidance only after blockers are cleared.",
      advancedFirstControlledLaunchHardeningDetails: `Advanced first controlled launch hardening details: ${FIRST_CONTROLLED_LAUNCH_HARDENING_SAFETY_DETAILS.join("; ")}.`,
    }),
  ];
}

export function buildFirstControlledLaunchHardeningBoundary(): FirstControlledLaunchHardeningBoundary {
  return { reviewOnly: true, approvalRequired: true, hardeningApplyAllowedFromUi: false, patchApplyAllowedFromUi: false, workflowExecutionAllowedFromUi: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, credentialStorageAllowed: false, outputStorageAllowed: false };
}

export function summarizeFirstControlledLaunchHardening(model: Pick<FirstControlledLaunchHardeningModel, "firstControlledLaunchHardenings">): string {
  return "First controlled launch hardening reviews " + model.firstControlledLaunchHardenings.length + " hardening packet without applying changes. Controlled launch hardening changes require explicit operator approval, and unresolved controlled launch hardening blockers stay blocked.";
}

export function buildFirstControlledLaunchHardeningModel(): FirstControlledLaunchHardeningModel {
  const firstControlledLaunchHardenings = buildFirstControlledLaunchHardenings();
  const model: FirstControlledLaunchHardeningModel = {
    title: "First controlled launch hardening",
    summary: "",
    firstControlledLaunchHardenings,
    boundary: buildFirstControlledLaunchHardeningBoundary(),
    language: [...FIRST_CONTROLLED_LAUNCH_HARDENING_LANGUAGE],
    advancedDetails: [
      "First controlled launch hardening",
      "Controlled launch hardening identity",
      "Hardening groups",
      "Launch review status",
      "Evidence/result/recovery status",
      "Boundary readiness status",
      "Operator readiness checklist",
      "Denied hardening actions",
      "Unresolved hardening blockers",
      "Controlled launch candidate route",
      "Controlled launch handoff route",
      "Next recommended action",
      "First controlled launch hardening does not apply changes",
      "Controlled launch hardening changes require explicit operator approval",
      "Unresolved controlled launch hardening blockers stay blocked",
      "advanced first controlled launch hardening details collapsed/secondary",
      ...FIRST_CONTROLLED_LAUNCH_HARDENING_SAFETY_DETAILS,
    ],
  };
  return { ...model, summary: summarizeFirstControlledLaunchHardening(model) };
}
