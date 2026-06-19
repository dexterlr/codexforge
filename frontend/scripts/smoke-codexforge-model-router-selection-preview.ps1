param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 835 Model Router Selection Preview" `
  -ScriptFile "smoke-codexforge-model-router-selection-preview.ps1" `
  -Domain "src\lib\codexforge\model-router-selection-preview" `
  -Route "src\app\model-router-selection-preview" `
  -MainPanel "ModelRouterSelectionPreviewPanel" `
  -CommandLabel "Go to Model Router Selection Preview" `
  -Modules @("model-router-selection-preview-model.ts", "index.ts") `
  -Components @("ModelRouterSelectionPreviewPanel.tsx", "index.ts") `
  -Exports @("buildModelRouterSelectionPreviewStableKey", "buildModelRouterSelectionPreview", "buildModelRouterSelectionPreviewItems", "buildModelRouterSelectionPreviewBoundary", "buildModelRouterSelectionPreviewModel", "summarizeModelRouterSelectionPreview", "MODEL_ROUTER_SELECTION_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Model router selection preview", "Model router selection preview does not call models", "Model routing requires explicit operator approval", "Paid free local and specialist models remain preview-only", "Model selection groups", "Model router checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model router selection preview does not call models", "Model routing requires explicit operator approval", "Paid free local and specialist models remain preview-only") `
  -RouteHref "/model-router-selection-preview"

Write-Host "[OK] CodexForge Phase 835 Model router selection preview smoke passed."
