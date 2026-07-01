param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1887 Trading Evidence Gap Summary Preview"
  ScriptFile = "smoke-codexforge-trading-evidence-gap-summary-preview.ps1"
  Domain = "src\lib\codexforge\trading-evidence-gap-summary-preview"
  Route = "src\app\trading-evidence-gap-summary-preview"
  CommandLabel = "Go to Trading Evidence Gap Summary Preview"
  RouteHref = "/trading-evidence-gap-summary-preview"
  Markers = @("Trading evidence gap summary preview", "Trading evidence gap summary preview does not persist evidence promote memory write files mutate audit trails or store links from the UI", "Trading evidence gap summary preview requires backend-owned evidence capture", "Trading evidence gap summary preview shows simulated missing research evidence simulated missing risk evidence simulated missing version evidence simulated missing approval evidence simulated redaction note and denied frontend persistence", "Denied trading evidence gap summary paths remain blocked", "Trading evidence gap summary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-cockpit-trading-workflow-polish-smoke-helper.ps1") @params
