param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2057 Controlled Provider Gateway Contract Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-provider-gateway-contract-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-provider-gateway-contract-release-candidate"
  Route = "src\app\controlled-provider-gateway-contract-release-candidate"
  CommandLabel = "Go to Controlled Provider Gateway Contract Release Candidate"
  RouteHref = "/controlled-provider-gateway-contract-release-candidate"
  Markers = @("Controlled provider gateway contract release candidate", "Controlled provider gateway contract release candidate does not call providers call models call connectors send prompts store API keys store credentials generate images generate videos generate voice generate scripts generate captions create APIs create services bind ports spawn workers run commands deploy runtimes start runtimes persist prompts persist requests persist responses persist jobs persist approvals persist audit events dispatch workers create artifacts export files upload files download files publish posts schedule content probe localhost write browser storage or guarantee performance from the frontend", "Controlled provider gateway contract release requires explicit operator approval", "Release candidate deepens the provider gateway contract lane as review-only contract planning without frontend provider calls model calls prompt sending credential storage request dispatch response persistence quota mutation audit persistence API creation service deployment command execution generation or file mutation", "Denied controlled provider gateway contract paths remain blocked", "Controlled provider gateway contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-contract-smoke-helper.ps1") @params

