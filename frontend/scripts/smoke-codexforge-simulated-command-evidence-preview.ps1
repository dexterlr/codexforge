param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1121 Simulated Command Evidence Preview" `
  -ScriptFile "smoke-codexforge-simulated-command-evidence-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-command-evidence-preview" `
  -Route "src\app\simulated-command-evidence-preview" `
  -MainPanel "SimulatedCommandEvidencePreviewPanel" `
  -CommandLabel "Go to Simulated Command Evidence Preview" `
  -Modules @("simulated-command-evidence-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedCommandEvidencePreviewStableKey", "buildSimulatedCommandEvidencePreview", "buildSimulatedCommandEvidencePreviewItems", "buildSimulatedCommandEvidencePreviewBoundary", "buildSimulatedCommandEvidencePreviewModel", "summarizeSimulatedCommandEvidencePreview", "SIMULATED_COMMAND_EVIDENCE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated command evidence preview", "Simulated command evidence preview does not persist evidence", "Command evidence preview requires explicit operator approval", "Evidence previews route future stdout stderr and exit code through shared evidence review", "Denied simulated command evidence paths remain blocked", "Simulated command evidence checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated command evidence preview does not persist evidence", "Command evidence preview requires explicit operator approval", "Denied simulated command evidence paths remain blocked") `
  -RouteHref "/simulated-command-evidence-preview"

Write-Host "[OK] CodexForge Phase 1121 Simulated Command Evidence Preview smoke passed."
