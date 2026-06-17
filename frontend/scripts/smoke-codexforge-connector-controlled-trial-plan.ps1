param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 646 Connector Controlled Trial Plan" `
  -ScriptFile "smoke-codexforge-connector-controlled-trial-plan.ps1" `
  -Domain "src\lib\codexforge\connector-controlled-trial-plan" `
  -Route "src\app\connector-controlled-trial-plan" `
  -MainPanel "ConnectorControlledTrialPlanPanel" `
  -CommandLabel "Go to Connector Controlled Trial Plan" `
  -Modules @("connector-controlled-trial-plan-model.ts", "index.ts") `
  -Components @("ConnectorControlledTrialPlanPanel.tsx", "index.ts") `
  -Exports @("buildConnectorControlledTrialPlanStableKey", "buildConnectorControlledTrialPlan", "buildConnectorControlledTrialPlans", "buildConnectorControlledTrialPlanBoundary", "buildConnectorControlledTrialPlanModel", "summarizeConnectorControlledTrialPlan", "CONNECTOR_CONTROLLED_TRIAL_PLAN_LANGUAGE") `
  -PhaseMarkers @("Connector controlled trial plan", "Connector controlled trial plan does not connect accounts or fetch connector data", "Connector access requires explicit operator approval", "Account permission", "Data scope", "Fetch/mutation", "Redaction/audit checklist") `
  -PlainEnglish @("Connector controlled trial plan identity", "Account permission", "Data scope", "Fetch/mutation", "Redaction/audit checklist", "Next recommended action") `
  -RouteHref "/connector-controlled-trial-plan"

Write-Host "[OK] CodexForge Phase 646 connector controlled trial plan smoke passed."
