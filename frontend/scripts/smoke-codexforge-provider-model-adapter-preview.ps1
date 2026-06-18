param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 686 Provider Model Adapter Preview" `
  -ScriptFile "smoke-codexforge-provider-model-adapter-preview.ps1" `
  -Domain "src\\lib\\codexforge\\provider-model-adapter-preview" `
  -Route "src\\app\\provider-model-adapter-preview" `
  -MainPanel "ProviderModelAdapterPreviewPanel" `
  -CommandLabel "Go to Provider Model Adapter Preview" `
  -Modules @("provider-model-adapter-preview-model.ts", "index.ts") `
  -Components @("ProviderModelAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildProviderModelAdapterPreviewStableKey", "buildProviderModelAdapterPreview", "buildProviderModelAdapterPreviews", "buildProviderModelAdapterPreviewBoundary", "buildProviderModelAdapterPreviewModel", "summarizeProviderModelAdapterPreview", "PROVIDER_MODEL_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Provider/model adapter preview", "Provider/model adapter preview does not call providers or models", "Provider/model execution requires explicit operator approval", "Prompt summary", "Redaction", "Model/provider boundary", "Cost/rate-limit", "Output handling", "Result review", "Denied actions", "no live adapter implementation", "no adapter execution", "no adapter preview execution") `
  -PlainEnglish @("Provider/model adapter preview identity", "Prompt summary", "Redaction", "Model/provider boundary", "Cost/rate-limit", "Output handling", "Result review", "Denied actions", "Unresolved blockers", "Next recommended action") `
  -RouteHref "/provider-model-adapter-preview"

Write-Host "[OK] CodexForge Phase 686 provider model adapter preview smoke passed."
