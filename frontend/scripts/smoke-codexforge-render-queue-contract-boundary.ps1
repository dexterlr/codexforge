param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2090 Render Queue Contract Boundary"
  ScriptFile = "smoke-codexforge-render-queue-contract-boundary.ps1"
  Domain = "src\\lib\\codexforge\\render-queue-contract-boundary"
  Route = "src\\app\\render-queue-contract-boundary"
  CommandLabel = "Go to Render Queue Contract Boundary"
  RouteHref = "/render-queue-contract-boundary"
  ContractFamily = "Render"
  Markers = @("Render queue contract boundary", "Render queue contract boundary does not create render queues create render jobs persist jobs retry jobs dispatch workers render videos create artifacts persist artifacts run commands spawn processes bind ports deploy runtimes call providers call models call connectors or write files from the UI", "Render queue contract boundary requires explicit operator approval", "Render queue contract boundary prepares deterministic synthetic render queue contract review without frontend queue creation job persistence worker dispatch rendering artifact creation command execution or file mutation", "Denied render queue contract paths remain blocked", "Render queue contract boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
