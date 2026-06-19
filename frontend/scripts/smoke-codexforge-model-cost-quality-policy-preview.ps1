param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 837 Model Cost Quality Policy Preview" `
  -ScriptFile "smoke-codexforge-model-cost-quality-policy-preview.ps1" `
  -Domain "src\lib\codexforge\model-cost-quality-policy-preview" `
  -Route "src\app\model-cost-quality-policy-preview" `
  -MainPanel "ModelCostQualityPolicyPreviewPanel" `
  -CommandLabel "Go to Model Cost Quality Policy Preview" `
  -Modules @("model-cost-quality-policy-preview-model.ts", "index.ts") `
  -Components @("ModelCostQualityPolicyPreviewPanel.tsx", "index.ts") `
  -Exports @("buildModelCostQualityPolicyPreviewStableKey", "buildModelCostQualityPolicyPreview", "buildModelCostQualityPolicyPreviewItems", "buildModelCostQualityPolicyPreviewBoundary", "buildModelCostQualityPolicyPreviewModel", "summarizeModelCostQualityPolicyPreview", "MODEL_COST_QUALITY_POLICY_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Model cost quality policy preview", "Model cost quality policy preview does not spend credits", "Paid model usage requires explicit operator approval", "Cost quality routing remains preview-only", "Cost quality policy groups", "Cost quality checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model cost quality policy preview does not spend credits", "Paid model usage requires explicit operator approval", "Cost quality routing remains preview-only") `
  -RouteHref "/model-cost-quality-policy-preview"

Write-Host "[OK] CodexForge Phase 837 Model cost quality policy preview smoke passed."
