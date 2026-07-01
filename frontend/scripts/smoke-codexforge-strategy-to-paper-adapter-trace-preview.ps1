param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1869 Strategy To Paper Adapter Trace Preview"
  ScriptFile = "smoke-codexforge-strategy-to-paper-adapter-trace-preview.ps1"
  Domain = "src\lib\codexforge\strategy-to-paper-adapter-trace-preview"
  Route = "src\app\strategy-to-paper-adapter-trace-preview"
  CommandLabel = "Go to Strategy To Paper Adapter Trace Preview"
  RouteHref = "/strategy-to-paper-adapter-trace-preview"
  Markers = @("Strategy to paper adapter trace preview", "Strategy to paper adapter trace preview does not dispatch orders call brokers connect adapters execute paper trades or fetch live market data from the UI", "Strategy to paper adapter trace preview requires backend-owned paper adapter service", "Strategy to paper adapter trace preview shows simulated strategy id simulated adapter boundary simulated paper mode requirement simulated broker isolation simulated denied frontend execution", "Denied strategy to paper adapter trace paths remain blocked", "Strategy to paper adapter trace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-trading-end-to-end-review-smoke-helper.ps1") @params
