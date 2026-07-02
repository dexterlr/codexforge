param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2106 Worker Orchestration Contract Boundary"
  ScriptFile = "smoke-codexforge-worker-orchestration-contract-boundary.ps1"
  Domain = "src\\lib\\codexforge\\worker-orchestration-contract-boundary"
  Route = "src\\app\\worker-orchestration-contract-boundary"
  CommandLabel = "Go to Worker Orchestration Contract Boundary"
  RouteHref = "/worker-orchestration-contract-boundary"
  ContractFamily = "Worker"
  Markers = @("Worker orchestration contract boundary", "Worker orchestration contract boundary does not dispatch workers start workers spawn processes run commands bind ports deploy runtimes start services create queues persist worker leases create artifacts call providers call models call connectors or write files from the UI", "Worker orchestration contract boundary requires explicit operator approval", "Worker orchestration contract boundary prepares deterministic synthetic worker orchestration contract review without frontend worker dispatch command execution process spawning port binding runtime deployment artifact creation service creation or file mutation", "Denied worker orchestration contract paths remain blocked", "Worker orchestration contract boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
