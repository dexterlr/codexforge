import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildLocalRuntimeAdapterContractReviewStableKey } from "../universal-execution-review-kit";
import {
  buildExecutionAdapterContractReview,
  buildExecutionAdapterContractReviewAdvancedDetails,
  buildExecutionAdapterContractReviewBoundary,
  buildExecutionAdapterContractReviewModel,
  buildExecutionAdapterContractReviewSections,
  summarizeExecutionAdapterContractReview,
  type ExecutionAdapterContractReviewPacketInput,
} from "../execution-adapter-contract-review-kit";

export { buildLocalRuntimeAdapterContractReviewStableKey };

export const LOCAL_RUNTIME_ADAPTER_CONTRACT_REVIEW_LANGUAGE = [
  "Local runtime adapter contract review",
  "Local runtime adapter contract review does not start local runtimes",
  "Local runtime adapters require explicit operator approval",
  "Adapter not executable from UI",
  "Runtime start/stop contract",
  "Port/network contract",
  "Process lifecycle",
  "Logging",
  "Recovery",
  "Denied local runtime adapter actions",
] as const;

const LOCAL_RUNTIME_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS = [
  "Local runtime adapter contract review identity",
  "Runtime start/stop contract",
  "Port/network contract",
  "Process lifecycle",
  "Logging",
  "Recovery",
  "Denied local runtime adapter actions",
  "Unresolved local runtime adapter blockers",
  "What this unlocks later",
  "Next recommended action",
  "advanced local runtime adapter contract review details collapsed/secondary",
] as const;

export function buildLocalRuntimeAdapterContractReview(input: ExecutionAdapterContractReviewPacketInput): UniversalExecutionReviewPacket {
  return buildExecutionAdapterContractReview("local-runtime-adapter-contract-review", input);
}

export function buildLocalRuntimeAdapterContractReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildLocalRuntimeAdapterContractReview({
      idHint: "local-runtime-adapter-contract-review",
      status: "blocked",
      identity: "Local runtime adapter contract review identity: Local runtime adapter contract review does not start local runtimes. Local runtime adapters require explicit operator approval before any future process, port, or local server lifecycle action.",
      sections: buildExecutionAdapterContractReviewSections(
        { label: "Runtime start/stop contract", items: ["Runtime start/stop contract: future adapters need approved start command, stop command, owner, expected duration, blocked state, and no automatic start or stop from UI."] },
        { label: "Port/network contract", items: ["Port/network contract: requested port, host binding, local-only rule, collision handling, firewall expectation, and no arbitrary network exposure must be reviewed."] },
        { label: "Process lifecycle", items: ["Process lifecycle: process identity, parent process, health probe boundary, cancellation path, stale process handling, and no hidden background job creation are required."] },
        { label: "Logging", items: ["Logging: future logs need redaction, truncation, evidence routing, operator review, and no automatic output storage or credential display."] },
        { label: "Recovery", items: ["Recovery: restart, cleanup, rollback, port release, escalation, and failure evidence require approval before any recovery action can run."] },
        { label: "Denied local runtime adapter actions", items: ["Denied local runtime adapter actions: start runtimes, stop runtimes, launch servers, open ports, call bridge endpoints, probe health, monitor processes, store logs, trigger recovery, or persist approvals from UI."] },
        { label: "Unresolved local runtime adapter blockers", items: ["Unresolved local runtime adapter blockers: missing runtime implementation, command boundary, process registry, port guard, log redaction, stop plan, and recovery policy keep runtimes blocked."] },
      ),
      routes: ["/execution-adapter-contract-inventory", "/command-runner-adapter-contract-review", "/game-server-adapter-contract-review"],
      nextRecommendedAction: "Next recommended action: keep local runtime startup blocked while start/stop, port/network, lifecycle, logging, and recovery contracts are reviewed.",
      advancedDetails: buildExecutionAdapterContractReviewAdvancedDetails("local runtime adapter contract review", LOCAL_RUNTIME_ADAPTER_CONTRACT_REVIEW_LANGUAGE, LOCAL_RUNTIME_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildLocalRuntimeAdapterContractReviewBoundary() {
  return buildExecutionAdapterContractReviewBoundary();
}

export function summarizeLocalRuntimeAdapterContractReview(model: { localRuntimeAdapterContractReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeExecutionAdapterContractReview("Local runtime adapter contract review", model.localRuntimeAdapterContractReviews, "Local runtime adapters require explicit operator approval.");
}

export function buildLocalRuntimeAdapterContractReviewModel() {
  const localRuntimeAdapterContractReviews = buildLocalRuntimeAdapterContractReviews();
  const model = buildExecutionAdapterContractReviewModel({
    phase: "Phase 669",
    title: "Local runtime adapter contract review",
    summarySubject: "Local runtime adapter contract review",
    approvalCopy: "Local runtime adapters require explicit operator approval.",
    subtitle: "Review the local runtime adapter contract without starting local runtimes.",
    primaryLabel: "Review runtime adapter",
    anchor: "local-runtime-adapter-contract-review",
    plainEnglishTitle: "Plain-English local runtime adapter contract review",
    plainEnglishCopy: "This page defines what a real local runtime adapter must show before it can ever start or stop a runtime: start and stop contracts, port/network rules, process lifecycle, logs, recovery, and denied actions. It is not implemented yet.",
    language: LOCAL_RUNTIME_ADAPTER_CONTRACT_REVIEW_LANGUAGE,
    advancedDetails: [...LOCAL_RUNTIME_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/execution-adapter-contract-inventory", label: "Adapter inventory" },
      { href: "/command-runner-adapter-contract-review", label: "Command runner adapter" },
      { href: "/game-server-adapter-contract-review", label: "Game/server adapter" },
    ],
    packets: localRuntimeAdapterContractReviews,
    advancedCopy: "advanced local runtime adapter contract review details collapsed/secondary. This route does not start runtimes, stop runtimes, launch servers, open ports, call local bridge endpoints, probe health, monitor processes, store logs, or trigger recovery.",
    dataScope: "local-runtime-adapter-contract-review buildLocalRuntimeAdapterContractReviewStableKey LocalRuntimeAdapterContractReviewPanel",
  });
  return { ...model, localRuntimeAdapterContractReviews };
}
