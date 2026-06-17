import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildCommandRunnerAdapterContractReviewStableKey } from "../universal-execution-review-kit";
import {
  buildExecutionAdapterContractReview,
  buildExecutionAdapterContractReviewAdvancedDetails,
  buildExecutionAdapterContractReviewBoundary,
  buildExecutionAdapterContractReviewModel,
  buildExecutionAdapterContractReviewSections,
  summarizeExecutionAdapterContractReview,
  type ExecutionAdapterContractReviewPacketInput,
} from "../execution-adapter-contract-review-kit";

export { buildCommandRunnerAdapterContractReviewStableKey };

export const COMMAND_RUNNER_ADAPTER_CONTRACT_REVIEW_LANGUAGE = [
  "Command runner adapter contract review",
  "Command runner adapter contract review does not run commands",
  "Command runner adapters require explicit operator approval",
  "Adapter not executable from UI",
  "Command preview",
  "Working directory",
  "Env/secrets",
  "Timeout",
  "Stdout/stderr",
  "Exit code",
  "Recovery",
  "Denied command runner adapter actions",
] as const;

const COMMAND_RUNNER_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS = [
  "Command runner adapter contract review identity",
  "Command preview",
  "Working directory",
  "Env/secrets",
  "Timeout",
  "Stdout/stderr",
  "Exit code",
  "Recovery",
  "Denied command runner adapter actions",
  "Unresolved command runner adapter blockers",
  "What this unlocks later",
  "Next recommended action",
  "advanced command runner adapter contract review details collapsed/secondary",
] as const;

export function buildCommandRunnerAdapterContractReview(input: ExecutionAdapterContractReviewPacketInput): UniversalExecutionReviewPacket {
  return buildExecutionAdapterContractReview("command-runner-adapter-contract-review", input);
}

export function buildCommandRunnerAdapterContractReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildCommandRunnerAdapterContractReview({
      idHint: "command-runner-adapter-contract-review",
      status: "blocked",
      identity: "Command runner adapter contract review identity: Command runner adapter contract review does not run commands. Command runner adapters require explicit operator approval before any future shell, git, test, build, smoke, package, or server command.",
      sections: buildExecutionAdapterContractReviewSections(
        { label: "Command preview", items: ["Command preview: exact executable, arguments, purpose, expected output, forbidden side effects, and operator-readable risk must be shown before approval."] },
        { label: "Working directory", items: ["Working directory: fixed workspace root, no hidden directory changes, no arbitrary project scanning, no parent traversal, and no external repository targeting without approval."] },
        { label: "Env/secrets", items: ["Env/secrets: no environment value printing, no credential injection from UI, no real endpoint display, no token storage, and explicit redaction rules are required."] },
        { label: "Timeout", items: ["Timeout: maximum runtime, cancellation behavior, long-running process rule, retry limit, and blocked-state handling must be declared before execution can be considered."] },
        { label: "Stdout/stderr", items: ["Stdout/stderr: future command outputs require redaction, truncation, evidence routing, operator review, and no automatic result storage or reuse."] },
        { label: "Exit code", items: ["Exit code: success, warning, failure, timeout, and denied states need a clear output contract and no automatic next step."] },
        { label: "Recovery", items: ["Recovery: retries, cleanup, rollback, escalation, and rerun plans require explicit approval and must never trigger automatically from this UI."] },
        { label: "Denied command runner adapter actions", items: ["Denied command runner adapter actions: run commands, run shell/git/test/build/smoke/package tools, launch servers, start runtimes, print secrets, store outputs, trigger retries, or persist approvals from UI."] },
      ),
      routes: ["/execution-adapter-contract-inventory", "/local-runtime-adapter-contract-review", "/recovery-adapter-contract-review"],
      nextRecommendedAction: "Next recommended action: keep command running blocked while command preview, directory, secret, timeout, output, exit-code, and recovery contracts are reviewed.",
      advancedDetails: buildExecutionAdapterContractReviewAdvancedDetails("command runner adapter contract review", COMMAND_RUNNER_ADAPTER_CONTRACT_REVIEW_LANGUAGE, COMMAND_RUNNER_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildCommandRunnerAdapterContractReviewBoundary() {
  return buildExecutionAdapterContractReviewBoundary();
}

export function summarizeCommandRunnerAdapterContractReview(model: { commandRunnerAdapterContractReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeExecutionAdapterContractReview("Command runner adapter contract review", model.commandRunnerAdapterContractReviews, "Command runner adapters require explicit operator approval.");
}

export function buildCommandRunnerAdapterContractReviewModel() {
  const commandRunnerAdapterContractReviews = buildCommandRunnerAdapterContractReviews();
  const model = buildExecutionAdapterContractReviewModel({
    phase: "Phase 668",
    title: "Command runner adapter contract review",
    summarySubject: "Command runner adapter contract review",
    approvalCopy: "Command runner adapters require explicit operator approval.",
    subtitle: "Review the command runner adapter contract without running commands.",
    primaryLabel: "Review command runner adapter",
    anchor: "command-runner-adapter-contract-review",
    plainEnglishTitle: "Plain-English command runner adapter contract review",
    plainEnglishCopy: "This page defines what a real command runner adapter must show before it can ever run a command: command preview, working directory, secrets policy, timeout, outputs, exit code, recovery, and denied actions. It is not implemented yet.",
    language: COMMAND_RUNNER_ADAPTER_CONTRACT_REVIEW_LANGUAGE,
    advancedDetails: [...COMMAND_RUNNER_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/execution-adapter-contract-inventory", label: "Adapter inventory" },
      { href: "/local-runtime-adapter-contract-review", label: "Local runtime adapter" },
      { href: "/recovery-adapter-contract-review", label: "Recovery adapter" },
    ],
    packets: commandRunnerAdapterContractReviews,
    advancedCopy: "advanced command runner adapter contract review details collapsed/secondary. This route does not run commands, shell, git, tests, builds, smoke scripts, package tools, servers, local runtimes, retries, or approval automation.",
    dataScope: "command-runner-adapter-contract-review buildCommandRunnerAdapterContractReviewStableKey CommandRunnerAdapterContractReviewPanel",
  });
  return { ...model, commandRunnerAdapterContractReviews };
}
