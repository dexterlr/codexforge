param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2249 Controlled Jarvis Cockpit Completion Candidate"
  ScriptFile = "smoke-codexforge-controlled-jarvis-cockpit-completion-candidate.ps1"
  Domain = "srclibcodexforge${route.slug}"
  Route = "srcapp${route.slug}"
  CommandLabel = "Go to Controlled Jarvis Cockpit Completion Candidate"
  RouteHref = "/controlled-jarvis-cockpit-completion-candidate"
  Markers = @("Controlled Jarvis cockpit completion candidate", "Controlled Jarvis cockpit completion candidate does not persist projects call providers call models call connectors send prompts upload files download files render videos export files publish content schedule content create artifacts create APIs create services bind ports spawn workers run commands deploy runtimes store credentials store tokens write browser storage or guarantee performance from the frontend", "Controlled Jarvis cockpit completion candidate closes the premium visual pass and marks readiness for First Backend Wiring Boundary Mega Batch v1", "Controlled Jarvis cockpit completion candidate keeps all protected actions blocked pending backend wiring", "Denied Jarvis cockpit completion paths remain blocked", "Controlled Jarvis cockpit completion checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
