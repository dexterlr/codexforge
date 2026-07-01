param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1853 Risk Governor Gate Preview"
  ScriptFile = "smoke-codexforge-risk-governor-gate-preview.ps1"
  Domain = "src\lib\codexforge\risk-governor-gate-preview"
  Route = "src\app\risk-governor-gate-preview"
  CommandLabel = "Go to Risk Governor Gate Preview"
  RouteHref = "/risk-governor-gate-preview"
  Markers = @("Risk governor gate preview", "Risk governor gate preview does not override risk governor decisions approve execution mutate capital or place trades from the UI", "Risk governor gate preview requires deterministic synthetic risk gate review only", "Risk governor gate preview shows simulated risk governor pass simulated risk governor hold simulated drawdown state simulated daily loss state simulated kill switch implication and operator review requirement", "Denied risk governor gate paths remain blocked", "Risk governor gate checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-strategy-promotion-gate-smoke-helper.ps1") @params
