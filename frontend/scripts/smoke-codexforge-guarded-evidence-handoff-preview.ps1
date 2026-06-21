param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1073 Guarded Evidence Handoff Preview" `
  -ScriptFile "smoke-codexforge-guarded-evidence-handoff-preview.ps1" `
  -Domain "src\lib\codexforge\guarded-evidence-handoff-preview" `
  -Route "src\app\guarded-evidence-handoff-preview" `
  -MainPanel "GuardedEvidenceHandoffPreviewPanel" `
  -CommandLabel "Go to Guarded Evidence Handoff Preview" `
  -Modules @("guarded-evidence-handoff-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuardedEvidenceHandoffPreviewStableKey", "buildGuardedEvidenceHandoffPreview", "buildGuardedEvidenceHandoffPreviewItems", "buildGuardedEvidenceHandoffPreviewBoundary", "buildGuardedEvidenceHandoffPreviewModel", "summarizeGuardedEvidenceHandoffPreview", "GUARDED_EVIDENCE_HANDOFF_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Guarded evidence handoff preview", "Guarded evidence handoff preview does not persist evidence", "Evidence handoff requires explicit operator approval", "Evidence handoffs route future outputs through shared evidence review", "Denied guarded evidence handoff paths remain blocked", "Guarded evidence handoff checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guarded evidence handoff preview does not persist evidence", "Evidence handoff requires explicit operator approval", "Denied guarded evidence handoff paths remain blocked") `
  -RouteHref "/guarded-evidence-handoff-preview"

Write-Host "[OK] CodexForge Phase 1073 Guarded Evidence Handoff Preview smoke passed."
