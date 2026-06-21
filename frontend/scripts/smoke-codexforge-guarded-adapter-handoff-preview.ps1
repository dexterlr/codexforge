param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1071 Guarded Adapter Handoff Preview" `
  -ScriptFile "smoke-codexforge-guarded-adapter-handoff-preview.ps1" `
  -Domain "src\lib\codexforge\guarded-adapter-handoff-preview" `
  -Route "src\app\guarded-adapter-handoff-preview" `
  -MainPanel "GuardedAdapterHandoffPreviewPanel" `
  -CommandLabel "Go to Guarded Adapter Handoff Preview" `
  -Modules @("guarded-adapter-handoff-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuardedAdapterHandoffPreviewStableKey", "buildGuardedAdapterHandoffPreview", "buildGuardedAdapterHandoffPreviewItems", "buildGuardedAdapterHandoffPreviewBoundary", "buildGuardedAdapterHandoffPreviewModel", "summarizeGuardedAdapterHandoffPreview", "GUARDED_ADAPTER_HANDOFF_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Guarded adapter handoff preview", "Guarded adapter handoff preview does not execute adapters", "Adapter handoff requires explicit operator approval", "Adapter handoffs show backend adapter gates", "Denied guarded adapter handoff paths remain blocked", "Guarded adapter handoff checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guarded adapter handoff preview does not execute adapters", "Adapter handoff requires explicit operator approval", "Denied guarded adapter handoff paths remain blocked") `
  -RouteHref "/guarded-adapter-handoff-preview"

Write-Host "[OK] CodexForge Phase 1071 Guarded Adapter Handoff Preview smoke passed."
