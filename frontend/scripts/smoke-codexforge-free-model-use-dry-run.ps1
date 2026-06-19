param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 893 Free Model Use Dry-Run" `
  -ScriptFile "smoke-codexforge-free-model-use-dry-run.ps1" `
  -Domain "src\lib\codexforge\free-model-use-dry-run" `
  -Route "src\app\free-model-use-dry-run" `
  -MainPanel "FreeModelUseDryRunPanel" `
  -CommandLabel "Go to Free Model Use Dry-Run" `
  -Modules @("free-model-use-dry-run-model.ts", "index.ts") `
  -Components @("FreeModelUseDryRunPanel.tsx", "index.ts") `
  -Exports @("buildFreeModelUseDryRunStableKey", "buildFreeModelUseDryRun", "buildFreeModelUseDryRunItems", "buildFreeModelUseDryRunBoundary", "buildFreeModelUseDryRunModel", "summarizeFreeModelUseDryRun", "FREE_MODEL_USE_DRY_RUN_LANGUAGE") `
  -PhaseMarkers @("Free model use dry-run", "Free model use dry-run does not call free models", "Free model use requires explicit operator approval", "Free models use shared CodexForge memory and knowledge", "Denied free model-use paths remain blocked", "Free model-use checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Free model use dry-run does not call free models", "Free model use requires explicit operator approval", "Denied free model-use paths remain blocked") `
  -RouteHref "/free-model-use-dry-run"

Write-Host "[OK] CodexForge Phase 893 Free model use dry-run smoke passed."

