import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildGameServerAdapterContractReviewStableKey } from "../universal-execution-review-kit";
import {
  buildExecutionAdapterContractReview,
  buildExecutionAdapterContractReviewAdvancedDetails,
  buildExecutionAdapterContractReviewBoundary,
  buildExecutionAdapterContractReviewModel,
  buildExecutionAdapterContractReviewSections,
  summarizeExecutionAdapterContractReview,
  type ExecutionAdapterContractReviewPacketInput,
} from "../execution-adapter-contract-review-kit";

export { buildGameServerAdapterContractReviewStableKey };

export const GAME_SERVER_ADAPTER_CONTRACT_REVIEW_LANGUAGE = [
  "Game server adapter contract review",
  "Game server adapter contract review does not build or launch servers",
  "Game/server adapters require explicit operator approval",
  "Adapter not executable from UI",
  "Project scaffold",
  "Server template",
  "File write",
  "Command runner",
  "Local runtime",
  "Validation",
  "Packaging",
  "Copyright/trademark safety",
  "Original medieval fantasy",
  "No copied franchise assets",
  "Denied game/server adapter actions",
] as const;

const GAME_SERVER_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS = [
  "Game server adapter contract review identity",
  "Project scaffold",
  "Server template",
  "File write",
  "Command runner",
  "Local runtime",
  "Validation",
  "Packaging",
  "Copyright/trademark safety",
  "Original medieval fantasy",
  "No copied franchise assets",
  "Denied game/server adapter actions",
  "Unresolved game/server adapter blockers",
  "What this unlocks later",
  "Next recommended action",
  "advanced game server adapter contract review details collapsed/secondary",
] as const;

export function buildGameServerAdapterContractReview(input: ExecutionAdapterContractReviewPacketInput): UniversalExecutionReviewPacket {
  return buildExecutionAdapterContractReview("game-server-adapter-contract-review", input);
}

export function buildGameServerAdapterContractReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildGameServerAdapterContractReview({
      idHint: "game-server-adapter-contract-review",
      status: "blocked",
      identity: "Game server adapter contract review identity: Game server adapter contract review does not build or launch servers. Game/server adapters require explicit operator approval before any future scaffold, template, file, command, runtime, validation, or package step.",
      sections: buildExecutionAdapterContractReviewSections(
        { label: "Project scaffold", items: ["Project scaffold: project name, folder plan, plugin list, dependency rule, ownership, and no automatic scaffold creation must be reviewed."] },
        { label: "Server template", items: ["Server template: configuration files, permissions, world notes, docs, safety notes, and template provenance need review before any write."] },
        { label: "File write", items: ["File write: file paths, allowlist/denylist, diff preview, rollback, audit, and no file mutation without explicit approval are required."] },
        { label: "Command runner", items: ["Command runner: setup commands, validation commands, expected output, timeout, exit code, and no command execution from UI must be visible."] },
        { label: "Local runtime", items: ["Local runtime: port, process lifecycle, server launch rule, logging, stop plan, and no runtime start from UI must be reviewed."] },
        { label: "Validation", items: ["Validation: config checks, compatibility checks, smoke checks, player-facing notes, evidence, and result review remain blocked until approved."] },
        { label: "Packaging", items: ["Packaging: bundle contents, artifact manifest, license/provenance, handoff, destination, and no package/export behavior from UI."] },
        { label: "Copyright/trademark safety", items: ["Copyright/trademark safety: Original medieval fantasy server inspired by ice, fire, castles, houses, and kingdoms. No copied franchise assets, names, logos, maps, dialogue, music, character likenesses, or protected assets are allowed."] },
        { label: "Denied game/server adapter actions", items: ["Denied game/server adapter actions: scaffold projects, write server files, run setup commands, start runtimes, launch servers, validate live servers, create packages, copy protected assets, or persist approvals from UI."] },
      ),
      routes: ["/execution-adapter-contract-inventory", "/file-write-adapter-contract-review", "/command-runner-adapter-contract-review", "/local-runtime-adapter-contract-review"],
      nextRecommendedAction: "Next recommended action: keep game/server building blocked while scaffold, template, file write, command runner, local runtime, validation, packaging, and copyright/trademark contracts are reviewed.",
      advancedDetails: buildExecutionAdapterContractReviewAdvancedDetails("game server adapter contract review", GAME_SERVER_ADAPTER_CONTRACT_REVIEW_LANGUAGE, GAME_SERVER_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildGameServerAdapterContractReviewBoundary() {
  return buildExecutionAdapterContractReviewBoundary();
}

export function summarizeGameServerAdapterContractReview(model: { gameServerAdapterContractReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeExecutionAdapterContractReview("Game server adapter contract review", model.gameServerAdapterContractReviews, "Game/server adapters require explicit operator approval.");
}

export function buildGameServerAdapterContractReviewModel() {
  const gameServerAdapterContractReviews = buildGameServerAdapterContractReviews();
  const model = buildExecutionAdapterContractReviewModel({
    phase: "Phase 680",
    title: "Game server adapter contract review",
    summarySubject: "Game server adapter contract review",
    approvalCopy: "Game/server adapters require explicit operator approval.",
    subtitle: "Review the game/server adapter contract without building or launching servers.",
    primaryLabel: "Review game/server adapter",
    anchor: "game-server-adapter-contract-review",
    plainEnglishTitle: "Plain-English game server adapter contract review",
    plainEnglishCopy: "This page defines what a real game/server adapter must show before it can ever build or launch a server: scaffold, templates, file writes, commands, local runtime, validation, packaging, copyright/trademark safety, and denied actions. The safe example is original medieval fantasy, with no copied franchise assets.",
    language: GAME_SERVER_ADAPTER_CONTRACT_REVIEW_LANGUAGE,
    advancedDetails: [...GAME_SERVER_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/execution-adapter-contract-inventory", label: "Adapter inventory" },
      { href: "/file-write-adapter-contract-review", label: "File write adapter" },
      { href: "/command-runner-adapter-contract-review", label: "Command runner adapter" },
      { href: "/local-runtime-adapter-contract-review", label: "Local runtime adapter" },
    ],
    packets: gameServerAdapterContractReviews,
    advancedCopy: "advanced game server adapter contract review details collapsed/secondary. This route does not build servers, launch servers, scaffold projects, write files, run commands, start local runtimes, validate live servers, create packages, copy protected assets, or persist approvals.",
    dataScope: "game-server-adapter-contract-review buildGameServerAdapterContractReviewStableKey GameServerAdapterContractReviewPanel",
  });
  return { ...model, gameServerAdapterContractReviews };
}
