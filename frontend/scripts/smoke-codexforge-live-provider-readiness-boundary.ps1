param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 906 Live Provider Readiness Boundary" `
  -ScriptFile "smoke-codexforge-live-provider-readiness-boundary.ps1" `
  -Domain "src\lib\codexforge\live-provider-readiness-boundary" `
  -Route "src\app\live-provider-readiness-boundary" `
  -MainPanel "LiveProviderReadinessBoundaryPanel" `
  -CommandLabel "Go to Live Provider Readiness Boundary" `
  -Modules @("live-provider-readiness-boundary-model.ts", "index.ts") `
  -Components @("LiveProviderReadinessBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildLiveProviderReadinessBoundaryStableKey", "buildLiveProviderReadinessBoundary", "buildLiveProviderReadinessBoundaryItems", "buildLiveProviderReadinessBoundaryBoundary", "buildLiveProviderReadinessBoundaryModel", "summarizeLiveProviderReadinessBoundary", "LIVE_PROVIDER_READINESS_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Live provider readiness boundary", "Live provider readiness boundary does not test live providers", "Provider readiness requires explicit operator approval", "All providers use the shared CodexForge brain", "Denied live provider readiness paths remain blocked", "Live provider readiness checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Live provider readiness boundary does not test live providers", "Provider readiness requires explicit operator approval", "Denied live provider readiness paths remain blocked") `
  -RouteHref "/live-provider-readiness-boundary"

Write-Host "[OK] CodexForge Phase 906 live provider readiness boundary smoke passed."
