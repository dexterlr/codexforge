"use client";

import { UniversalExecutionReviewSurface } from "@/lib/codexforge/universal-execution-review-kit";
import { buildGameServerWorkflowProfileModel } from "@/lib/codexforge/game-server-workflow-profile";

const GAME_SERVER_WORKFLOW_PROFILE_MARKERS = [
  "Game server workflow profile",
  "Game server workflow profile does not build or launch servers",
  "Game/server building requires explicit operator approval",
  "Unsafe or infringing game/server workflows stay blocked",
  "Original medieval fantasy server",
  "No copied franchise assets",
] as const;

export function GameServerWorkflowProfilePanel() {
  const model = buildGameServerWorkflowProfileModel();

  return (
    <UniversalExecutionReviewSurface
      phase="Phase 633"
      title="Game server workflow profile"
      subtitle="Game server workflow profile reviews server and world builder readiness without building or launching servers. Game/server building requires explicit operator approval, and unsafe or infringing game/server workflows stay blocked."
      primaryLabel="Review game server profile"
      anchor="game-server-workflow-profile"
      plainEnglishTitle="Plain-English game server workflow profile"
      plainEnglishCopy="This page prepares a future original medieval fantasy server inspired by ice, fire, castles, houses, and kingdoms. It does not create server files, run server commands, call providers/local runtimes/connectors, export packages, or launch servers. No copied franchise assets, names, logos, maps, dialogue, music, character likenesses, or protected assets are allowed."
      language={model.language}
      markers={[...GAME_SERVER_WORKFLOW_PROFILE_MARKERS]}
      links={[
        { href: "/workflow-profile-registry", label: "Workflow registry" },
        { href: "/file-write-approval-boundary", label: "File write boundary" },
        { href: "/command-execution-approval-boundary", label: "Command boundary" },
        { href: "/local-runtime-approval-boundary", label: "Runtime boundary" },
      ]}
      packets={model.gameServerWorkflowProfiles}
      advancedSummary="Advanced game server workflow profile details"
      advancedDetails={model.advancedDetails}
      advancedCopy="advanced game server workflow profile details collapsed/secondary. This route does not create server files, run server commands, call providers, call local runtimes, call connectors, export packages, launch servers, or copy protected franchise material."
      dataScope="game-server-workflow-profile buildGameServerWorkflowProfileStableKey GameServerWorkflowProfilePanel"
    />
  );
}
