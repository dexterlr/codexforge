param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 836 Model Capability Registry Preview" `
  -ScriptFile "smoke-codexforge-model-capability-registry-preview.ps1" `
  -Domain "src\lib\codexforge\model-capability-registry-preview" `
  -Route "src\app\model-capability-registry-preview" `
  -MainPanel "ModelCapabilityRegistryPreviewPanel" `
  -CommandLabel "Go to Model Capability Registry Preview" `
  -Modules @("model-capability-registry-preview-model.ts", "index.ts") `
  -Components @("ModelCapabilityRegistryPreviewPanel.tsx", "index.ts") `
  -Exports @("buildModelCapabilityRegistryPreviewStableKey", "buildModelCapabilityRegistryPreview", "buildModelCapabilityRegistryPreviewItems", "buildModelCapabilityRegistryPreviewBoundary", "buildModelCapabilityRegistryPreviewModel", "summarizeModelCapabilityRegistryPreview", "MODEL_CAPABILITY_REGISTRY_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Model capability registry preview", "Model capability registry preview does not call models", "Capability registration requires explicit operator approval", "Denied capability shortcuts remain blocked", "Model capability groups", "Capability registry checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model capability registry preview does not call models", "Capability registration requires explicit operator approval", "Denied capability shortcuts remain blocked") `
  -RouteHref "/model-capability-registry-preview"

Write-Host "[OK] CodexForge Phase 836 Model capability registry preview smoke passed."
