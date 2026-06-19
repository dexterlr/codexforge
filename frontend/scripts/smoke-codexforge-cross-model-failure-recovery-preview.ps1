param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 854 Cross-Model Failure Recovery Preview" `
  -ScriptFile "smoke-codexforge-cross-model-failure-recovery-preview.ps1" `
  -Domain "src\lib\codexforge\cross-model-failure-recovery-preview" `
  -Route "src\app\cross-model-failure-recovery-preview" `
  -MainPanel "CrossModelFailureRecoveryPreviewPanel" `
  -CommandLabel "Go to Cross-Model Failure Recovery Preview" `
  -Modules @("cross-model-failure-recovery-preview-model.ts", "index.ts") `
  -Components @("CrossModelFailureRecoveryPreviewPanel.tsx", "index.ts") `
  -Exports @("buildCrossModelFailureRecoveryPreviewStableKey", "buildCrossModelFailureRecoveryPreview", "buildCrossModelFailureRecoveryPreviewItems", "buildCrossModelFailureRecoveryPreviewBoundary", "buildCrossModelFailureRecoveryPreviewModel", "summarizeCrossModelFailureRecoveryPreview", "CROSS_MODEL_FAILURE_RECOVERY_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Cross-model failure recovery preview", "Cross-model failure recovery preview does not retry models", "Model fallback and recovery require explicit operator approval", "Recovery uses shared failure history", "Denied model recovery paths remain blocked", "Cross-model recovery checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Cross-model failure recovery preview does not retry models", "Model fallback and recovery require explicit operator approval", "Denied model recovery paths remain blocked") `
  -RouteHref "/cross-model-failure-recovery-preview"

Write-Host "[OK] CodexForge Phase 854 Cross-model failure recovery preview smoke passed."
