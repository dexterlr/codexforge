param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1034 Build Plan Bundle Boundary" `
  -ScriptFile "smoke-codexforge-build-plan-bundle-boundary.ps1" `
  -Domain "src\lib\codexforge\build-plan-bundle-boundary" `
  -Route "src\app\build-plan-bundle-boundary" `
  -MainPanel "BuildPlanBundleBoundaryPanel" `
  -CommandLabel "Go to Build Plan Bundle Boundary" `
  -Modules @("build-plan-bundle-boundary-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanBundleBoundaryStableKey", "buildBuildPlanBundleBoundary", "buildBuildPlanBundleBoundaryItems", "buildBuildPlanBundleBoundaryBoundary", "buildBuildPlanBundleBoundaryModel", "summarizeBuildPlanBundleBoundary", "BUILD_PLAN_BUNDLE_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Build plan bundle boundary", "Build plan bundle boundary does not execute builds", "Build plan bundle execution requires explicit operator approval", "Build plan bundles support game and non-game targets", "Denied build plan bundle paths remain blocked", "Build plan bundle checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan bundle boundary does not execute builds", "Build plan bundle execution requires explicit operator approval", "Denied build plan bundle paths remain blocked") `
  -RouteHref "/build-plan-bundle-boundary"

Write-Host "[OK] CodexForge Phase 1034 Build Plan Bundle Boundary smoke passed."
