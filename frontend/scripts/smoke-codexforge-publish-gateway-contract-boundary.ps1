param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2138 Publish Gateway Contract Boundary"
  ScriptFile = "smoke-codexforge-publish-gateway-contract-boundary.ps1"
  Domain = "src\\lib\\codexforge\\publish-gateway-contract-boundary"
  Route = "src\\app\\publish-gateway-contract-boundary"
  CommandLabel = "Go to Publish Gateway Contract Boundary"
  RouteHref = "/publish-gateway-contract-boundary"
  ContractFamily = "PublishGateway"
  Markers = @("Publish gateway contract boundary", "Publish gateway contract boundary does not publish posts schedule content call social APIs upload media store tokens authorize accounts persist publish state persist schedule state create APIs create services call providers call models call connectors run commands or write files from the UI", "Publish gateway contract boundary requires explicit operator approval", "Publish gateway contract boundary prepares deterministic synthetic publish gateway contract review without frontend publishing scheduling social API calls media upload token storage account authorization persistence API creation service deployment or file mutation", "Denied publish gateway contract paths remain blocked", "Publish gateway contract boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
