param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1024 Guided Build Command Blueprint" `
  -ScriptFile "smoke-codexforge-guided-build-command-blueprint.ps1" `
  -Domain "src\lib\codexforge\guided-build-command-blueprint" `
  -Route "src\app\guided-build-command-blueprint" `
  -MainPanel "GuidedBuildCommandBlueprintPanel" `
  -CommandLabel "Go to Guided Build Command Blueprint" `
  -Modules @("guided-build-command-blueprint-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuidedBuildCommandBlueprintStableKey", "buildGuidedBuildCommandBlueprint", "buildGuidedBuildCommandBlueprintItems", "buildGuidedBuildCommandBlueprintBoundary", "buildGuidedBuildCommandBlueprintModel", "summarizeGuidedBuildCommandBlueprint", "GUIDED_BUILD_COMMAND_BLUEPRINT_LANGUAGE") `
  -PhaseMarkers @("Guided build command blueprint", "Guided build command blueprint does not run commands", "Command blueprint review requires explicit operator approval", "Command blueprints include planned commands without execution", "Denied guided build command blueprint paths remain blocked", "Guided build command blueprint checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guided build command blueprint does not run commands", "Command blueprint review requires explicit operator approval", "Denied guided build command blueprint paths remain blocked") `
  -RouteHref "/guided-build-command-blueprint"

Write-Host "[OK] CodexForge Phase 1024 Guided Build Command Blueprint smoke passed."
