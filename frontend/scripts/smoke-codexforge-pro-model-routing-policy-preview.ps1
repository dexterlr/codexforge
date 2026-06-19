param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 849 Pro Model Routing Policy Preview" `
  -ScriptFile "smoke-codexforge-pro-model-routing-policy-preview.ps1" `
  -Domain "src\lib\codexforge\pro-model-routing-policy-preview" `
  -Route "src\app\pro-model-routing-policy-preview" `
  -MainPanel "ProModelRoutingPolicyPreviewPanel" `
  -CommandLabel "Go to Pro Model Routing Policy Preview" `
  -Modules @("pro-model-routing-policy-preview-model.ts", "index.ts") `
  -Components @("ProModelRoutingPolicyPreviewPanel.tsx", "index.ts") `
  -Exports @("buildProModelRoutingPolicyPreviewStableKey", "buildProModelRoutingPolicyPreview", "buildProModelRoutingPolicyPreviewItems", "buildProModelRoutingPolicyPreviewBoundary", "buildProModelRoutingPolicyPreviewModel", "summarizeProModelRoutingPolicyPreview", "PRO_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Pro model routing policy preview", "Pro model routing policy preview does not call pro models", "Pro model usage requires explicit operator approval", "Pro models share the same CodexForge brain", "Denied pro model routes remain blocked", "Pro model policy checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Pro model routing policy preview does not call pro models", "Pro model usage requires explicit operator approval", "Denied pro model routes remain blocked") `
  -RouteHref "/pro-model-routing-policy-preview"

Write-Host "[OK] CodexForge Phase 849 Pro model routing policy preview smoke passed."
