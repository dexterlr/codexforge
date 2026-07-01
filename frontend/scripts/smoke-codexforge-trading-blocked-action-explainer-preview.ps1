param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1890 Trading Blocked Action Explainer Preview"
  ScriptFile = "smoke-codexforge-trading-blocked-action-explainer-preview.ps1"
  Domain = "src\lib\codexforge\trading-blocked-action-explainer-preview"
  Route = "src\app\trading-blocked-action-explainer-preview"
  CommandLabel = "Go to Trading Blocked Action Explainer Preview"
  RouteHref = "/trading-blocked-action-explainer-preview"
  Markers = @("Trading blocked action explainer preview", "Trading blocked action explainer preview does not bypass approvals unlock execution mutate policies or enable broker calls from the UI", "Trading blocked action explainer preview requires deterministic synthetic blocked-action explanations only", "Trading blocked action explainer preview shows simulated blocked broker connection simulated blocked order placement simulated blocked paper execution simulated blocked approval persistence simulated required backend owner", "Denied trading blocked action explainer paths remain blocked", "Trading blocked action explainer checklist")
}
& (Join-Path $PSScriptRoot "codexforge-cockpit-trading-workflow-polish-smoke-helper.ps1") @params
