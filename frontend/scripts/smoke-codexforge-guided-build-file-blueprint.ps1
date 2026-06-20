param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1023 Guided Build File Blueprint" `
  -ScriptFile "smoke-codexforge-guided-build-file-blueprint.ps1" `
  -Domain "src\lib\codexforge\guided-build-file-blueprint" `
  -Route "src\app\guided-build-file-blueprint" `
  -MainPanel "GuidedBuildFileBlueprintPanel" `
  -CommandLabel "Go to Guided Build File Blueprint" `
  -Modules @("guided-build-file-blueprint-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuidedBuildFileBlueprintStableKey", "buildGuidedBuildFileBlueprint", "buildGuidedBuildFileBlueprintItems", "buildGuidedBuildFileBlueprintBoundary", "buildGuidedBuildFileBlueprintModel", "summarizeGuidedBuildFileBlueprint", "GUIDED_BUILD_FILE_BLUEPRINT_LANGUAGE") `
  -PhaseMarkers @("Guided build file blueprint", "Guided build file blueprint does not write files", "File blueprint review requires explicit operator approval", "File blueprints include planned files without mutation", "Denied guided build file blueprint paths remain blocked", "Guided build file blueprint checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guided build file blueprint does not write files", "File blueprint review requires explicit operator approval", "Denied guided build file blueprint paths remain blocked") `
  -RouteHref "/guided-build-file-blueprint"

Write-Host "[OK] CodexForge Phase 1023 Guided Build File Blueprint smoke passed."
