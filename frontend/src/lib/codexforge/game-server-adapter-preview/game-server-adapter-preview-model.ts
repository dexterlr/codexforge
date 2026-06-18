import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildAdapterBackedExecutionPreviewStableKey as buildGameServerAdapterPreviewStableKey } from "../adapter-backed-execution-preview-kit";
import {
  buildAdapterBackedExecutionPreview,
  buildAdapterBackedExecutionPreviewAdvancedDetails,
  buildAdapterBackedExecutionPreviewBoundary,
  buildAdapterBackedExecutionPreviewModel,
  buildAdapterBackedExecutionPreviewSections,
  summarizeAdapterBackedExecutionPreview,
  type AdapterBackedExecutionPreviewPacketInput,
} from "../adapter-backed-execution-preview-kit";

export { buildGameServerAdapterPreviewStableKey };

export const GAME_SERVER_ADAPTER_PREVIEW_LANGUAGE = [
  "Game Server Adapter Preview",
  "Game server adapter preview does not build or launch servers",
  "Game/server execution requires explicit operator approval",
  "Adapter-backed shape",
  "Preview only",
  "Not executed",
  "Approval required",
  "What this unlocks later",
  "Original medieval fantasy",
  "Project scaffold",
  "Server template",
  "File write",
  "Command runner",
  "Local runtime",
  "Validation",
  "Packaging",
  "Copyright/trademark safety",
  "No copied franchise assets",
  "Denied actions",
] as const;

const GAME_SERVER_ADAPTER_PREVIEW_ADVANCED_DETAILS = [
  "Game server adapter preview identity",
  "Original medieval fantasy server concept",
  "Project scaffold",
  "Server template",
  "File write",
  "Command runner",
  "Local runtime",
  "Validation",
  "Packaging",
  "Copyright/trademark safety",
  "No copied franchise assets",
  "Denied actions",
  "Next recommended action",
  "advanced game server adapter preview details collapsed/secondary",
  "no live adapter implementation",
  "no adapter execution",
  "no adapter preview execution",
  "no project scaffold creation",
  "no file write/delete/mutation",
  "no command execution",
  "no local runtime start/stop",
  "no provider/model calls",
  "no prompt sending",
  "no connector access/fetch/mutation",
  "no automation/schedule/reminder/task/watch creation",
  "no evidence capture/ingestion/storage",
  "no output/result storage or reuse",
  "no recovery/retry trigger",
  "no package/export/write behavior",
  "no creative/video/image/3D generation",
  "no research browsing/searching/fetching",
  "no chatbot/agent creation/deployment",
  "no video-call joining/monitoring",
  "no monitoring job creation",
  "no Minecraft/project/server build or launch execution",
  "no copyrighted franchise asset/name/logo/map/dialogue/music copying",
  "no approval automation",
  "no approval decision persistence",
  "no policy/settings/preference persistence",
  "no web/search/GitHub API calls from UI",
  "no arbitrary project scanning/local file browsing/path crawling",
  "no memory/RAG ingestion or memory auto-promotion",
  "no Brain graph mutation",
  "no plugin/tool/agent/MCP execution",
  "no credential/key/token/endpoint/output storage",
  "no process.env printing",
  "no route coverage removal",
  "no duplicate route hrefs or shortLabels",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "checkpoint documentation smoke still exists and remains registered",
  "server-only path boundary markers remain intact",
  "no Math.random",
  "no Date.now",
  "no mojibake",
] as const;

export function buildGameServerAdapterPreview(input: AdapterBackedExecutionPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterBackedExecutionPreview("game-server-adapter-preview", input);
}

