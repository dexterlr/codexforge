param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1138 Simulated Runtime Evidence Preview" `
  -ScriptFile "smoke-codexforge-simulated-runtime-evidence-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-runtime-evidence-preview" `
  -Route "src\app\simulated-runtime-evidence-preview" `
  -MainPanel "SimulatedRuntimeEvidencePreviewPanel" `
  -CommandLabel "Go to Simulated Runtime Evidence Preview" `
  -Modules @("simulated-runtime-evidence-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedRuntimeEvidencePreviewStableKey", "buildSimulatedRuntimeEvidencePreview", "buildSimulatedRuntimeEvidencePreviewItems", "buildSimulatedRuntimeEvidencePreviewBoundary", "buildSimulatedRuntimeEvidencePreviewModel", "summarizeSimulatedRuntimeEvidencePreview", "SIMULATED_RUNTIME_EVIDENCE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated runtime evidence preview", "Simulated runtime evidence preview does not persist evidence", "Runtime evidence preview requires explicit operator approval", "Evidence previews route future stdout stderr exit code and health state through shared evidence review", "Denied simulated runtime evidence paths remain blocked", "Simulated runtime evidence checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated runtime evidence preview does not persist evidence", "Runtime evidence preview requires explicit operator approval", "Denied simulated runtime evidence paths remain blocked") `
  -RouteHref "/simulated-runtime-evidence-preview"

Write-Host "[OK] CodexForge Phase 1138 Simulated Runtime Evidence Preview smoke passed."
