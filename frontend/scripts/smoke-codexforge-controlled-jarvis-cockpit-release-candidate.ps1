param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2243 Controlled Jarvis Cockpit Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-jarvis-cockpit-release-candidate.ps1"
  Domain = "srclibcodexforge${route.slug}"
  Route = "srcapp${route.slug}"
  CommandLabel = "Go to Controlled Jarvis Cockpit Release Candidate"
  RouteHref = "/controlled-jarvis-cockpit-release-candidate"
  Markers = @("Controlled Jarvis cockpit release candidate", "Controlled Jarvis cockpit release candidate does not persist projects call providers call models call connectors send prompts upload files download files render videos export files publish content schedule content create artifacts create APIs create services run commands spawn processes bind ports deploy runtimes store credentials store tokens write browser storage or guarantee performance from the frontend", "Controlled Jarvis cockpit release candidate upgrades cockpit visuals while preserving local React state only", "Controlled Jarvis cockpit release candidate requires backend wiring before protected actions", "Denied controlled Jarvis cockpit paths remain blocked", "Controlled Jarvis cockpit checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
