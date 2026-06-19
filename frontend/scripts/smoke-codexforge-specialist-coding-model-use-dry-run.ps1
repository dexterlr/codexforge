param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 898 Specialist Coding Model Use Dry-Run" `
  -ScriptFile "smoke-codexforge-specialist-coding-model-use-dry-run.ps1" `
  -Domain "src\lib\codexforge\specialist-coding-model-use-dry-run" `
  -Route "src\app\specialist-coding-model-use-dry-run" `
  -MainPanel "SpecialistCodingModelUseDryRunPanel" `
  -CommandLabel "Go to Specialist Coding Model Use Dry-Run" `
  -Modules @("specialist-coding-model-use-dry-run-model.ts", "index.ts") `
  -Components @("SpecialistCodingModelUseDryRunPanel.tsx", "index.ts") `
  -Exports @("buildSpecialistCodingModelUseDryRunStableKey", "buildSpecialistCodingModelUseDryRun", "buildSpecialistCodingModelUseDryRunItems", "buildSpecialistCodingModelUseDryRunBoundary", "buildSpecialistCodingModelUseDryRunModel", "summarizeSpecialistCodingModelUseDryRun", "SPECIALIST_CODING_MODEL_USE_DRY_RUN_LANGUAGE") `
  -PhaseMarkers @("Specialist coding model use dry-run", "Specialist coding model use dry-run does not call coding models", "Coding model use requires explicit operator approval", "Coding models use shared CodexForge memory and knowledge", "Denied coding model-use paths remain blocked", "Specialist coding model-use checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Specialist coding model use dry-run does not call coding models", "Coding model use requires explicit operator approval", "Denied coding model-use paths remain blocked") `
  -RouteHref "/specialist-coding-model-use-dry-run"

Write-Host "[OK] CodexForge Phase 898 Specialist coding model use dry-run smoke passed."

