param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1025 Guided Build Runtime Blueprint" `
  -ScriptFile "smoke-codexforge-guided-build-runtime-blueprint.ps1" `
  -Domain "src\lib\codexforge\guided-build-runtime-blueprint" `
  -Route "src\app\guided-build-runtime-blueprint" `
  -MainPanel "GuidedBuildRuntimeBlueprintPanel" `
  -CommandLabel "Go to Guided Build Runtime Blueprint" `
  -Modules @("guided-build-runtime-blueprint-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuidedBuildRuntimeBlueprintStableKey", "buildGuidedBuildRuntimeBlueprint", "buildGuidedBuildRuntimeBlueprintItems", "buildGuidedBuildRuntimeBlueprintBoundary", "buildGuidedBuildRuntimeBlueprintModel", "summarizeGuidedBuildRuntimeBlueprint", "GUIDED_BUILD_RUNTIME_BLUEPRINT_LANGUAGE") `
  -PhaseMarkers @("Guided build runtime blueprint", "Guided build runtime blueprint does not start runtimes", "Runtime blueprint review requires explicit operator approval", "Runtime blueprints include planned runtimes without launch", "Denied guided build runtime blueprint paths remain blocked", "Guided build runtime blueprint checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guided build runtime blueprint does not start runtimes", "Runtime blueprint review requires explicit operator approval", "Denied guided build runtime blueprint paths remain blocked") `
  -RouteHref "/guided-build-runtime-blueprint"

Write-Host "[OK] CodexForge Phase 1025 Guided Build Runtime Blueprint smoke passed."
