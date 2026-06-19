param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 845 Model Task Classification Matrix" `
  -ScriptFile "smoke-codexforge-model-task-classification-matrix.ps1" `
  -Domain "src\lib\codexforge\model-task-classification-matrix" `
  -Route "src\app\model-task-classification-matrix" `
  -MainPanel "ModelTaskClassificationMatrixPanel" `
  -CommandLabel "Go to Model Task Classification Matrix" `
  -Modules @("model-task-classification-matrix-model.ts", "index.ts") `
  -Components @("ModelTaskClassificationMatrixPanel.tsx", "index.ts") `
  -Exports @("buildModelTaskClassificationMatrixStableKey", "buildModelTaskClassificationMatrix", "buildModelTaskClassificationMatrixItems", "buildModelTaskClassificationMatrixBoundary", "buildModelTaskClassificationMatrixModel", "summarizeModelTaskClassificationMatrix", "MODEL_TASK_CLASSIFICATION_MATRIX_LANGUAGE") `
  -PhaseMarkers @("Model task classification matrix", "Model task classification matrix does not route live requests", "Task classification requires explicit operator approval", "Task domains drive model selection", "Denied classification shortcuts remain blocked", "Task classification checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model task classification matrix does not route live requests", "Task classification requires explicit operator approval", "Denied classification shortcuts remain blocked") `
  -RouteHref "/model-task-classification-matrix"

Write-Host "[OK] CodexForge Phase 845 Model task classification matrix smoke passed."
