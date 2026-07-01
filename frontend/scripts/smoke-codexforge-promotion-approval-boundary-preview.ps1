param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1861 Promotion Approval Boundary Preview"
  ScriptFile = "smoke-codexforge-promotion-approval-boundary-preview.ps1"
  Domain = "src\lib\codexforge\promotion-approval-boundary-preview"
  Route = "src\app\promotion-approval-boundary-preview"
  CommandLabel = "Go to Promotion Approval Boundary Preview"
  RouteHref = "/promotion-approval-boundary-preview"
  Markers = @("Promotion approval boundary preview", "Promotion approval boundary preview does not persist approvals apply changes release locks write files dispatch workers promote versions or enable execution from the UI", "Promotion approval boundary preview requires backend-owned approval capture and explicit operator approval", "Promotion approval boundary preview shows simulated approval packet simulated expiry simulated replay protection simulated evidence requirement simulated backend promotion prerequisite and denied frontend approval persistence", "Denied promotion approval boundary paths remain blocked", "Promotion approval boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-strategy-promotion-gate-smoke-helper.ps1") @params
