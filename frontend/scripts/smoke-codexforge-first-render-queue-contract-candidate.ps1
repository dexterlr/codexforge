param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2104 First Render Queue Contract Candidate"
  ScriptFile = "smoke-codexforge-first-render-queue-contract-candidate.ps1"
  Domain = "src\\lib\\codexforge\\first-render-queue-contract-candidate"
  Route = "src\\app\\first-render-queue-contract-candidate"
  CommandLabel = "Go to First Render Queue Contract Candidate"
  RouteHref = "/first-render-queue-contract-candidate"
  ContractFamily = "Render"
  Markers = @("First render queue contract candidate", "First render queue contract candidate does not enable queue creation job creation retry dispatch worker dispatch rendering artifact creation telemetry persistence failure persistence API creation service deployment command execution or file mutation from the UI", "First render queue contract candidate requires explicit operator approval", "Candidate combines render job schema readiness gate queue policy retry priority timeout cost guard lease telemetry failure ledger result handoff frontend blocked cockpit summary and denied paths", "Denied first render queue contract paths remain blocked", "First render queue contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
