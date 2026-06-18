param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 703 Connector Adapter Implementation Plan" `
  -ScriptFile "smoke-codexforge-connector-adapter-implementation-plan.ps1" `
  -Domain "src\lib\codexforge\connector-adapter-implementation-plan" `
  -Route "src\app\connector-adapter-implementation-plan" `
  -MainPanel "ConnectorAdapterImplementationPlanPanel" `
  -CommandLabel "Go to Connector Adapter Implementation Plan" `
  -Modules @("connector-adapter-implementation-plan-model.ts", "index.ts") `
  -Components @("ConnectorAdapterImplementationPlanPanel.tsx", "index.ts") `
  -Exports @("buildConnectorAdapterImplementationPlanStableKey", "buildConnectorAdapterImplementationPlan", "buildConnectorAdapterImplementationPlans", "buildConnectorAdapterImplementationPlanBoundary", "buildConnectorAdapterImplementationPlanModel", "summarizeConnectorAdapterImplementationPlan", "CONNECTOR_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE") `
  -PhaseMarkers @("Connector Adapter Implementation Plan", "Connector adapter implementation plan does not connect accounts or fetch connector data", "Connector adapter implementation requires explicit operator approval", "Implementation inputs", "Implementation outputs", "Account permission policy", "Data-scope policy", "Fetch/mutation policy", "Redaction/audit policy", "Result review policy", "Tests/smokes", "Denied actions") `
  -PlainEnglish @("Connector adapter implementation plan identity", "implementation plan only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action") `
  -RouteHref "/connector-adapter-implementation-plan"

Write-Host "[OK] CodexForge Phase 703 connector adapter implementation plan smoke passed."
