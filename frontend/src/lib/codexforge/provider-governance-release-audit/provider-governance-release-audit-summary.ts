import type {
  ProviderGovernanceReleaseAudit,
  ProviderGovernanceReleaseAuditBoundary,
  ProviderGovernanceReleaseAuditModel,
} from "./provider-governance-release-audit-types";
import { buildProviderGovernanceReleaseAuditStableKey } from "./provider-governance-release-audit-types";

export const PROVIDER_GOVERNANCE_RELEASE_AUDIT_LANGUAGE = [
  "Provider governance release audit",
  "Release audit does not deploy anything",
  "Secrets are not inspected or displayed",
  "Release decision",
  "Ready with fixes",
  "Known gaps",
] as const;

export function buildProviderGovernanceReleaseAudit(
  input: Omit<ProviderGovernanceReleaseAudit, "id"> & { idHint: string }
): ProviderGovernanceReleaseAudit {
  const { idHint, ...audit } = input;
  return {
    id: buildProviderGovernanceReleaseAuditStableKey(
      "provider-governance-release-audit",
      idHint,
      input.releaseDecision
    ),
    ...audit,
  };
}

export function buildProviderGovernanceReleaseAudits(): ProviderGovernanceReleaseAudit[] {
  return [
    buildProviderGovernanceReleaseAudit({
      idHint: "provider-governance-demo-readiness",
      auditIdentity:
        "Audit identity: provider governance demo readiness audit for policy bundle, runbook generator, router dry run, and release handoff.",
      coveredGovernanceSurfaces: [
        "Provider budget guardrails",
        "Prompt privacy classifier",
        "Provider audit log viewer",
        "Provider settings review",
        "Provider policy bundle",
        "Provider runbook generator",
        "Local-first router dry run",
      ],
      routeReadiness:
        "Route readiness: routes are expected to render inside the unified shell with no duplicate route chip cloud.",
      smokeReadiness:
        "Smoke readiness: each governance surface has a focused smoke script and all-smoke coverage entry.",
      privacyReadiness:
        "Privacy readiness: prompts, files, secrets, and raw sensitive content are never sent or displayed automatically.",
      budgetReadiness:
        "Budget readiness: no tokens are spent automatically and cloud spend remains approval-gated.",
      auditLogReadiness:
        "Audit-log readiness: audit views stay redacted and do not mutate logs or append events from UI.",
      runbookReadiness:
        "Runbook readiness: runbooks are manual-only, exclude secrets, and do not execute commands.",
      knownGaps: [
        "Future live provider tests still need explicit approval",
        "Future settings apply remains outside this review-only page",
        "Future router policy apply remains separate and approval-gated",
      ],
      releaseDecision: "ready-with-fixes",
      releaseDecisionLabel:
        "Release decision: Ready with fixes for a demo after smoke scripts pass and remaining live-test gaps stay documented.",
      handoffSummary:
        "Handoff summary: release audit does not deploy anything; copy the readiness summary and known gaps into the operator demo packet.",
      advancedAuditDetails:
        "Advanced audit details: this audit checks readiness labels only and does not inspect secrets, call provider APIs, mutate provider registry, auto-route traffic, or deploy.",
    }),
    buildProviderGovernanceReleaseAudit({
      idHint: "blocked-live-provider-release",
      auditIdentity:
        "Audit identity: blocked live provider release audit for any request that expects automatic provider execution.",
      coveredGovernanceSurfaces: [
        "Live-test gate",
        "Budget guardrails",
        "Privacy classifier",
        "Failure recovery",
        "Audit log viewer",
      ],
      routeReadiness:
        "Route readiness: review routes may be ready while live provider execution remains intentionally blocked.",
      smokeReadiness:
        "Smoke readiness: smoke scripts must pass before demo handoff and must not run provider tests automatically.",
      privacyReadiness:
        "Privacy readiness: blocked if raw prompts, files, logs, API keys, or environment values are requested in UI.",
      budgetReadiness:
        "Budget readiness: blocked if a request would auto-spend tokens or route paid traffic without approval.",
      auditLogReadiness:
        "Audit-log readiness: blocked if an audit view attempts to expose secrets or mutate logs.",
      runbookReadiness:
        "Runbook readiness: blocked if commands are executable instead of manual-only notes.",
      knownGaps: [
        "No approved gated live test in this phase",
        "No automated deployment path in this phase",
        "No automatic router policy apply in this phase",
      ],
      releaseDecision: "blocked",
      releaseDecisionLabel:
        "Release decision: blocked for automatic live provider execution until an approved future phase introduces a gated live test.",
      handoffSummary:
        "Handoff summary: keep the release blocked for live execution; use review-only surfaces for demo readiness.",
      advancedAuditDetails:
        "Advanced audit details: provider governance release audit is a readiness page, not a deployment step or enforcement engine.",
    }),
  ];
}

export function buildProviderGovernanceReleaseAuditBoundary(): ProviderGovernanceReleaseAuditBoundary {
  return {
    releaseDeploymentAllowedFromUi: false,
    secretsInspectionAllowedFromUi: false,
    secretsDisplayedAllowed: false,
    providerApiCallsAllowedFromUi: false,
    providerRegistryMutationAllowed: false,
    automaticProviderSendAllowed: false,
    automaticRoutingAllowed: false,
    tokenSpendAllowedFromUi: false,
    settingsAutoExportAllowed: false,
    settingsAutoImportAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    arbitraryFileBrowsingAllowed: false,
    shellCommandExecutionAllowedFromUi: false,
  };
}

export function summarizeProviderGovernanceReleaseAudit(
  model: Pick<ProviderGovernanceReleaseAuditModel, "audits">
): string {
  return `Provider governance release audit reviews ${model.audits.length} readiness decision(s). Release audit does not deploy anything, secrets are not inspected or displayed, and provider execution remains approval-gated.`;
}

export function buildProviderGovernanceReleaseAuditModel(): ProviderGovernanceReleaseAuditModel {
  const audits = buildProviderGovernanceReleaseAudits();
  const model: ProviderGovernanceReleaseAuditModel = {
    title: "Provider governance release audit",
    summary: "",
    audits,
    boundary: buildProviderGovernanceReleaseAuditBoundary(),
    auditLanguage: [...PROVIDER_GOVERNANCE_RELEASE_AUDIT_LANGUAGE],
    advancedDetails: [
      "Provider governance release audit",
      "Release audit does not deploy anything",
      "Secrets are not inspected or displayed",
      "Covered governance surfaces",
      "Route readiness",
      "Smoke readiness",
      "Privacy readiness",
      "Budget readiness",
      "Audit-log readiness",
      "Runbook readiness",
      "Known gaps",
      "Release decision",
      "Ready with fixes",
      "Handoff summary",
      "No provider APIs are called",
      "No provider registry mutation",
      "No auto-routing",
    ],
  };
  return { ...model, summary: summarizeProviderGovernanceReleaseAudit(model) };
}
