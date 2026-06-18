param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 725 First Game Server Adapter MVP Design" `
  -ScriptFile "smoke-codexforge-first-game-server-adapter-mvp-design.ps1" `
  -Domain "src\lib\codexforge\first-game-server-adapter-mvp-design" `
  -Route "src\app\first-game-server-adapter-mvp-design" `
  -MainPanel "FirstGameServerAdapterMvpDesignPanel" `
  -CommandLabel "Go to First Game Server Adapter MVP Design" `
  -Modules @("first-game-server-adapter-mvp-design-model.ts", "index.ts") `
  -Components @("FirstGameServerAdapterMvpDesignPanel.tsx", "index.ts") `
  -Exports @("buildFirstGameServerAdapterMvpDesignStableKey", "buildFirstGameServerAdapterMvpDesign", "buildFirstGameServerAdapterMvpDesigns", "buildFirstGameServerAdapterMvpDesignBoundary", "buildFirstGameServerAdapterMvpDesignModel", "summarizeFirstGameServerAdapterMvpDesign", "FIRST_GAME_SERVER_ADAPTER_MVP_DESIGN_LANGUAGE") `
  -PhaseMarkers @("First Game Server Adapter MVP Design", "First game server adapter MVP design does not build or launch servers", "Game/server adapter MVP requires explicit operator approval", "Game/server interface shape", "Original medieval fantasy server scope", "Original medieval fantasy", "Scaffold dependency", "Template policy", "File write dependency", "Command/runtime dependency", "Validation/packaging dependency", "Copyright/trademark policy", "No copied franchise assets", "Test harness needs", "Implementation blockers") `
  -PlainEnglish @("First Game Server Adapter MVP Design identity", "MVP design only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "ready for implementation gates") `
  -RouteHref "/first-game-server-adapter-mvp-design"

Write-Host "[OK] CodexForge Phase 725 first game server adapter mvp design smoke passed."
