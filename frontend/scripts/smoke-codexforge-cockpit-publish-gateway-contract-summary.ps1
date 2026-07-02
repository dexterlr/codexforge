param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2151 Cockpit Publish Gateway Contract Summary"
  ScriptFile = "smoke-codexforge-cockpit-publish-gateway-contract-summary.ps1"
  Domain = "src\\lib\\codexforge\\cockpit-publish-gateway-contract-summary"
  Route = "src\\app\\cockpit-publish-gateway-contract-summary"
  CommandLabel = "Go to Cockpit Publish Gateway Contract Summary"
  RouteHref = "/cockpit-publish-gateway-contract-summary"
  ContractFamily = "PublishGateway"
  Markers = @("Cockpit publish gateway contract summary", "Cockpit publish gateway contract summary keeps the cockpit as the normal user surface", "Cockpit publish gateway contract summary does not publish posts schedule content call social APIs upload media store tokens authorize accounts persist publish state persist schedule state create APIs create services call providers call models call connectors run commands or write files from the cockpit", "Cockpit publish gateway contract summary shows social account authorization publish request schedule policy platform policy media upload blocked approval gate audit event failure ledger schedule hold takedown revocation publish telemetry frontend publish blocked and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit publish gateway contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
