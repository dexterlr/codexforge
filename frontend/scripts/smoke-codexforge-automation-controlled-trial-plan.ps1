param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 647 Automation Controlled Trial Plan" `
  -ScriptFile "smoke-codexforge-automation-controlled-trial-plan.ps1" `
  -Domain "src\lib\codexforge\automation-controlled-trial-plan" `
  -Route "src\app\automation-controlled-trial-plan" `
  -MainPanel "AutomationControlledTrialPlanPanel" `
  -CommandLabel "Go to Automation Controlled Trial Plan" `
  -Modules @("automation-controlled-trial-plan-model.ts", "index.ts") `
  -Components @("AutomationControlledTrialPlanPanel.tsx", "index.ts") `
  -Exports @("buildAutomationControlledTrialPlanStableKey", "buildAutomationControlledTrialPlan", "buildAutomationControlledTrialPlans", "buildAutomationControlledTrialPlanBoundary", "buildAutomationControlledTrialPlanModel", "summarizeAutomationControlledTrialPlan", "AUTOMATION_CONTROLLED_TRIAL_PLAN_LANGUAGE") `
  -PhaseMarkers @("Automation controlled trial plan", "Automation controlled trial plan does not create automations or schedules", "Automations require explicit operator approval", "Schedule checklist", "Condition/watch checklist", "Notification checklist", "Pause/stop checklist") `
  -PlainEnglish @("Automation controlled trial plan identity", "Schedule checklist", "Condition/watch checklist", "Notification checklist", "Pause/stop checklist", "Next recommended action") `
  -RouteHref "/automation-controlled-trial-plan"

Write-Host "[OK] CodexForge Phase 647 automation controlled trial plan smoke passed."
