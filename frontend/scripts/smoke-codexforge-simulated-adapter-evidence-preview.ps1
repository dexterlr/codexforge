param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1154 Simulated Adapter Evidence Preview" `
  -ScriptFile "smoke-codexforge-simulated-adapter-evidence-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-adapter-evidence-preview" `
  -Route "src\app\simulated-adapter-evidence-preview" `
  -MainPanel "SimulatedAdapterEvidencePreviewPanel" `
  -CommandLabel "Go to Simulated Adapter Evidence Preview" `
  -Modules @("simulated-adapter-evidence-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedAdapterEvidencePreviewStableKey", "buildSimulatedAdapterEvidencePreview", "buildSimulatedAdapterEvidencePreviewItems", "buildSimulatedAdapterEvidencePreviewBoundary", "buildSimulatedAdapterEvidencePreviewModel", "summarizeSimulatedAdapterEvidencePreview", "SIMULATED_ADAPTER_EVIDENCE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated adapter evidence preview", "Simulated adapter evidence preview does not persist evidence", "Adapter evidence preview requires explicit operator approval", "Evidence previews route future adapter outputs through shared evidence review", "Denied simulated adapter evidence paths remain blocked", "Simulated adapter evidence checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated adapter evidence preview does not persist evidence", "Adapter evidence preview requires explicit operator approval", "Denied simulated adapter evidence paths remain blocked") `
  -RouteHref "/simulated-adapter-evidence-preview"

Write-Host "[OK] CodexForge Phase 1154 Simulated Adapter Evidence Preview smoke passed."
