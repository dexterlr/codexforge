param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 885 Model Privacy Risk Score Preview" `
  -ScriptFile "smoke-codexforge-model-privacy-risk-score-preview.ps1" `
  -Domain "src\lib\codexforge\model-privacy-risk-score-preview" `
  -Route "src\app\model-privacy-risk-score-preview" `
  -MainPanel "ModelPrivacyRiskScorePreviewPanel" `
  -CommandLabel "Go to Model Privacy Risk Score Preview" `
  -Modules @("model-privacy-risk-score-preview-model.ts", "index.ts") `
  -Components @("ModelPrivacyRiskScorePreviewPanel.tsx", "index.ts") `
  -Exports @("buildModelPrivacyRiskScorePreviewStableKey", "buildModelPrivacyRiskScorePreview", "buildModelPrivacyRiskScorePreviewItems", "buildModelPrivacyRiskScorePreviewBoundary", "buildModelPrivacyRiskScorePreviewModel", "summarizeModelPrivacyRiskScorePreview", "MODEL_PRIVACY_RISK_SCORE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Model privacy risk score preview", "Model privacy risk score preview does not send data remotely", "Privacy risk scoring requires explicit operator approval", "Local models are preferred for sensitive context", "Denied privacy score paths remain blocked", "Privacy risk checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model privacy risk score preview does not send data remotely", "Privacy risk scoring requires explicit operator approval", "Denied privacy score paths remain blocked") `
  -RouteHref "/model-privacy-risk-score-preview"

Write-Host "[OK] CodexForge Phase 885 Model privacy risk score preview smoke passed."
