param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1859 Promotion Rejection Packet Preview"
  ScriptFile = "smoke-codexforge-promotion-rejection-packet-preview.ps1"
  Domain = "src\lib\codexforge\promotion-rejection-packet-preview"
  Route = "src\app\promotion-rejection-packet-preview"
  CommandLabel = "Go to Promotion Rejection Packet Preview"
  RouteHref = "/promotion-rejection-packet-preview"
  Markers = @("Promotion rejection packet preview", "Promotion rejection packet preview does not mutate strategy rules delete proposals write audit state or persist rejection from the UI", "Promotion rejection packet preview requires backend-owned review workflow", "Promotion rejection packet preview shows simulated rejection reason simulated evidence gap simulated risk concern simulated mandate conflict simulated version concern and denied frontend persistence", "Denied promotion rejection packet paths remain blocked", "Promotion rejection packet checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-strategy-promotion-gate-smoke-helper.ps1") @params
