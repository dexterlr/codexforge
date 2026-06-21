param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1076 Guarded Packaging Handoff Preview" `
  -ScriptFile "smoke-codexforge-guarded-packaging-handoff-preview.ps1" `
  -Domain "src\lib\codexforge\guarded-packaging-handoff-preview" `
  -Route "src\app\guarded-packaging-handoff-preview" `
  -MainPanel "GuardedPackagingHandoffPreviewPanel" `
  -CommandLabel "Go to Guarded Packaging Handoff Preview" `
  -Modules @("guarded-packaging-handoff-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuardedPackagingHandoffPreviewStableKey", "buildGuardedPackagingHandoffPreview", "buildGuardedPackagingHandoffPreviewItems", "buildGuardedPackagingHandoffPreviewBoundary", "buildGuardedPackagingHandoffPreviewModel", "summarizeGuardedPackagingHandoffPreview", "GUARDED_PACKAGING_HANDOFF_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Guarded packaging handoff preview", "Guarded packaging handoff preview does not package outputs", "Packaging handoff requires explicit operator approval", "Packaging handoffs include export artifact and runbook review", "Denied guarded packaging handoff paths remain blocked", "Guarded packaging handoff checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guarded packaging handoff preview does not package outputs", "Packaging handoff requires explicit operator approval", "Denied guarded packaging handoff paths remain blocked") `
  -RouteHref "/guarded-packaging-handoff-preview"

Write-Host "[OK] CodexForge Phase 1076 Guarded Packaging Handoff Preview smoke passed."
