param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 896 Specialist Video Model Use Dry-Run" `
  -ScriptFile "smoke-codexforge-specialist-video-model-use-dry-run.ps1" `
  -Domain "src\lib\codexforge\specialist-video-model-use-dry-run" `
  -Route "src\app\specialist-video-model-use-dry-run" `
  -MainPanel "SpecialistVideoModelUseDryRunPanel" `
  -CommandLabel "Go to Specialist Video Model Use Dry-Run" `
  -Modules @("specialist-video-model-use-dry-run-model.ts", "index.ts") `
  -Components @("SpecialistVideoModelUseDryRunPanel.tsx", "index.ts") `
  -Exports @("buildSpecialistVideoModelUseDryRunStableKey", "buildSpecialistVideoModelUseDryRun", "buildSpecialistVideoModelUseDryRunItems", "buildSpecialistVideoModelUseDryRunBoundary", "buildSpecialistVideoModelUseDryRunModel", "summarizeSpecialistVideoModelUseDryRun", "SPECIALIST_VIDEO_MODEL_USE_DRY_RUN_LANGUAGE") `
  -PhaseMarkers @("Specialist video model use dry-run", "Specialist video model use dry-run does not call video models", "Video model use requires explicit operator approval", "Video models use shared CodexForge memory and knowledge", "Denied video model-use paths remain blocked", "Specialist video model-use checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Specialist video model use dry-run does not call video models", "Video model use requires explicit operator approval", "Denied video model-use paths remain blocked") `
  -RouteHref "/specialist-video-model-use-dry-run"

Write-Host "[OK] CodexForge Phase 896 Specialist video model use dry-run smoke passed."

