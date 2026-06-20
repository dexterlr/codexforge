param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1020 Guided Build Target Selection" `
  -ScriptFile "smoke-codexforge-guided-build-target-selection.ps1" `
  -Domain "src\lib\codexforge\guided-build-target-selection" `
  -Route "src\app\guided-build-target-selection" `
  -MainPanel "GuidedBuildTargetSelectionPanel" `
  -CommandLabel "Go to Guided Build Target Selection" `
  -Modules @("guided-build-target-selection-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuidedBuildTargetSelectionStableKey", "buildGuidedBuildTargetSelection", "buildGuidedBuildTargetSelectionItems", "buildGuidedBuildTargetSelectionBoundary", "buildGuidedBuildTargetSelectionModel", "summarizeGuidedBuildTargetSelection", "GUIDED_BUILD_TARGET_SELECTION_LANGUAGE") `
  -PhaseMarkers @("Guided build target selection", "Guided build target selection does not route live requests", "Target selection requires explicit operator approval", "Target selection supports games apps websites dashboards tools research automation creative trading data docs and integrations", "Denied guided build target paths remain blocked", "Guided build target checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guided build target selection does not route live requests", "Target selection requires explicit operator approval", "Denied guided build target paths remain blocked") `
  -RouteHref "/guided-build-target-selection"

Write-Host "[OK] CodexForge Phase 1020 Guided Build Target Selection smoke passed."
