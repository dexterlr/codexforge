param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 652 First File Write Controlled Trial" `
  -ScriptFile "smoke-codexforge-first-file-write-controlled-trial.ps1" `
  -Domain "src\lib\codexforge\first-file-write-controlled-trial" `
  -Route "src\app\first-file-write-controlled-trial" `
  -MainPanel "FirstFileWriteControlledTrialPanel" `
  -CommandLabel "Go to First File Write Controlled Trial" `
  -Modules @("first-file-write-controlled-trial-model.ts", "index.ts") `
  -Components @("FirstFileWriteControlledTrialPanel.tsx", "index.ts") `
  -Exports @("buildFirstFileWriteControlledTrialStableKey", "buildFirstFileWriteControlledTrial", "buildFirstFileWriteControlledTrials", "buildFirstFileWriteControlledTrialBoundary", "buildFirstFileWriteControlledTrialModel", "summarizeFirstFileWriteControlledTrial", "FIRST_FILE_WRITE_CONTROLLED_TRIAL_LANGUAGE") `
  -PhaseMarkers @("First file write controlled trial", "First file write controlled trial does not write files", "Controlled file writes require explicit operator approval", "Path allowlist", "Path denylist", "Diff preview", "Rollback", "Evidence", "Result review") `
  -PlainEnglish @("First file write controlled trial identity", "Path allowlist", "Path denylist", "Diff preview", "Rollback", "Evidence", "Result review", "Next recommended action") `
  -RouteHref "/first-file-write-controlled-trial"

Write-Host "[OK] CodexForge Phase 652 first file write controlled trial smoke passed."
