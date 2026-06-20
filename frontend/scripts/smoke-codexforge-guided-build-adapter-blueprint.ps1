param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1026 Guided Build Adapter Blueprint" `
  -ScriptFile "smoke-codexforge-guided-build-adapter-blueprint.ps1" `
  -Domain "src\lib\codexforge\guided-build-adapter-blueprint" `
  -Route "src\app\guided-build-adapter-blueprint" `
  -MainPanel "GuidedBuildAdapterBlueprintPanel" `
  -CommandLabel "Go to Guided Build Adapter Blueprint" `
  -Modules @("guided-build-adapter-blueprint-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuidedBuildAdapterBlueprintStableKey", "buildGuidedBuildAdapterBlueprint", "buildGuidedBuildAdapterBlueprintItems", "buildGuidedBuildAdapterBlueprintBoundary", "buildGuidedBuildAdapterBlueprintModel", "summarizeGuidedBuildAdapterBlueprint", "GUIDED_BUILD_ADAPTER_BLUEPRINT_LANGUAGE") `
  -PhaseMarkers @("Guided build adapter blueprint", "Guided build adapter blueprint does not execute adapters", "Adapter blueprint review requires explicit operator approval", "Adapter blueprints include backend and domain adapter gates", "Denied guided build adapter blueprint paths remain blocked", "Guided build adapter blueprint checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guided build adapter blueprint does not execute adapters", "Adapter blueprint review requires explicit operator approval", "Denied guided build adapter blueprint paths remain blocked") `
  -RouteHref "/guided-build-adapter-blueprint"

Write-Host "[OK] CodexForge Phase 1026 Guided Build Adapter Blueprint smoke passed."
