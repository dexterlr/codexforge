param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2112 Port Binding Blocked Preview"
  ScriptFile = "smoke-codexforge-port-binding-blocked-preview.ps1"
  Domain = "src\\lib\\codexforge\\port-binding-blocked-preview"
  Route = "src\\app\\port-binding-blocked-preview"
  CommandLabel = "Go to Port Binding Blocked Preview"
  RouteHref = "/port-binding-blocked-preview"
  ContractFamily = "Worker"
  Markers = @("Port binding blocked preview", "Port binding blocked preview blocks frontend port binding frontend localhost probing frontend service listening frontend socket creation and frontend runtime exposure", "Port binding blocked preview requires backend-owned service networking runtime isolation ingress policy and audit trail", "Port binding blocked preview shows denied port bind denied localhost probe denied socket creation denied service listener denied runtime exposure and backend prerequisite", "Denied port binding paths remain blocked", "Port binding blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
