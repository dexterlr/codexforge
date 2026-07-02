param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2152 First Publish Gateway Contract Candidate"
  ScriptFile = "smoke-codexforge-first-publish-gateway-contract-candidate.ps1"
  Domain = "src\\lib\\codexforge\\first-publish-gateway-contract-candidate"
  Route = "src\\app\\first-publish-gateway-contract-candidate"
  CommandLabel = "Go to First Publish Gateway Contract Candidate"
  RouteHref = "/first-publish-gateway-contract-candidate"
  ContractFamily = "PublishGateway"
  Markers = @("First publish gateway contract candidate", "First publish gateway contract candidate does not enable publishing scheduling social API calls media upload token storage account authorization publish persistence schedule persistence telemetry persistence API creation service deployment command execution or frontend persistence from the UI", "First publish gateway contract candidate requires explicit operator approval", "Candidate combines account authorization publish request schedule policy platform policy media upload blocked approval gate audit failure ledger schedule hold takedown revocation telemetry frontend publish blocked cockpit summary and denied paths", "Denied first publish gateway contract paths remain blocked", "First publish gateway contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
