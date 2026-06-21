param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1075 Guarded Recovery Handoff Preview" `
  -ScriptFile "smoke-codexforge-guarded-recovery-handoff-preview.ps1" `
  -Domain "src\lib\codexforge\guarded-recovery-handoff-preview" `
  -Route "src\app\guarded-recovery-handoff-preview" `
  -MainPanel "GuardedRecoveryHandoffPreviewPanel" `
  -CommandLabel "Go to Guarded Recovery Handoff Preview" `
  -Modules @("guarded-recovery-handoff-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuardedRecoveryHandoffPreviewStableKey", "buildGuardedRecoveryHandoffPreview", "buildGuardedRecoveryHandoffPreviewItems", "buildGuardedRecoveryHandoffPreviewBoundary", "buildGuardedRecoveryHandoffPreviewModel", "summarizeGuardedRecoveryHandoffPreview", "GUARDED_RECOVERY_HANDOFF_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Guarded recovery handoff preview", "Guarded recovery handoff preview does not trigger recovery", "Recovery handoff requires explicit operator approval", "Recovery handoffs include rollback backup restore and retry plans", "Denied guarded recovery handoff paths remain blocked", "Guarded recovery handoff checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guarded recovery handoff preview does not trigger recovery", "Recovery handoff requires explicit operator approval", "Denied guarded recovery handoff paths remain blocked") `
  -RouteHref "/guarded-recovery-handoff-preview"

Write-Host "[OK] CodexForge Phase 1075 Guarded Recovery Handoff Preview smoke passed."
