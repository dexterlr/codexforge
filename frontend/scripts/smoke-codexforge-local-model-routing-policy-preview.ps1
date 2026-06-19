param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 850 Local Model Routing Policy Preview" `
  -ScriptFile "smoke-codexforge-local-model-routing-policy-preview.ps1" `
  -Domain "src\lib\codexforge\local-model-routing-policy-preview" `
  -Route "src\app\local-model-routing-policy-preview" `
  -MainPanel "LocalModelRoutingPolicyPreviewPanel" `
  -CommandLabel "Go to Local Model Routing Policy Preview" `
  -Modules @("local-model-routing-policy-preview-model.ts", "index.ts") `
  -Components @("LocalModelRoutingPolicyPreviewPanel.tsx", "index.ts") `
  -Exports @("buildLocalModelRoutingPolicyPreviewStableKey", "buildLocalModelRoutingPolicyPreview", "buildLocalModelRoutingPolicyPreviewItems", "buildLocalModelRoutingPolicyPreviewBoundary", "buildLocalModelRoutingPolicyPreviewModel", "summarizeLocalModelRoutingPolicyPreview", "LOCAL_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Local model routing policy preview", "Local model routing policy preview does not call local models", "Local model usage requires explicit operator approval", "Local models share the same CodexForge brain", "Denied local model routes remain blocked", "Local model policy checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Local model routing policy preview does not call local models", "Local model usage requires explicit operator approval", "Denied local model routes remain blocked") `
  -RouteHref "/local-model-routing-policy-preview"

Write-Host "[OK] CodexForge Phase 850 Local model routing policy preview smoke passed."
