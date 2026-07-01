param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1902 Paper Trading Evidence Lane Summary Preview"
  ScriptFile = "smoke-codexforge-paper-trading-evidence-lane-summary-preview.ps1"
  Domain = "src\lib\codexforge\paper-trading-evidence-lane-summary-preview"
  Route = "src\app\paper-trading-evidence-lane-summary-preview"
  CommandLabel = "Go to Paper Trading Evidence Lane Summary Preview"
  RouteHref = "/paper-trading-evidence-lane-summary-preview"
  Markers = @("Paper trading evidence lane summary preview", "Paper trading evidence lane summary preview does not persist evidence promote memory write files mutate audit trails or store links from the UI", "Paper trading evidence lane summary preview requires backend-owned evidence capture", "Paper trading evidence lane summary preview shows simulated research evidence simulated ledger evidence simulated dashboard evidence simulated version evidence simulated approval evidence and denied frontend persistence", "Denied paper trading evidence lane summary paths remain blocked", "Paper trading evidence lane summary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-paper-trading-workspace-smoke-helper.ps1") @params

