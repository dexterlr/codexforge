param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 874 Model Provider Connection Boundary Preview" `
  -ScriptFile "smoke-codexforge-model-provider-connection-boundary-preview.ps1" `
  -Domain "src\lib\codexforge\model-provider-connection-boundary-preview" `
  -Route "src\app\model-provider-connection-boundary-preview" `
  -MainPanel "ModelProviderConnectionBoundaryPreviewPanel" `
  -CommandLabel "Go to Model Provider Connection Boundary Preview" `
  -Modules @("model-provider-connection-boundary-preview-model.ts", "index.ts") `
  -Components @("ModelProviderConnectionBoundaryPreviewPanel.tsx", "index.ts") `
  -Exports @("buildModelProviderConnectionBoundaryPreviewStableKey", "buildModelProviderConnectionBoundaryPreview", "buildModelProviderConnectionBoundaryPreviewItems", "buildModelProviderConnectionBoundaryPreviewBoundary", "buildModelProviderConnectionBoundaryPreviewModel", "summarizeModelProviderConnectionBoundaryPreview", "MODEL_PROVIDER_CONNECTION_BOUNDARY_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Model provider connection boundary preview", "Model provider connection boundary preview does not test connections", "Connection tests require explicit operator approval", "All providers use the shared CodexForge brain", "Denied connection paths remain blocked", "Connection boundary checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model provider connection boundary preview does not test connections", "Connection tests require explicit operator approval", "Denied connection paths remain blocked") `
  -RouteHref "/model-provider-connection-boundary-preview"

Write-Host "[OK] CodexForge Phase 874 Model provider connection boundary preview smoke passed."
