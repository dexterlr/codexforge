param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 887 Model Selection Dry-Run Result Preview" `
  -ScriptFile "smoke-codexforge-model-selection-dry-run-result-preview.ps1" `
  -Domain "src\lib\codexforge\model-selection-dry-run-result-preview" `
  -Route "src\app\model-selection-dry-run-result-preview" `
  -MainPanel "ModelSelectionDryRunResultPreviewPanel" `
  -CommandLabel "Go to Model Selection Dry-Run Result Preview" `
  -Modules @("model-selection-dry-run-result-preview-model.ts", "index.ts") `
  -Components @("ModelSelectionDryRunResultPreviewPanel.tsx", "index.ts") `
  -Exports @("buildModelSelectionDryRunResultPreviewStableKey", "buildModelSelectionDryRunResultPreview", "buildModelSelectionDryRunResultPreviewItems", "buildModelSelectionDryRunResultPreviewBoundary", "buildModelSelectionDryRunResultPreviewModel", "summarizeModelSelectionDryRunResultPreview", "MODEL_SELECTION_DRY_RUN_RESULT_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Model selection dry-run result preview", "Model selection dry-run result preview does not route live requests", "Model selection dry-runs require explicit operator approval", "Dry-run results use shared brain criteria", "Denied model selection paths remain blocked", "Model selection dry-run checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model selection dry-run result preview does not route live requests", "Model selection dry-runs require explicit operator approval", "Denied model selection paths remain blocked") `
  -RouteHref "/model-selection-dry-run-result-preview"

Write-Host "[OK] CodexForge Phase 887 Model selection dry-run result preview smoke passed."
