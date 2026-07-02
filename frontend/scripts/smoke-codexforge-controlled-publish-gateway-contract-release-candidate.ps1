param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2153 Controlled Publish Gateway Contract Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-publish-gateway-contract-release-candidate.ps1"
  Domain = "src\\lib\\codexforge\\controlled-publish-gateway-contract-release-candidate"
  Route = "src\\app\\controlled-publish-gateway-contract-release-candidate"
  CommandLabel = "Go to Controlled Publish Gateway Contract Release Candidate"
  RouteHref = "/controlled-publish-gateway-contract-release-candidate"
  ContractFamily = "PublishGateway"
  Markers = @("Controlled publish gateway contract release candidate", "Controlled publish gateway contract release candidate does not publish posts schedule content call social APIs upload media store tokens authorize accounts persist publish state persist schedule state persist approvals persist audit events create APIs create services bind ports spawn workers run commands deploy runtimes call providers call models call connectors send prompts store credentials export files download files upload files probe localhost write browser storage or guarantee performance from the frontend", "Controlled publish gateway contract release requires explicit operator approval", "Release candidate adds the Publish Gateway Contract as review-only contract planning without frontend publishing scheduling social API calls media upload account authorization token storage service deployment command execution provider calls publish persistence schedule persistence audit persistence or file mutation", "Denied controlled publish gateway contract paths remain blocked", "Controlled publish gateway contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
