param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1891 Operator Decision Reminder Preview"
  ScriptFile = "smoke-codexforge-operator-decision-reminder-preview.ps1"
  Domain = "src\lib\codexforge\operator-decision-reminder-preview"
  Route = "src\app\operator-decision-reminder-preview"
  CommandLabel = "Go to Operator Decision Reminder Preview"
  RouteHref = "/operator-decision-reminder-preview"
  Markers = @("Operator decision reminder preview", "Operator decision reminder preview does not persist approvals release locks dispatch workers execute paper trades or promote versions from the UI", "Operator decision reminder preview requires backend-owned operator review workflow", "Operator decision reminder preview shows simulated evidence reminder simulated risk reminder simulated mandate reminder simulated approval reminder simulated explicit operator approval requirement", "Denied operator decision reminder paths remain blocked", "Operator decision reminder checklist")
}
& (Join-Path $PSScriptRoot "codexforge-cockpit-trading-workflow-polish-smoke-helper.ps1") @params
