param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 858 Model Provider Registry Preview" `
  -ScriptFile "smoke-codexforge-model-provider-registry-preview.ps1" `
  -Domain "src\lib\codexforge\model-provider-registry-preview" `
  -Route "src\app\model-provider-registry-preview" `
  -MainPanel "ModelProviderRegistryPreviewPanel" `
  -CommandLabel "Go to Model Provider Registry Preview" `
  -Modules @("model-provider-registry-preview-model.ts", "index.ts") `
  -Components @("ModelProviderRegistryPreviewPanel.tsx", "index.ts") `
  -Exports @("buildModelProviderRegistryPreviewStableKey", "buildModelProviderRegistryPreview", "buildModelProviderRegistryPreviewItems", "buildModelProviderRegistryPreviewBoundary", "buildModelProviderRegistryPreviewModel", "summarizeModelProviderRegistryPreview", "MODEL_PROVIDER_REGISTRY_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Model provider registry preview", "Model provider registry preview does not call providers", "Provider registration requires explicit operator approval", "All providers use the shared CodexForge brain", "Denied provider registry paths remain blocked", "Model provider registry checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model provider registry preview does not call providers", "Provider registration requires explicit operator approval", "Denied provider registry paths remain blocked") `
  -RouteHref "/model-provider-registry-preview"

Write-Host "[OK] CodexForge Phase 858 Model provider registry preview smoke passed."
