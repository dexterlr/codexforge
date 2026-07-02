param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2098 Render Job Lease Contract Preview"
  ScriptFile = "smoke-codexforge-render-job-lease-contract-preview.ps1"
  Domain = "src\\lib\\codexforge\\render-job-lease-contract-preview"
  Route = "src\\app\\render-job-lease-contract-preview"
  CommandLabel = "Go to Render Job Lease Contract Preview"
  RouteHref = "/render-job-lease-contract-preview"
  ContractFamily = "Render"
  Markers = @("Render job lease contract preview", "Render job lease contract preview does not lease jobs dispatch workers persist leases or renew jobs from the UI", "Render job lease contract preview requires backend-owned lease ledger worker orchestration timeout policy and audit trail", "Render job lease contract preview shows simulated lease id simulated worker placeholder simulated expiry rule simulated renewal hold simulated denied frontend lease persistence", "Denied render job lease paths remain blocked", "Render job lease contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
