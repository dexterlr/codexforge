param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2122 Artifact Export Contract Boundary"
  ScriptFile = "smoke-codexforge-artifact-export-contract-boundary.ps1"
  Domain = "src\\lib\\codexforge\\artifact-export-contract-boundary"
  Route = "src\\app\\artifact-export-contract-boundary"
  CommandLabel = "Go to Artifact Export Contract Boundary"
  RouteHref = "/artifact-export-contract-boundary"
  ContractFamily = "ArtifactExport"
  Markers = @("Artifact export contract boundary", "Artifact export contract boundary does not create artifacts persist artifacts export files download files upload files write files render videos dispatch workers create APIs create services call providers call models call connectors persist approvals or mutate browser storage from the UI", "Artifact export contract boundary requires explicit operator approval", "Artifact export contract boundary prepares deterministic synthetic artifact export contract review without frontend artifact creation export download upload rendering worker dispatch persistence or file mutation", "Denied artifact export contract paths remain blocked", "Artifact export contract boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
