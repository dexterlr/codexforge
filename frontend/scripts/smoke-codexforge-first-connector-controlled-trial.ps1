param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 659 First Connector Controlled Trial" `
  -ScriptFile "smoke-codexforge-first-connector-controlled-trial.ps1" `
  -Domain "src\lib\codexforge\first-connector-controlled-trial" `
  -Route "src\app\first-connector-controlled-trial" `
  -MainPanel "FirstConnectorControlledTrialPanel" `
  -CommandLabel "Go to First Connector Controlled Trial" `
  -Modules @("first-connector-controlled-trial-model.ts", "index.ts") `
  -Components @("FirstConnectorControlledTrialPanel.tsx", "index.ts") `
  -Exports @("buildFirstConnectorControlledTrialStableKey", "buildFirstConnectorControlledTrial", "buildFirstConnectorControlledTrials", "buildFirstConnectorControlledTrialBoundary", "buildFirstConnectorControlledTrialModel", "summarizeFirstConnectorControlledTrial", "FIRST_CONNECTOR_CONTROLLED_TRIAL_LANGUAGE") `
  -PhaseMarkers @("First connector controlled trial", "First connector controlled trial does not connect accounts or fetch connector data", "Connector access requires explicit operator approval", "Account permission", "Data scope", "Fetch/mutation review", "Redaction/audit", "Result review") `
  -PlainEnglish @("First connector controlled trial identity", "Account permission", "Data scope", "Fetch/mutation review", "Redaction/audit", "Result review", "Next recommended action") `
  -RouteHref "/first-connector-controlled-trial"

Write-Host "[OK] CodexForge Phase 659 first connector controlled trial smoke passed."
