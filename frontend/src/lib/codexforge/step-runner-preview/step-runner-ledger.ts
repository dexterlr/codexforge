import {
  buildStepRunnerPreviewStableKey,
  type StepRunnerApprovalPacket,
  type StepRunnerDryRunPlan,
  type StepRunnerInput,
  type StepRunnerLedger,
  type StepRunnerLedgerItem,
  type StepRunnerLedgerState,
  type StepRunnerPolicy,
  type StepRunnerToolPlan,
} from "./step-runner-preview-types";

export function buildStepRunnerLedgerItem(args: {
  state: StepRunnerLedgerState;
  label: string;
  detail: string;
  inputId: string;
  stepId: string;
}): StepRunnerLedgerItem {
  return {
    id: buildStepRunnerPreviewStableKey(
      "step-runner-ledger",
      args.inputId,
      args.stepId,
      args.state
    ),
    state: args.state,
    label: args.label,
    detail: args.detail,
    inputId: args.inputId,
    stepId: args.stepId,
  };
}

export function buildStepRunnerLedger(args: {
  input: StepRunnerInput;
  policy: StepRunnerPolicy;
  toolPlan: StepRunnerToolPlan;
  approvalPacket: StepRunnerApprovalPacket;
  dryRunPlan: StepRunnerDryRunPlan;
  rejected?: boolean;
  reset?: boolean;
}): StepRunnerLedger {
  const items: StepRunnerLedgerItem[] = [
    buildStepRunnerLedgerItem({
      state: "selected",
      label: "Step selected",
      detail: `${args.input.stepLabel} is selected from available plan data.`,
      inputId: args.input.id,
      stepId: args.input.stepId,
    }),
    buildStepRunnerLedgerItem({
      state: "previewed",
      label: "Run preview prepared",
      detail: "Input, policy, tool plan, approval packet, dry run plan, and result preview are visible.",
      inputId: args.input.id,
      stepId: args.input.stepId,
    }),
  ];

  if (!args.policy.previewAllowed || args.toolPlan.proposedTool.blocked) {
    items.push(
      buildStepRunnerLedgerItem({
        state: "policy-blocked",
        label: "Policy blocked",
        detail: "Preview or proposed tool posture is blocked by Step Runner Policy.",
        inputId: args.input.id,
        stepId: args.input.stepId,
      })
    );
  }

  if (args.approvalPacket.requiredApprovals.length > 0) {
    items.push(
      buildStepRunnerLedgerItem({
        state: "approval-required",
        label: "Approval required",
        detail: "Future run requires approval and no approval is auto-granted.",
        inputId: args.input.id,
        stepId: args.input.stepId,
      })
    );
  }

  items.push(
    buildStepRunnerLedgerItem({
      state: "dry-run-planned",
      label: "Dry run planned",
      detail: `${args.dryRunPlan.stopConditions.length} stop conditions are visible before any future execution request.`,
      inputId: args.input.id,
      stepId: args.input.stepId,
    })
  );

  if (args.policy.previewAllowed && !args.toolPlan.proposedTool.blocked) {
    items.push(
      buildStepRunnerLedgerItem({
        state: "future-run-ready",
        label: "Future run request ready",
        detail: "Ready only to request future approval; the step is not approved and not executed.",
        inputId: args.input.id,
        stepId: args.input.stepId,
      })
    );
  }

  if (args.rejected) {
    items.push(
      buildStepRunnerLedgerItem({
        state: "rejected",
        label: "Preview rejected",
        detail: "Operator rejected this preview packet; no persistence write is performed.",
        inputId: args.input.id,
        stepId: args.input.stepId,
      })
    );
  }

  if (args.reset) {
    items.push(
      buildStepRunnerLedgerItem({
        state: "reset",
        label: "Preview reset",
        detail: "Selection can reset local preview state without persistence writes.",
        inputId: args.input.id,
        stepId: args.input.stepId,
      })
    );
  }

  const draft: StepRunnerLedger = {
    id: "step-runner-ledger",
    inputId: args.input.id,
    items,
    summary: [],
  };

  return {
    ...draft,
    summary: summarizeStepRunnerLedger(draft),
  };
}

export function summarizeStepRunnerLedger(ledger: StepRunnerLedger): string[] {
  return [
    `Step runner ledger has ${ledger.items.length} preview-only states.`,
    "Ledger states are local and no persistence writes are performed.",
    "States include selected, previewed, policy-blocked, approval-required, dry-run-planned, future-run-ready, rejected, and reset.",
  ];
}
