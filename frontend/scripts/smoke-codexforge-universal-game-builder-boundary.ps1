param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 970 Universal Game Builder Boundary" `
  -ScriptFile "smoke-codexforge-universal-game-builder-boundary.ps1" `
  -Domain "src\lib\codexforge\universal-game-builder-boundary" `
  -Route "src\app\universal-game-builder-boundary" `
  -MainPanel "UniversalGameBuilderBoundaryPanel" `
  -CommandLabel "Go to Universal Game Builder Boundary" `
  -Modules @("universal-game-builder-boundary-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildUniversalGameBuilderBoundaryStableKey", "buildUniversalGameBuilderBoundary", "buildUniversalGameBuilderBoundaryItems", "buildUniversalGameBuilderBoundaryBoundary", "buildUniversalGameBuilderBoundaryModel", "summarizeUniversalGameBuilderBoundary", "UNIVERSAL_GAME_BUILDER_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Universal game builder boundary", "Universal game builder boundary does not start game servers", "Game builder execution requires explicit operator approval", "Game targets are not limited to Minecraft", "Denied universal game builder paths remain blocked", "Universal game builder checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Universal game builder boundary does not start game servers", "Game builder execution requires explicit operator approval", "Denied universal game builder paths remain blocked") `
  -RouteHref "/universal-game-builder-boundary"

Write-Host "[OK] CodexForge Phase 970 Universal Game Builder Boundary smoke passed."