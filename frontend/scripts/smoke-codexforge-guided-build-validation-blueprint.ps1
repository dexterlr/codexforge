param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1027 Guided Build Validation Blueprint" `
  -ScriptFile "smoke-codexforge-guided-build-validation-blueprint.ps1" `
  -Domain "src\lib\codexforge\guided-build-validation-blueprint" `
  -Route "src\app\guided-build-validation-blueprint" `
  -MainPanel "GuidedBuildValidationBlueprintPanel" `
  -CommandLabel "Go to Guided Build Validation Blueprint" `
  -Modules @("guided-build-validation-blueprint-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuidedBuildValidationBlueprintStableKey", "buildGuidedBuildValidationBlueprint", "buildGuidedBuildValidationBlueprintItems", "buildGuidedBuildValidationBlueprintBoundary", "buildGuidedBuildValidationBlueprintModel", "summarizeGuidedBuildValidationBlueprint", "GUIDED_BUILD_VALIDATION_BLUEPRINT_LANGUAGE") `
  -PhaseMarkers @("Guided build validation blueprint", "Guided build validation blueprint does not run validation", "Validation blueprint review requires explicit operator approval", "Validation blueprints include planned tests and smoke checks", "Denied guided build validation blueprint paths remain blocked", "Guided build validation blueprint checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guided build validation blueprint does not run validation", "Validation blueprint review requires explicit operator approval", "Denied guided build validation blueprint paths remain blocked") `
  -RouteHref "/guided-build-validation-blueprint"

Write-Host "[OK] CodexForge Phase 1027 Guided Build Validation Blueprint smoke passed."
