param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2107 Worker Lease Contract Preview"
  ScriptFile = "smoke-codexforge-worker-lease-contract-preview.ps1"
  Domain = "src\\lib\\codexforge\\worker-lease-contract-preview"
  Route = "src\\app\\worker-lease-contract-preview"
  CommandLabel = "Go to Worker Lease Contract Preview"
  RouteHref = "/worker-lease-contract-preview"
  ContractFamily = "Worker"
  Markers = @("Worker lease contract preview", "Worker lease contract preview does not lease workers persist leases dispatch jobs or start runtimes from the UI", "Worker lease contract preview requires backend-owned lease ledger identity binding timeout policy and audit trail", "Worker lease contract preview shows simulated worker lease simulated job binding simulated expiry rule simulated renewal policy simulated denied frontend lease persistence", "Denied worker lease contract paths remain blocked", "Worker lease contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
