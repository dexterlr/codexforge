param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2119 Cockpit Worker Orchestration Contract Summary"
  ScriptFile = "smoke-codexforge-cockpit-worker-orchestration-contract-summary.ps1"
  Domain = "src\\lib\\codexforge\\cockpit-worker-orchestration-contract-summary"
  Route = "src\\app\\cockpit-worker-orchestration-contract-summary"
  CommandLabel = "Go to Cockpit Worker Orchestration Contract Summary"
  RouteHref = "/cockpit-worker-orchestration-contract-summary"
  ContractFamily = "Worker"
  Markers = @("Cockpit worker orchestration contract summary", "Cockpit worker orchestration contract summary keeps the cockpit as the normal user surface", "Cockpit worker orchestration contract summary does not dispatch workers start workers spawn processes run commands bind ports deploy runtimes start services create queues persist worker leases create artifacts call providers call models call connectors or write files from the cockpit", "Cockpit worker orchestration contract summary shows worker lease runtime isolation sandbox policy command execution blocked process spawn blocked port binding blocked worker health retry backoff artifact handoff audit event failure quarantine frontend worker dispatch blocked and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit worker orchestration contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
