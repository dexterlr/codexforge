param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2135 Cockpit Artifact Export Contract Summary"
  ScriptFile = "smoke-codexforge-cockpit-artifact-export-contract-summary.ps1"
  Domain = "src\\lib\\codexforge\\cockpit-artifact-export-contract-summary"
  Route = "src\\app\\cockpit-artifact-export-contract-summary"
  CommandLabel = "Go to Cockpit Artifact Export Contract Summary"
  RouteHref = "/cockpit-artifact-export-contract-summary"
  ContractFamily = "ArtifactExport"
  Markers = @("Cockpit artifact export contract summary", "Cockpit artifact export contract summary keeps the cockpit as the normal user surface", "Cockpit artifact export contract summary does not create artifacts persist artifacts export files download files upload files write files render videos dispatch workers create APIs create services call providers call models call connectors persist approvals or mutate browser storage from the cockpit", "Cockpit artifact export contract summary shows artifact schema checksum retention access export request readiness format audit download blocked failure ledger handoff frontend export blocked and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit artifact export contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
