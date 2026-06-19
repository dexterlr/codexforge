param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 851 Specialist Model Routing Policy Preview" `
  -ScriptFile "smoke-codexforge-specialist-model-routing-policy-preview.ps1" `
  -Domain "src\lib\codexforge\specialist-model-routing-policy-preview" `
  -Route "src\app\specialist-model-routing-policy-preview" `
  -MainPanel "SpecialistModelRoutingPolicyPreviewPanel" `
  -CommandLabel "Go to Specialist Model Routing Policy Preview" `
  -Modules @("specialist-model-routing-policy-preview-model.ts", "index.ts") `
  -Components @("SpecialistModelRoutingPolicyPreviewPanel.tsx", "index.ts") `
  -Exports @("buildSpecialistModelRoutingPolicyPreviewStableKey", "buildSpecialistModelRoutingPolicyPreview", "buildSpecialistModelRoutingPolicyPreviewItems", "buildSpecialistModelRoutingPolicyPreviewBoundary", "buildSpecialistModelRoutingPolicyPreviewModel", "summarizeSpecialistModelRoutingPolicyPreview", "SPECIALIST_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Specialist model routing policy preview", "Specialist model routing policy preview does not call specialist models", "Specialist model usage requires explicit operator approval", "Specialist models share the same CodexForge brain", "Denied specialist model routes remain blocked", "Specialist model policy checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Specialist model routing policy preview does not call specialist models", "Specialist model usage requires explicit operator approval", "Denied specialist model routes remain blocked") `
  -RouteHref "/specialist-model-routing-policy-preview"

Write-Host "[OK] CodexForge Phase 851 Specialist model routing policy preview smoke passed."
