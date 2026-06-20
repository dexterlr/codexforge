param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1021 Guided Build Requirement Checklist" `
  -ScriptFile "smoke-codexforge-guided-build-requirement-checklist.ps1" `
  -Domain "src\lib\codexforge\guided-build-requirement-checklist" `
  -Route "src\app\guided-build-requirement-checklist" `
  -MainPanel "GuidedBuildRequirementChecklistPanel" `
  -CommandLabel "Go to Guided Build Requirement Checklist" `
  -Modules @("guided-build-requirement-checklist-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuidedBuildRequirementChecklistStableKey", "buildGuidedBuildRequirementChecklist", "buildGuidedBuildRequirementChecklistItems", "buildGuidedBuildRequirementChecklistBoundary", "buildGuidedBuildRequirementChecklistModel", "summarizeGuidedBuildRequirementChecklist", "GUIDED_BUILD_REQUIREMENT_CHECKLIST_LANGUAGE") `
  -PhaseMarkers @("Guided build requirement checklist", "Guided build requirement checklist does not create tasks", "Requirement checklist review requires explicit operator approval", "Requirement checklists preserve latest-message authority", "Denied guided build requirement paths remain blocked", "Guided build requirement checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guided build requirement checklist does not create tasks", "Requirement checklist review requires explicit operator approval", "Denied guided build requirement paths remain blocked") `
  -RouteHref "/guided-build-requirement-checklist"

Write-Host "[OK] CodexForge Phase 1021 Guided Build Requirement Checklist smoke passed."
