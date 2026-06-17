param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 633 Game Server Workflow Profile" `
  -ScriptFile "smoke-codexforge-game-server-workflow-profile.ps1" `
  -Domain "src\lib\codexforge\game-server-workflow-profile" `
  -Route "src\app\game-server-workflow-profile" `
  -MainPanel "GameServerWorkflowProfilePanel" `
  -CommandLabel "Go to Game Server Workflow Profile" `
  -Modules @("game-server-workflow-profile-types.ts", "game-server-workflow-profile-summary.ts", "index.ts") `
  -Components @("GameServerWorkflowProfilePanel.tsx", "index.ts") `
  -Exports @("buildGameServerWorkflowProfileStableKey", "buildGameServerWorkflowProfile", "buildGameServerWorkflowProfiles", "buildGameServerWorkflowProfileBoundary", "buildGameServerWorkflowProfileModel", "summarizeGameServerWorkflowProfile", "GAME_SERVER_WORKFLOW_PROFILE_LANGUAGE") `
  -PhaseMarkers @("Game server workflow profile", "Game server workflow profile does not build or launch servers", "Game/server building requires explicit operator approval", "Unsafe or infringing game/server workflows stay blocked", "Original medieval fantasy server", "No copied franchise assets") `
  -PlainEnglish @("Game server workflow profile identity", "Game/server groups", "Original fantasy server lane", "Project scaffold lane", "File template lane", "Command/runtime lane", "Validation/package lane", "Copyright/trademark safety lane", "Denied game/server actions", "Unresolved game/server blockers", "Workflow profile registry route", "File write boundary route", "Command execution boundary route", "Local runtime boundary route", "Next recommended action") `
  -RouteHref "/game-server-workflow-profile"

Write-Host "[OK] CodexForge Phase 633 game server workflow profile smoke passed."
