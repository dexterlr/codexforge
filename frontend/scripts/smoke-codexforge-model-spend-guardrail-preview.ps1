param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 855 Model Spend Guardrail Preview" `
  -ScriptFile "smoke-codexforge-model-spend-guardrail-preview.ps1" `
  -Domain "src\lib\codexforge\model-spend-guardrail-preview" `
  -Route "src\app\model-spend-guardrail-preview" `
  -MainPanel "ModelSpendGuardrailPreviewPanel" `
  -CommandLabel "Go to Model Spend Guardrail Preview" `
  -Modules @("model-spend-guardrail-preview-model.ts", "index.ts") `
  -Components @("ModelSpendGuardrailPreviewPanel.tsx", "index.ts") `
  -Exports @("buildModelSpendGuardrailPreviewStableKey", "buildModelSpendGuardrailPreview", "buildModelSpendGuardrailPreviewItems", "buildModelSpendGuardrailPreviewBoundary", "buildModelSpendGuardrailPreviewModel", "summarizeModelSpendGuardrailPreview", "MODEL_SPEND_GUARDRAIL_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Model spend guardrail preview", "Model spend guardrail preview does not spend credits", "Model spend requires explicit operator approval", "Paid model budgets remain operator-controlled", "Denied spend paths remain blocked", "Model spend checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model spend guardrail preview does not spend credits", "Model spend requires explicit operator approval", "Denied spend paths remain blocked") `
  -RouteHref "/model-spend-guardrail-preview"

Write-Host "[OK] CodexForge Phase 855 Model spend guardrail preview smoke passed."
