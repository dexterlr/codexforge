param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 661 First Packaging Export Controlled Trial" `
  -ScriptFile "smoke-codexforge-first-packaging-export-controlled-trial.ps1" `
  -Domain "src\lib\codexforge\first-packaging-export-controlled-trial" `
  -Route "src\app\first-packaging-export-controlled-trial" `
  -MainPanel "FirstPackagingExportControlledTrialPanel" `
  -CommandLabel "Go to First Packaging Export Controlled Trial" `
  -Modules @("first-packaging-export-controlled-trial-model.ts", "index.ts") `
  -Components @("FirstPackagingExportControlledTrialPanel.tsx", "index.ts") `
  -Exports @("buildFirstPackagingExportControlledTrialStableKey", "buildFirstPackagingExportControlledTrial", "buildFirstPackagingExportControlledTrials", "buildFirstPackagingExportControlledTrialBoundary", "buildFirstPackagingExportControlledTrialModel", "summarizeFirstPackagingExportControlledTrial", "FIRST_PACKAGING_EXPORT_CONTROLLED_TRIAL_LANGUAGE") `
  -PhaseMarkers @("First packaging/export controlled trial", "First packaging/export controlled trial does not create packages or exports", "Packaging/export requires explicit operator approval", "Bundle", "Destination", "Redaction/license", "Rollback", "Handoff checklist") `
  -PlainEnglish @("First packaging/export controlled trial identity", "Bundle", "Destination", "Redaction/license", "Rollback", "Handoff checklist", "Next recommended action") `
  -RouteHref "/first-packaging-export-controlled-trial"

Write-Host "[OK] CodexForge Phase 661 first packaging/export controlled trial smoke passed."
