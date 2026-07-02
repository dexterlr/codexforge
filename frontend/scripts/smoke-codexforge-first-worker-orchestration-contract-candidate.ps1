param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2120 First Worker Orchestration Contract Candidate"
  ScriptFile = "smoke-codexforge-first-worker-orchestration-contract-candidate.ps1"
  Domain = "src\\lib\\codexforge\\first-worker-orchestration-contract-candidate"
  Route = "src\\app\\first-worker-orchestration-contract-candidate"
  CommandLabel = "Go to First Worker Orchestration Contract Candidate"
  RouteHref = "/first-worker-orchestration-contract-candidate"
  ContractFamily = "Worker"
  Markers = @("First worker orchestration contract candidate", "First worker orchestration contract candidate does not enable worker dispatch worker start command execution process spawn port binding runtime deployment artifact creation telemetry persistence audit persistence API creation service deployment or file mutation from the UI", "First worker orchestration contract candidate requires explicit operator approval", "Candidate combines worker lease runtime isolation sandbox policy command blocked process blocked port blocked health retry artifact handoff audit failure quarantine frontend dispatch blocked cockpit summary and denied paths", "Denied first worker orchestration contract paths remain blocked", "First worker orchestration contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
