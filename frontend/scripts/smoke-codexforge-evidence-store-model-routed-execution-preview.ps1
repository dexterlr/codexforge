param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 942 Evidence Store Model-Routed Execution Preview" `
  -ScriptFile "smoke-codexforge-evidence-store-model-routed-execution-preview.ps1" `
  -Domain "src\lib\codexforge\evidence-store-model-routed-execution-preview" `
  -Route "src\app\evidence-store-model-routed-execution-preview" `
  -MainPanel "EvidenceStoreModelRoutedExecutionPreviewPanel" `
  -CommandLabel "Go to Evidence Store Model-Routed Execution Preview" `
  -Modules @("evidence-store-model-routed-execution-preview-model.ts", "index.ts") `
  -Components @("EvidenceStoreModelRoutedExecutionPreviewPanel.tsx", "index.ts") `
  -Exports @("buildEvidenceStoreModelRoutedExecutionPreviewStableKey", "buildEvidenceStoreModelRoutedExecutionPreview", "buildEvidenceStoreModelRoutedExecutionPreviewItems", "buildEvidenceStoreModelRoutedExecutionPreviewBoundary", "buildEvidenceStoreModelRoutedExecutionPreviewModel", "summarizeEvidenceStoreModelRoutedExecutionPreview", "EVIDENCE_STORE_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Evidence store model-routed execution preview", "Evidence store model-routed execution preview does not persist evidence", "Evidence capture requires explicit operator approval", "Evidence capture proposals include model selection rationale", "Denied evidence store execution paths remain blocked", "Evidence store model-routed checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Evidence store model-routed execution preview does not persist evidence", "Evidence capture requires explicit operator approval", "Denied evidence store execution paths remain blocked") `
  -RouteHref "/evidence-store-model-routed-execution-preview"

Write-Host "[OK] CodexForge Phase 942 Evidence store model-routed execution preview smoke passed."
