param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 624 Automation Schedule Approval Boundary" `
  -ScriptFile "smoke-codexforge-automation-schedule-approval-boundary.ps1" `
  -Domain "src\lib\codexforge\automation-schedule-approval-boundary" `
  -Route "src\app\automation-schedule-approval-boundary" `
  -MainPanel "AutomationScheduleApprovalBoundaryPanel" `
  -CommandLabel "Go to Automation Schedule Approval Boundary" `
  -Modules @("automation-schedule-approval-boundary-types.ts", "automation-schedule-approval-boundary-summary.ts", "index.ts") `
  -Components @("AutomationScheduleApprovalBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildAutomationScheduleApprovalBoundaryStableKey", "buildAutomationScheduleApprovalBoundary", "buildAutomationScheduleApprovalBoundaries", "buildAutomationScheduleApprovalBoundaryBoundary", "buildAutomationScheduleApprovalBoundaryModel", "summarizeAutomationScheduleApprovalBoundary", "AUTOMATION_SCHEDULE_APPROVAL_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Automation schedule approval boundary", "Automation/schedule approval boundary does not create automations or schedules", "Automations and schedules require explicit operator approval", "Unsafe automations stay blocked", "Automation groups", "Condition watch checklist") `
  -PlainEnglish @("Automation boundary identity", "Schedule checklist", "Notification checklist", "Pause/stop checklist", "Denied automation actions", "Unresolved automation blockers", "Evidence boundary route", "Recovery boundary route", "Next recommended action") `
  -RouteHref "/automation-schedule-approval-boundary"

Write-Host "[OK] CodexForge Phase 624 automation schedule approval boundary smoke passed."
