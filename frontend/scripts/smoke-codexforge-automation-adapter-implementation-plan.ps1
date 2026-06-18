param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 704 Automation Adapter Implementation Plan" `
  -ScriptFile "smoke-codexforge-automation-adapter-implementation-plan.ps1" `
  -Domain "src\lib\codexforge\automation-adapter-implementation-plan" `
  -Route "src\app\automation-adapter-implementation-plan" `
  -MainPanel "AutomationAdapterImplementationPlanPanel" `
  -CommandLabel "Go to Automation Adapter Implementation Plan" `
  -Modules @("automation-adapter-implementation-plan-model.ts", "index.ts") `
  -Components @("AutomationAdapterImplementationPlanPanel.tsx", "index.ts") `
  -Exports @("buildAutomationAdapterImplementationPlanStableKey", "buildAutomationAdapterImplementationPlan", "buildAutomationAdapterImplementationPlans", "buildAutomationAdapterImplementationPlanBoundary", "buildAutomationAdapterImplementationPlanModel", "summarizeAutomationAdapterImplementationPlan", "AUTOMATION_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE") `
  -PhaseMarkers @("Automation Adapter Implementation Plan", "Automation adapter implementation plan does not create automations or schedules", "Automation adapter implementation requires explicit operator approval", "Implementation inputs", "Implementation outputs", "Schedule policy", "Condition/watch policy", "Notification policy", "Pause/stop policy", "Audit/recovery policy", "Tests/smokes", "Denied actions") `
  -PlainEnglish @("Automation adapter implementation plan identity", "implementation plan only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action") `
  -RouteHref "/automation-adapter-implementation-plan"

Write-Host "[OK] CodexForge Phase 704 automation adapter implementation plan smoke passed."
