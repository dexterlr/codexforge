param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 886 Model Tool Support Score Preview" `
  -ScriptFile "smoke-codexforge-model-tool-support-score-preview.ps1" `
  -Domain "src\lib\codexforge\model-tool-support-score-preview" `
  -Route "src\app\model-tool-support-score-preview" `
  -MainPanel "ModelToolSupportScorePreviewPanel" `
  -CommandLabel "Go to Model Tool Support Score Preview" `
  -Modules @("model-tool-support-score-preview-model.ts", "index.ts") `
  -Components @("ModelToolSupportScorePreviewPanel.tsx", "index.ts") `
  -Exports @("buildModelToolSupportScorePreviewStableKey", "buildModelToolSupportScorePreview", "buildModelToolSupportScorePreviewItems", "buildModelToolSupportScorePreviewBoundary", "buildModelToolSupportScorePreviewModel", "summarizeModelToolSupportScorePreview", "MODEL_TOOL_SUPPORT_SCORE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Model tool support score preview", "Model tool support score preview does not call tools or models", "Tool support scoring requires explicit operator approval", "Tool support helps choose the right worker model", "Denied tool support paths remain blocked", "Tool support checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model tool support score preview does not call tools or models", "Tool support scoring requires explicit operator approval", "Denied tool support paths remain blocked") `
  -RouteHref "/model-tool-support-score-preview"

Write-Host "[OK] CodexForge Phase 886 Model tool support score preview smoke passed."
