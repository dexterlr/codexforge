param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2121 Controlled Worker Orchestration Contract Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-worker-orchestration-contract-release-candidate.ps1"
  Domain = "src\\lib\\codexforge\\controlled-worker-orchestration-contract-release-candidate"
  Route = "src\\app\\controlled-worker-orchestration-contract-release-candidate"
  CommandLabel = "Go to Controlled Worker Orchestration Contract Release Candidate"
  RouteHref = "/controlled-worker-orchestration-contract-release-candidate"
  ContractFamily = "Worker"
  Markers = @("Controlled worker orchestration contract release candidate", "Controlled worker orchestration contract release candidate does not dispatch workers start workers spawn processes run commands bind ports deploy runtimes start services create queues persist worker leases create artifacts persist artifacts call providers call models call connectors send prompts store credentials render videos export files upload files download files publish posts schedule content probe localhost write browser storage or guarantee performance from the frontend", "Controlled worker orchestration contract release requires explicit operator approval", "Release candidate adds the Worker Orchestration Contract as review-only contract planning without frontend worker dispatch command execution process spawning port binding runtime deployment artifact creation service deployment provider calls rendering export publishing scheduling or file mutation", "Denied controlled worker orchestration contract paths remain blocked", "Controlled worker orchestration contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
