param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2261 Approval Capture Wiring Boundary Preview"
  ScriptFile = "smoke-codexforge-approval-capture-wiring-boundary-preview.ps1"
  Domain = "approval-capture-wiring-boundary-preview"
  Route = "approval-capture-wiring-boundary-preview"
  CommandLabel = "Go to Approval Capture Wiring Boundary Preview"
  RouteHref = "/approval-capture-wiring-boundary-preview"
  Markers = @("Approval Capture Wiring Boundary", "approval capture boundary", "Explicit operator approval required", "No frontend persistence", "Audit trail required")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
