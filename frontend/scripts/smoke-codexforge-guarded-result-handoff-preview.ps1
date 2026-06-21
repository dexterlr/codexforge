param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1074 Guarded Result Handoff Preview" `
  -ScriptFile "smoke-codexforge-guarded-result-handoff-preview.ps1" `
  -Domain "src\lib\codexforge\guarded-result-handoff-preview" `
  -Route "src\app\guarded-result-handoff-preview" `
  -MainPanel "GuardedResultHandoffPreviewPanel" `
  -CommandLabel "Go to Guarded Result Handoff Preview" `
  -Modules @("guarded-result-handoff-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuardedResultHandoffPreviewStableKey", "buildGuardedResultHandoffPreview", "buildGuardedResultHandoffPreviewItems", "buildGuardedResultHandoffPreviewBoundary", "buildGuardedResultHandoffPreviewModel", "summarizeGuardedResultHandoffPreview", "GUARDED_RESULT_HANDOFF_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Guarded result handoff preview", "Guarded result handoff preview does not persist results", "Result handoff requires explicit operator approval", "Result handoffs route future outputs through shared result review", "Denied guarded result handoff paths remain blocked", "Guarded result handoff checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guarded result handoff preview does not persist results", "Result handoff requires explicit operator approval", "Denied guarded result handoff paths remain blocked") `
  -RouteHref "/guarded-result-handoff-preview"

Write-Host "[OK] CodexForge Phase 1074 Guarded Result Handoff Preview smoke passed."
