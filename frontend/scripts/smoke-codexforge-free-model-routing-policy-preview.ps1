param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 847 Free Model Routing Policy Preview" `
  -ScriptFile "smoke-codexforge-free-model-routing-policy-preview.ps1" `
  -Domain "src\lib\codexforge\free-model-routing-policy-preview" `
  -Route "src\app\free-model-routing-policy-preview" `
  -MainPanel "FreeModelRoutingPolicyPreviewPanel" `
  -CommandLabel "Go to Free Model Routing Policy Preview" `
  -Modules @("free-model-routing-policy-preview-model.ts", "index.ts") `
  -Components @("FreeModelRoutingPolicyPreviewPanel.tsx", "index.ts") `
  -Exports @("buildFreeModelRoutingPolicyPreviewStableKey", "buildFreeModelRoutingPolicyPreview", "buildFreeModelRoutingPolicyPreviewItems", "buildFreeModelRoutingPolicyPreviewBoundary", "buildFreeModelRoutingPolicyPreviewModel", "summarizeFreeModelRoutingPolicyPreview", "FREE_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Free model routing policy preview", "Free model routing policy preview does not call free models", "Free model routing requires explicit operator approval", "Free models share the same CodexForge brain", "Denied free model routes remain blocked", "Free model policy checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Free model routing policy preview does not call free models", "Free model routing requires explicit operator approval", "Denied free model routes remain blocked") `
  -RouteHref "/free-model-routing-policy-preview"

Write-Host "[OK] CodexForge Phase 847 Free model routing policy preview smoke passed."
