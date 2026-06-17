param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 660 First Automation Controlled Trial" `
  -ScriptFile "smoke-codexforge-first-automation-controlled-trial.ps1" `
  -Domain "src\lib\codexforge\first-automation-controlled-trial" `
  -Route "src\app\first-automation-controlled-trial" `
  -MainPanel "FirstAutomationControlledTrialPanel" `
  -CommandLabel "Go to First Automation Controlled Trial" `
  -Modules @("first-automation-controlled-trial-model.ts", "index.ts") `
  -Components @("FirstAutomationControlledTrialPanel.tsx", "index.ts") `
  -Exports @("buildFirstAutomationControlledTrialStableKey", "buildFirstAutomationControlledTrial", "buildFirstAutomationControlledTrials", "buildFirstAutomationControlledTrialBoundary", "buildFirstAutomationControlledTrialModel", "summarizeFirstAutomationControlledTrial", "FIRST_AUTOMATION_CONTROLLED_TRIAL_LANGUAGE") `
  -PhaseMarkers @("First automation controlled trial", "First automation controlled trial does not create automations or schedules", "Automations require explicit operator approval", "Schedule", "Condition/watch", "Notification", "Pause/stop", "Audit", "Recovery review") `
  -PlainEnglish @("First automation controlled trial identity", "Schedule", "Condition/watch", "Notification", "Pause/stop", "Audit", "Recovery review", "Next recommended action") `
  -RouteHref "/first-automation-controlled-trial"

Write-Host "[OK] CodexForge Phase 660 first automation controlled trial smoke passed."
