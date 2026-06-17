import type { GameServerWorkflowProfile, GameServerWorkflowProfileBoundary, GameServerWorkflowProfileModel } from "./game-server-workflow-profile-types";
import { buildGameServerWorkflowProfileStableKey } from "./game-server-workflow-profile-types";
import { buildUniversalExecutionReviewBoundary, UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS } from "../universal-execution-review-kit";

export const GAME_SERVER_WORKFLOW_PROFILE_LANGUAGE = [
  "Game server workflow profile",
  "Game server workflow profile does not build or launch servers",
  "Game/server building requires explicit operator approval",
  "Unsafe or infringing game/server workflows stay blocked",
  "Original medieval fantasy server",
  "No copied franchise assets",
] as const;

export function buildGameServerWorkflowProfile(input: Omit<GameServerWorkflowProfile, "id"> & { idHint: string }): GameServerWorkflowProfile {
  const { idHint, ...profile } = input;
  return { id: buildGameServerWorkflowProfileStableKey("game-server-workflow-profile", idHint, input.status), ...profile };
}

export function buildGameServerWorkflowProfiles(): GameServerWorkflowProfile[] {
  return [
    buildGameServerWorkflowProfile({
      idHint: "game-server-workflow-profile",
      status: "blocked",
      identity: "Game server workflow profile identity: game-server-workflow-profile reviews game/server/world builder readiness without creating server files, running server commands, calling runtimes, or launching servers.",
      sections: [
        { label: "Game/server groups", items: ["Game/server groups: world concept, project scaffold, file templates, command/runtime lane, validation/package lane, evidence/result/recovery/export, and operator handoff stay review-only."] },
        { label: "Original fantasy server lane", items: ["Original medieval fantasy server inspired by ice, fire, castles, houses, and kingdoms. No copied franchise assets, names, logos, maps, dialogue, music, character likenesses, or protected assets are allowed."] },
        { label: "Project scaffold lane", items: ["Project scaffold lane: project structure, configuration, plugin plan, dependency plan, and file write boundary must be reviewed before any future scaffold is created."] },
        { label: "File template lane", items: ["File template lane: server properties, config templates, permissions, docs, and world notes require file write approval and diff preview before any future write."] },
        { label: "Command/runtime lane", items: ["Command/runtime lane: setup commands, validation commands, server launch, ports, process lifecycle, logs, and stop plan require command and local runtime approval boundaries."] },
        { label: "Validation/package lane", items: ["Validation/package lane: validation, smoke checks, package bundle, export destination, release readiness, evidence, result review, and recovery stay blocked until approved."] },
        { label: "Copyright/trademark safety lane", items: ["Copyright/trademark safety lane: use original setting, original names, original lore, original maps, original dialogue, original music, and no protected franchise copying."] },
        { label: "Denied game/server actions", items: ["Denied game/server actions: create server files, build projects, run server commands, launch servers, call providers, call local runtimes, call connectors, export packages, or apply patches from UI."] },
        { label: "Unresolved game/server blockers", items: ["Unresolved game/server blockers: missing file write boundary, command execution boundary, local runtime boundary, validation/package boundary, copyright/trademark review, evidence route, and result review keep unsafe or infringing game/server workflows blocked."] },
      ],
      routes: ["/workflow-profile-registry", "/file-write-approval-boundary", "/command-execution-approval-boundary", "/local-runtime-approval-boundary"],
      nextRecommendedAction: "Next recommended action: keep game/server building blocked, review original concept and safety lanes, then route file, command, and runtime boundaries before explicit operator approval.",
      advancedDetails: `Advanced game server workflow profile details: Game server workflow profile does not build or launch servers. Game/server building requires explicit operator approval. Unsafe or infringing game/server workflows stay blocked. Original medieval fantasy server. No copied franchise assets. ${UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS.join("; ")}.`,
    }),
  ];
}

export function buildGameServerWorkflowProfileBoundary(): GameServerWorkflowProfileBoundary {
  return buildUniversalExecutionReviewBoundary();
}

export function summarizeGameServerWorkflowProfile(model: Pick<GameServerWorkflowProfileModel, "gameServerWorkflowProfiles">): string {
  return "Game server workflow profile reviews " + model.gameServerWorkflowProfiles.length + " game/server profile packet without building or launching servers. Game/server building requires explicit operator approval, and unsafe or infringing game/server workflows stay blocked.";
}

export function buildGameServerWorkflowProfileModel(): GameServerWorkflowProfileModel {
  const gameServerWorkflowProfiles = buildGameServerWorkflowProfiles();
  const model: GameServerWorkflowProfileModel = {
    title: "Game server workflow profile",
    summary: "",
    reviewPackets: gameServerWorkflowProfiles,
    gameServerWorkflowProfiles,
    boundary: buildGameServerWorkflowProfileBoundary(),
    language: [...GAME_SERVER_WORKFLOW_PROFILE_LANGUAGE],
    advancedDetails: [
      "Game server workflow profile identity",
      "Game/server groups",
      "Original fantasy server lane",
      "Project scaffold lane",
      "File template lane",
      "Command/runtime lane",
      "Validation/package lane",
      "Copyright/trademark safety lane",
      "Denied game/server actions",
      "Unresolved game/server blockers",
      "Workflow profile registry route",
      "File write boundary route",
      "Command execution boundary route",
      "Local runtime boundary route",
      "Next recommended action",
      "advanced game server workflow profile details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeGameServerWorkflowProfile(model) };
}
