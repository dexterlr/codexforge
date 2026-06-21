param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1070 Guarded Runtime Handoff Preview" `
  -ScriptFile "smoke-codexforge-guarded-runtime-handoff-preview.ps1" `
  -Domain "src\lib\codexforge\guarded-runtime-handoff-preview" `
  -Route "src\app\guarded-runtime-handoff-preview" `
  -MainPanel "GuardedRuntimeHandoffPreviewPanel" `
  -CommandLabel "Go to Guarded Runtime Handoff Preview" `
  -Modules @("guarded-runtime-handoff-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuardedRuntimeHandoffPreviewStableKey", "buildGuardedRuntimeHandoffPreview", "buildGuardedRuntimeHandoffPreviewItems", "buildGuardedRuntimeHandoffPreviewBoundary", "buildGuardedRuntimeHandoffPreviewModel", "summarizeGuardedRuntimeHandoffPreview", "GUARDED_RUNTIME_HANDOFF_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Guarded runtime handoff preview", "Guarded runtime handoff preview does not start runtimes", "Runtime handoff requires explicit operator approval", "Runtime handoffs show planned runtime launches without execution", "Denied guarded runtime handoff paths remain blocked", "Guarded runtime handoff checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guarded runtime handoff preview does not start runtimes", "Runtime handoff requires explicit operator approval", "Denied guarded runtime handoff paths remain blocked") `
  -RouteHref "/guarded-runtime-handoff-preview"

Write-Host "[OK] CodexForge Phase 1070 Guarded Runtime Handoff Preview smoke passed."
