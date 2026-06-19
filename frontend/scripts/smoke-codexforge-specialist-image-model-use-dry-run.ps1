param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 897 Specialist Image Model Use Dry-Run" `
  -ScriptFile "smoke-codexforge-specialist-image-model-use-dry-run.ps1" `
  -Domain "src\lib\codexforge\specialist-image-model-use-dry-run" `
  -Route "src\app\specialist-image-model-use-dry-run" `
  -MainPanel "SpecialistImageModelUseDryRunPanel" `
  -CommandLabel "Go to Specialist Image Model Use Dry-Run" `
  -Modules @("specialist-image-model-use-dry-run-model.ts", "index.ts") `
  -Components @("SpecialistImageModelUseDryRunPanel.tsx", "index.ts") `
  -Exports @("buildSpecialistImageModelUseDryRunStableKey", "buildSpecialistImageModelUseDryRun", "buildSpecialistImageModelUseDryRunItems", "buildSpecialistImageModelUseDryRunBoundary", "buildSpecialistImageModelUseDryRunModel", "summarizeSpecialistImageModelUseDryRun", "SPECIALIST_IMAGE_MODEL_USE_DRY_RUN_LANGUAGE") `
  -PhaseMarkers @("Specialist image model use dry-run", "Specialist image model use dry-run does not call image models", "Image model use requires explicit operator approval", "Image models use shared CodexForge memory and knowledge", "Denied image model-use paths remain blocked", "Specialist image model-use checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Specialist image model use dry-run does not call image models", "Image model use requires explicit operator approval", "Denied image model-use paths remain blocked") `
  -RouteHref "/specialist-image-model-use-dry-run"

Write-Host "[OK] CodexForge Phase 897 Specialist image model use dry-run smoke passed."

