param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 848 Paid Model Routing Policy Preview" `
  -ScriptFile "smoke-codexforge-paid-model-routing-policy-preview.ps1" `
  -Domain "src\lib\codexforge\paid-model-routing-policy-preview" `
  -Route "src\app\paid-model-routing-policy-preview" `
  -MainPanel "PaidModelRoutingPolicyPreviewPanel" `
  -CommandLabel "Go to Paid Model Routing Policy Preview" `
  -Modules @("paid-model-routing-policy-preview-model.ts", "index.ts") `
  -Components @("PaidModelRoutingPolicyPreviewPanel.tsx", "index.ts") `
  -Exports @("buildPaidModelRoutingPolicyPreviewStableKey", "buildPaidModelRoutingPolicyPreview", "buildPaidModelRoutingPolicyPreviewItems", "buildPaidModelRoutingPolicyPreviewBoundary", "buildPaidModelRoutingPolicyPreviewModel", "summarizePaidModelRoutingPolicyPreview", "PAID_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Paid model routing policy preview", "Paid model routing policy preview does not call paid models", "Paid model usage requires explicit operator approval", "Paid models share the same CodexForge brain", "Denied paid model routes remain blocked", "Paid model policy checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Paid model routing policy preview does not call paid models", "Paid model usage requires explicit operator approval", "Denied paid model routes remain blocked") `
  -RouteHref "/paid-model-routing-policy-preview"

Write-Host "[OK] CodexForge Phase 848 Paid model routing policy preview smoke passed."
