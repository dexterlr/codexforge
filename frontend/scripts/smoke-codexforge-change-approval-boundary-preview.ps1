param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1829 Change Approval Boundary Preview"
  ScriptFile = "smoke-codexforge-change-approval-boundary-preview.ps1"
  Domain = "src\lib\codexforge\change-approval-boundary-preview"
  Route = "src\app\change-approval-boundary-preview"
  CommandLabel = "Go to Change Approval Boundary Preview"
  RouteHref = "/change-approval-boundary-preview"
  Markers = @("Change approval boundary preview", "Change approval boundary preview does not persist approvals apply changes release locks write files dispatch workers or enable execution from the UI", "Change approval boundary preview requires backend-owned approval capture and explicit operator approval", "Change approval boundary preview shows simulated approval packet simulated expiry simulated replay protection simulated evidence requirement simulated backend apply prerequisite and denied frontend approval persistence", "Denied change approval boundary paths remain blocked", "Change approval boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-change-control-workflow-smoke-helper.ps1") @params