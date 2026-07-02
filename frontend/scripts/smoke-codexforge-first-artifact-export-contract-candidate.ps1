param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2136 First Artifact Export Contract Candidate"
  ScriptFile = "smoke-codexforge-first-artifact-export-contract-candidate.ps1"
  Domain = "src\\lib\\codexforge\\first-artifact-export-contract-candidate"
  Route = "src\\app\\first-artifact-export-contract-candidate"
  CommandLabel = "Go to First Artifact Export Contract Candidate"
  RouteHref = "/first-artifact-export-contract-candidate"
  ContractFamily = "ArtifactExport"
  Markers = @("First artifact export contract candidate", "First artifact export contract candidate does not enable artifact creation artifact persistence export download upload file writes signed URL creation access mutation audit persistence API creation service deployment command execution or frontend persistence from the UI", "First artifact export contract candidate requires explicit operator approval", "Candidate combines artifact schema checksum retention access export request readiness format audit download blocked failure ledger handoff frontend export blocked cockpit summary and denied paths", "Denied first artifact export contract paths remain blocked", "First artifact export contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
