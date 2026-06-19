param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 823 Backend Adapter Operator Trial Preview" `
  -ScriptFile "smoke-codexforge-backend-adapter-operator-trial-preview.ps1" `
  -Domain "src\lib\codexforge\backend-adapter-operator-trial-preview" `
  -Route "src\app\backend-adapter-operator-trial-preview" `
  -MainPanel "BackendAdapterOperatorTrialPreviewPanel" `
  -CommandLabel "Go to Backend Adapter Operator Trial Preview" `
  -Modules @("backend-adapter-operator-trial-preview-model.ts", "index.ts") `
  -Components @("BackendAdapterOperatorTrialPreviewPanel.tsx", "index.ts") `
  -Exports @("buildBackendAdapterOperatorTrialPreviewStableKey", "buildBackendAdapterOperatorTrialPreview", "buildBackendAdapterOperatorTrialPreviewItems", "buildBackendAdapterOperatorTrialPreviewBoundary", "buildBackendAdapterOperatorTrialPreviewModel", "summarizeBackendAdapterOperatorTrialPreview", "BACKEND_ADAPTER_OPERATOR_TRIAL_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Backend adapter operator trial preview", "Backend adapter operator trial preview does not start trials", "Operator trials require explicit approval", "Denied operator trial paths remain blocked", "Operator trial groups", "Operator trial preview checklist", "static implementation preview", "review-only", "not executable from UI", "approval required", "operator-approved", "denied paths remain blocked", "future model-router bounded concern", "no live model routing") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Backend adapter operator trial preview does not start trials", "Operator trials require explicit approval", "Denied operator trial paths remain blocked") `
  -RouteHref "/backend-adapter-operator-trial-preview"

Write-Host "[OK] CodexForge Phase 823 Backend adapter operator trial preview smoke passed."
