param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2103 Cockpit Render Queue Contract Summary"
  ScriptFile = "smoke-codexforge-cockpit-render-queue-contract-summary.ps1"
  Domain = "src\\lib\\codexforge\\cockpit-render-queue-contract-summary"
  Route = "src\\app\\cockpit-render-queue-contract-summary"
  CommandLabel = "Go to Cockpit Render Queue Contract Summary"
  RouteHref = "/cockpit-render-queue-contract-summary"
  ContractFamily = "Render"
  Markers = @("Cockpit render queue contract summary", "Cockpit render queue contract summary keeps the cockpit as the normal user surface", "Cockpit render queue contract summary does not create render queues create render jobs persist jobs retry jobs dispatch workers render videos create artifacts persist artifacts run commands spawn processes bind ports deploy runtimes call providers call models call connectors or write files from the cockpit", "Cockpit render queue contract summary shows render job schema readiness gate queue policy retry policy priority policy timeout policy cost guard job lease telemetry failure ledger result handoff frontend queue creation blocked and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit render queue contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
