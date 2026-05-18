import type {
  BrainMutationPolicy,
  BrainMutationPolicyInput,
  BrainMutationPolicyRule,
  BrainMutationPolicyRuleState,
} from "./brain-mutation-governance-types";
import {
  BRAIN_MUTATION_GOVERNANCE_CANONICAL_GRAPH_SCHEMA_PATH,
  buildBrainMutationGovernanceStableKey,
  isKnownBrainMutationGovernanceEventType,
} from "./brain-mutation-governance-types";

function rule(
  id: string,
  label: string,
  state: BrainMutationPolicyRuleState,
  detail: string,
  required = true
): BrainMutationPolicyRule {
  return { id, label, state, detail, required };
}

function stateFrom(condition: boolean, blockedWhenFalse = true): BrainMutationPolicyRuleState {
  if (condition) return "pass";
  return blockedWhenFalse ? "block" : "review";
}

export function buildBrainMutationPolicy(input: BrainMutationPolicyInput = {}): BrainMutationPolicy {
  const eventType = String(input.eventType ?? "memory.promoted");
  const isKnownEvent = isKnownBrainMutationGovernanceEventType(eventType);
  const isMemoryPromoted = eventType === "memory.promoted";
  const evidenceRefs = [...(input.evidenceRefs ?? [])].filter(Boolean);
  const approvalConfirmed = input.approvalConfirmed === true;
  const policyConfirmed = input.policyConfirmed === true;
  const auditJournalVisible = input.auditJournalVisible !== false;
  const reducerPreviewVisible = input.reducerPreviewVisible !== false;

  const rules: BrainMutationPolicyRule[] = [
    rule(
      "canonical-graph-schema-required",
      "canonical graph schema required",
      "pass",
      `Canonical graph schema required at ${BRAIN_MUTATION_GOVERNANCE_CANONICAL_GRAPH_SCHEMA_PATH}.`
    ),
    rule(
      "legacy-brain-graph-import-blocked",
      "legacy brain-graph import blocked",
      stateFrom(input.legacyBrainGraphImportDetected !== true),
      "Legacy brain-graph import blocked; use canonical graph schema imports only."
    ),
    rule(
      "direct-ui-graph-mutation-blocked",
      "direct UI graph mutation blocked",
      stateFrom(input.directUiGraphMutationAttempted !== true),
      "Direct UI graph mutation blocked; governance UI is read-only."
    ),
    rule(
      "append-event-from-ui-blocked",
      "appendEvent from UI blocked",
      stateFrom(input.appendEventFromUiAttempted !== true),
      "appendEvent from UI blocked; appendEvent is executor-domain-only."
    ),
    rule(
      "runtime-event-executor-required",
      "runtime event executor required for append-only events",
      "pass",
      "Runtime event executor required for append-only events."
    ),
    rule(
      "reducer-preview-required",
      "reducer preview required before mutation",
      stateFrom(reducerPreviewVisible),
      "Reducer preview required before mutation."
    ),
    rule(
      "explicit-approval-memory-promoted",
      "explicit approval required for memory.promoted",
      isMemoryPromoted ? stateFrom(approvalConfirmed, true) : "pass",
      "memory.promoted requires explicit approval before any request-ready executor path."
    ),
    rule(
      "evidence-refs-memory-promoted",
      "evidence refs required for memory.promoted",
      isMemoryPromoted ? stateFrom(evidenceRefs.length > 0, true) : "pass",
      "Evidence refs required for memory.promoted; evidence is context, not authority."
    ),
    rule(
      "policy-confirmation-required",
      "policy confirmation required",
      stateFrom(policyConfirmed, true),
      "Policy confirmation required before mutation request readiness."
    ),
    rule(
      "audit-journal-entry-required",
      "audit journal entry required",
      stateFrom(auditJournalVisible),
      "Audit journal entry required for mutation lifecycle visibility."
    ),
    rule(
      "unknown-event-type-blocked",
      "unknown event type blocked",
      stateFrom(isKnownEvent),
      "Unknown event type blocked until reducer impact and policy are defined."
    ),
    rule(
      "auto-promotion-blocked",
      "auto-promotion blocked",
      stateFrom(input.autoPromotionAttempted !== true),
      "Auto-promotion blocked; operator review is required."
    ),
    rule(
      "auto-merge-blocked",
      "auto-merge blocked",
      stateFrom(input.autoMergeAttempted !== true),
      "Auto-merge blocked; approved boundary and audit review are required."
    ),
    rule(
      "evidence-context-not-authority",
      "evidence is context, not authority",
      "pass",
      "Evidence is context, not authority; latest-message authority remains preserved."
    ),
  ];

  const blockedReasons = rules.filter((item) => item.state === "block").map((item) => item.label);
  const warnings = rules.filter((item) => item.state === "review").map((item) => item.label);
  const policy: BrainMutationPolicy = {
    id: "brain-mutation-policy",
    canonicalGraphSchemaRequired: true,
    canonicalGraphSchemaPath: BRAIN_MUTATION_GOVERNANCE_CANONICAL_GRAPH_SCHEMA_PATH,
    legacyBrainGraphImportBlocked: true,
    directUiGraphMutationBlocked: true,
    appendEventFromUiBlocked: true,
    runtimeEventExecutorRequiredForAppendOnlyEvents: true,
    reducerPreviewRequiredBeforeMutation: true,
    explicitApprovalRequiredForMemoryPromoted: true,
    evidenceRefsRequiredForMemoryPromoted: true,
    policyConfirmationRequired: true,
    auditJournalEntryRequired: true,
    unknownEventTypeBlocked: true,
    autoPromotionBlocked: true,
    autoMergeBlocked: true,
    evidenceIsContextNotAuthority: true,
    latestMessageAuthorityPreserved: true,
    satisfied: blockedReasons.length === 0,
    blockedReasons,
    warnings,
    rules: rules.map((item) => ({
      ...item,
      id: item.id || buildBrainMutationGovernanceStableKey("policy", item.label),
    })),
    summary: [],
  };

  return { ...policy, summary: summarizeBrainMutationPolicy(policy) };
}

export function isBrainMutationPolicySatisfied(policy: BrainMutationPolicy): boolean {
  return policy.satisfied;
}

export function summarizeBrainMutationPolicy(policy: BrainMutationPolicy): string[] {
  return [
    policy.satisfied
      ? "Brain mutation policy is satisfied for the supplied review context."
      : `Brain mutation policy blocks mutation readiness: ${policy.blockedReasons.join(", ")}.`,
    "Policy requires canonical graph schema, blocks legacy brain-graph import, blocks direct UI graph mutation, blocks appendEvent from UI, requires runtime event executor, and requires reducer preview.",
    "No auto-promotion, no auto-merge, evidence is context, not authority, and preserve latest-message authority.",
  ];
}
