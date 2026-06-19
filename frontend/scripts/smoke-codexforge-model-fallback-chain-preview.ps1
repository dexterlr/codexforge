param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 839 Model Fallback Chain Preview" `
  -ScriptFile "smoke-codexforge-model-fallback-chain-preview.ps1" `
  -Domain "src\lib\codexforge\model-fallback-chain-preview" `
  -Route "src\app\model-fallback-chain-preview" `
  -MainPanel "ModelFallbackChainPreviewPanel" `
  -CommandLabel "Go to Model Fallback Chain Preview" `
  -Modules @("model-fallback-chain-preview-model.ts", "index.ts") `
  -Components @("ModelFallbackChainPreviewPanel.tsx", "index.ts") `
  -Exports @("buildModelFallbackChainPreviewStableKey", "buildModelFallbackChainPreview", "buildModelFallbackChainPreviewItems", "buildModelFallbackChainPreviewBoundary", "buildModelFallbackChainPreviewModel", "summarizeModelFallbackChainPreview", "MODEL_FALLBACK_CHAIN_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Model fallback chain preview", "Model fallback chain preview does not call fallback models", "Fallback model use requires explicit operator approval", "Denied fallback paths remain blocked", "Model fallback groups", "Fallback chain checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model fallback chain preview does not call fallback models", "Fallback model use requires explicit operator approval", "Denied fallback paths remain blocked") `
  -RouteHref "/model-fallback-chain-preview"

Write-Host "[OK] CodexForge Phase 839 Model fallback chain preview smoke passed."
