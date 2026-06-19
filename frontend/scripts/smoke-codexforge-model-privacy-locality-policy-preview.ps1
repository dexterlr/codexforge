param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 838 Model Privacy Locality Policy Preview" `
  -ScriptFile "smoke-codexforge-model-privacy-locality-policy-preview.ps1" `
  -Domain "src\lib\codexforge\model-privacy-locality-policy-preview" `
  -Route "src\app\model-privacy-locality-policy-preview" `
  -MainPanel "ModelPrivacyLocalityPolicyPreviewPanel" `
  -CommandLabel "Go to Model Privacy Locality Policy Preview" `
  -Modules @("model-privacy-locality-policy-preview-model.ts", "index.ts") `
  -Components @("ModelPrivacyLocalityPolicyPreviewPanel.tsx", "index.ts") `
  -Exports @("buildModelPrivacyLocalityPolicyPreviewStableKey", "buildModelPrivacyLocalityPolicyPreview", "buildModelPrivacyLocalityPolicyPreviewItems", "buildModelPrivacyLocalityPolicyPreviewBoundary", "buildModelPrivacyLocalityPolicyPreviewModel", "summarizeModelPrivacyLocalityPolicyPreview", "MODEL_PRIVACY_LOCALITY_POLICY_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Model privacy locality policy preview", "Model privacy locality policy preview does not send data remotely", "Remote model use requires explicit operator approval", "Local-first routing remains operator-controlled", "Privacy locality groups", "Privacy locality checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model privacy locality policy preview does not send data remotely", "Remote model use requires explicit operator approval", "Local-first routing remains operator-controlled") `
  -RouteHref "/model-privacy-locality-policy-preview"

Write-Host "[OK] CodexForge Phase 838 Model privacy locality policy preview smoke passed."
