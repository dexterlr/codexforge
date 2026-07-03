param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2344 Controlled Provider Backend Adapter Contract Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-provider-backend-adapter-contract-release-candidate.ps1"
  Domain = "controlled-provider-backend-adapter-contract-release-candidate"
  Route = "controlled-provider-backend-adapter-contract-release-candidate"
  CommandLabel = "Go to Controlled Provider Backend Adapter Contract Release Candidate"
  RouteHref = "/controlled-provider-backend-adapter-contract-release-candidate"
  Markers = @("Controlled provider backend adapter contract release candidate", "Controlled provider backend adapter contract release candidate does not call providers call models send prompts stream responses store credentials store tokens persist outputs write browser storage upload download render export publish schedule dispatch queues spawn workers run commands create APIs create services import SDKs or call connectors", "Controlled provider backend adapter contract release candidate adds review-only provider adapter contracts and disabled backend adapter catalog", "Controlled provider backend adapter contract release candidate requires backend-owned adapter implementation explicit operator approval and audit trail before live execution", "Denied controlled provider backend adapter contract paths remain blocked", "Controlled provider backend adapter contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
