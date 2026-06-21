param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1107 Simulated File Evidence Preview" `
  -ScriptFile "smoke-codexforge-simulated-file-evidence-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-file-evidence-preview" `
  -Route "src\app\simulated-file-evidence-preview" `
  -MainPanel "SimulatedFileEvidencePreviewPanel" `
  -CommandLabel "Go to Simulated File Evidence Preview" `
  -Modules @("simulated-file-evidence-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedFileEvidencePreviewStableKey", "buildSimulatedFileEvidencePreview", "buildSimulatedFileEvidencePreviewItems", "buildSimulatedFileEvidencePreviewBoundary", "buildSimulatedFileEvidencePreviewModel", "summarizeSimulatedFileEvidencePreview", "SIMULATED_FILE_EVIDENCE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated file evidence preview", "Simulated file evidence preview does not persist evidence", "File evidence preview requires explicit operator approval", "Evidence previews route future outputs through shared evidence review", "Denied simulated file evidence paths remain blocked", "Simulated file evidence checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated file evidence preview does not persist evidence", "File evidence preview requires explicit operator approval", "Denied simulated file evidence paths remain blocked") `
  -RouteHref "/simulated-file-evidence-preview"

Write-Host "[OK] CodexForge Phase 1107 Simulated File Evidence Preview smoke passed."
