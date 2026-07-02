param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2137 Controlled Artifact Export Contract Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-artifact-export-contract-release-candidate.ps1"
  Domain = "src\\lib\\codexforge\\controlled-artifact-export-contract-release-candidate"
  Route = "src\\app\\controlled-artifact-export-contract-release-candidate"
  CommandLabel = "Go to Controlled Artifact Export Contract Release Candidate"
  RouteHref = "/controlled-artifact-export-contract-release-candidate"
  ContractFamily = "ArtifactExport"
  Markers = @("Controlled artifact export contract release candidate", "Controlled artifact export contract release candidate does not create artifacts persist artifacts export files download files upload files write files render videos dispatch workers create APIs create services bind ports spawn workers run commands deploy runtimes call providers call models call connectors send prompts store credentials persist approvals persist audit events create downloads probe localhost write browser storage or guarantee performance from the frontend", "Controlled artifact export contract release requires explicit operator approval", "Release candidate adds the Artifact Export Contract as review-only contract planning without frontend artifact creation export download upload file mutation access mutation service deployment command execution provider calls audit persistence approval persistence or browser storage writes", "Denied controlled artifact export contract paths remain blocked", "Controlled artifact export contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