export function buildGameServerAdapterPreviews(): UniversalExecutionReviewPacket[] {
  return [
    buildGameServerAdapterPreview({
      idHint: "game-server-adapter-preview",
      status: "blocked",
      identity: "Game server adapter preview identity: Game server adapter preview does not build or launch servers. Game/server execution requires explicit operator approval, and this surface shows the adapter-backed shape only; it is preview only and not executed.",
      sections: buildAdapterBackedExecutionPreviewSections(
        { label: "Original medieval fantasy server concept", items: ["Original medieval fantasy server concept: original medieval fantasy server inspired by ice, fire, castles, houses, and kingdoms, with custom names and no protected source material."] },
        { label: "Project scaffold", items: ["Project scaffold: preview folder plan, plugin plan, dependency posture, ownership, and no project scaffold creation."] },
        { label: "Server template", items: ["Server template: preview config files, permissions, world notes, gameplay systems, and template provenance without writing files."] },
        { label: "File write", items: ["File write: preview target paths, diff summary, rollback, audit, and denied file mutations."] },
        { label: "Command runner", items: ["Command runner: preview setup commands, validation commands, timeout, stdout/stderr, exit code, and denied command execution."] },
        { label: "Local runtime", items: ["Local runtime: preview port, process lifecycle, logging, stop plan, and denied server launch."] },
        { label: "Validation", items: ["Validation: preview config checks, compatibility checks, gameplay checklist, evidence needs, and result review without running validation."] },
        { label: "Packaging", items: ["Packaging: preview bundle manifest, license/provenance, handoff, destination, and no package/export behavior."] },
        { label: "Copyright/trademark safety", items: ["Copyright/trademark safety: no copied franchise assets, names, logos, maps, dialogue, music, character likenesses, protected assets, or borrowed worldbuilding."] },
        { label: "Denied actions", items: ["Denied actions: no project scaffold creation, server build, server launch, file write, command execution, local runtime start, validation run, package export, copied franchise material, or approval persistence from UI."] },
      ),
      routes: ["/adapter-backed-execution-preview-inventory", "/file-write-adapter-preview", "/command-runner-adapter-preview", "/packaging-adapter-preview"],
      nextRecommendedAction: "Next recommended action: keep game/server execution blocked while original concept, scaffold, template, file write, command runner, runtime, validation, packaging, and copyright/trademark previews are reviewed.",
      advancedDetails: buildAdapterBackedExecutionPreviewAdvancedDetails("game server adapter preview", GAME_SERVER_ADAPTER_PREVIEW_LANGUAGE, GAME_SERVER_ADAPTER_PREVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildGameServerAdapterPreviewBoundary() {
  return buildAdapterBackedExecutionPreviewBoundary();
}

export function summarizeGameServerAdapterPreview(model: { gameServerAdapterPreviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterBackedExecutionPreview("Game Server Adapter Preview", model.gameServerAdapterPreviews, "Game/server execution requires explicit operator approval.");
}

export function buildGameServerAdapterPreviewModel() {
  const gameServerAdapterPreviews = buildGameServerAdapterPreviews();
  const model = buildAdapterBackedExecutionPreviewModel({
    phase: "Phase 696",
    title: "Game Server Adapter Preview",
    summarySubject: "Game Server Adapter Preview",
    approvalCopy: "Game/server execution requires explicit operator approval.",
    subtitle: "Preview the game/server adapter packet without building or launching servers.",
    primaryLabel: "Review game/server preview",
    anchor: "game-server-adapter-preview",
    plainEnglishTitle: "Plain-English game server adapter preview",
    plainEnglishCopy: "This page shows the packet a future game/server adapter would need before execution: original medieval fantasy server concept, project scaffold, server template, file writes, commands, runtime, validation, packaging, copyright/trademark safety, and denied actions. It does not build or launch servers and uses no copied franchise assets.",
    language: GAME_SERVER_ADAPTER_PREVIEW_LANGUAGE,
    advancedDetails: [...GAME_SERVER_ADAPTER_PREVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/adapter-backed-execution-preview-inventory", label: "Preview inventory" },
      { href: "/file-write-adapter-preview", label: "File write preview" },
      { href: "/command-runner-adapter-preview", label: "Command preview" },
      { href: "/packaging-adapter-preview", label: "Packaging preview" },
    ],
    packets: gameServerAdapterPreviews,
    advancedCopy: "advanced game server adapter preview details collapsed/secondary. This route is adapter-backed shape preview only and not executed; it has no live adapter implementation, no adapter execution, no adapter preview execution, no approval automation, and no approval decision persistence.",
    dataScope: "game-server-adapter-preview buildGameServerAdapterPreviewStableKey GameServerAdapterPreviewPanel",
  });
  return { ...model, gameServerAdapterPreviews };
}
