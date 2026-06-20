param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1002 Universal Builder Cockpit Boundary" `
  -ScriptFile "smoke-codexforge-universal-builder-cockpit-boundary.ps1" `
  -Domain "src\lib\codexforge\universal-builder-cockpit-boundary" `
  -Route "src\app\universal-builder-cockpit-boundary" `
  -MainPanel "UniversalBuilderCockpitBoundaryPanel" `
  -CommandLabel "Go to Universal Builder Cockpit Boundary" `
  -Modules @("universal-builder-cockpit-boundary-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildUniversalBuilderCockpitBoundaryStableKey", "buildUniversalBuilderCockpitBoundary", "buildUniversalBuilderCockpitBoundaryItems", "buildUniversalBuilderCockpitBoundaryBoundary", "buildUniversalBuilderCockpitBoundaryModel", "summarizeUniversalBuilderCockpitBoundary", "UNIVERSAL_BUILDER_COCKPIT_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Universal builder cockpit boundary", "Universal builder cockpit boundary does not execute builds", "Universal builder cockpit execution requires explicit operator approval", "Build anything goals support games apps websites dashboards tools research automation creative trading data docs and integrations", "Denied universal builder cockpit paths remain blocked", "Universal builder cockpit checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Universal builder cockpit boundary does not execute builds", "Universal builder cockpit execution requires explicit operator approval", "Denied universal builder cockpit paths remain blocked") `
  -RouteHref "/universal-builder-cockpit-boundary"

Write-Host "[OK] CodexForge Phase 1002 Universal Builder Cockpit Boundary smoke passed."
