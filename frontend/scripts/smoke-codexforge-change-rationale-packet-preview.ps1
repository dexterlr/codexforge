param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1820 Change Rationale Packet Preview"
  ScriptFile = "smoke-codexforge-change-rationale-packet-preview.ps1"
  Domain = "src\lib\codexforge\change-rationale-packet-preview"
  Route = "src\app\change-rationale-packet-preview"
  CommandLabel = "Go to Change Rationale Packet Preview"
  RouteHref = "/change-rationale-packet-preview"
  Markers = @("Change rationale packet preview", "Change rationale packet preview does not issue recommendations write strategy files or approve trading changes from the UI", "Change rationale packet preview requires deterministic synthetic rationale packets only", "Change rationale packet preview shows simulated reason simulated expected effect simulated risk note simulated evidence link simulated operator question and no advice claim", "Denied change rationale packet paths remain blocked", "Change rationale packet checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-change-control-workflow-smoke-helper.ps1") @params