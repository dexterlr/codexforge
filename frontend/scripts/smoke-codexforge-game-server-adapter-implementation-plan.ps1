param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 712 Game Server Adapter Implementation Plan" `
  -ScriptFile "smoke-codexforge-game-server-adapter-implementation-plan.ps1" `
  -Domain "src\lib\codexforge\game-server-adapter-implementation-plan" `
  -Route "src\app\game-server-adapter-implementation-plan" `
  -MainPanel "GameServerAdapterImplementationPlanPanel" `
  -CommandLabel "Go to Game Server Adapter Implementation Plan" `
  -Modules @("game-server-adapter-implementation-plan-model.ts", "index.ts") `
  -Components @("GameServerAdapterImplementationPlanPanel.tsx", "index.ts") `
  -Exports @("buildGameServerAdapterImplementationPlanStableKey", "buildGameServerAdapterImplementationPlan", "buildGameServerAdapterImplementationPlans", "buildGameServerAdapterImplementationPlanBoundary", "buildGameServerAdapterImplementationPlanModel", "summarizeGameServerAdapterImplementationPlan", "GAME_SERVER_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE") `
  -PhaseMarkers @("Game Server Adapter Implementation Plan", "Game server adapter implementation plan does not build or launch servers", "Game/server adapter implementation requires explicit operator approval", "Implementation inputs", "Implementation outputs", "Original medieval fantasy server scope", "Original medieval fantasy", "Scaffold policy", "Template policy", "File write policy", "Command/runtime policy", "Validation/packaging policy", "Copyright/trademark policy", "No copied franchise assets", "Tests/smokes", "Denied actions") `
  -PlainEnglish @("Game server adapter implementation plan identity", "implementation plan only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action") `
  -RouteHref "/game-server-adapter-implementation-plan"

Write-Host "[OK] CodexForge Phase 712 game server adapter implementation plan smoke passed."
