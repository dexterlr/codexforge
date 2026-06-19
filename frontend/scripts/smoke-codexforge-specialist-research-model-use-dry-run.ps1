param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 899 Specialist Research Model Use Dry-Run" `
  -ScriptFile "smoke-codexforge-specialist-research-model-use-dry-run.ps1" `
  -Domain "src\lib\codexforge\specialist-research-model-use-dry-run" `
  -Route "src\app\specialist-research-model-use-dry-run" `
  -MainPanel "SpecialistResearchModelUseDryRunPanel" `
  -CommandLabel "Go to Specialist Research Model Use Dry-Run" `
  -Modules @("specialist-research-model-use-dry-run-model.ts", "index.ts") `
  -Components @("SpecialistResearchModelUseDryRunPanel.tsx", "index.ts") `
  -Exports @("buildSpecialistResearchModelUseDryRunStableKey", "buildSpecialistResearchModelUseDryRun", "buildSpecialistResearchModelUseDryRunItems", "buildSpecialistResearchModelUseDryRunBoundary", "buildSpecialistResearchModelUseDryRunModel", "summarizeSpecialistResearchModelUseDryRun", "SPECIALIST_RESEARCH_MODEL_USE_DRY_RUN_LANGUAGE") `
  -PhaseMarkers @("Specialist research model use dry-run", "Specialist research model use dry-run does not call research models", "Research model use requires explicit operator approval", "Research models use shared CodexForge memory and knowledge", "Denied research model-use paths remain blocked", "Specialist research model-use checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Specialist research model use dry-run does not call research models", "Research model use requires explicit operator approval", "Denied research model-use paths remain blocked") `
  -RouteHref "/specialist-research-model-use-dry-run"

Write-Host "[OK] CodexForge Phase 899 Specialist research model use dry-run smoke passed."

