param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2105 Controlled Render Queue Contract Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-render-queue-contract-release-candidate.ps1"
  Domain = "src\\lib\\codexforge\\controlled-render-queue-contract-release-candidate"
  Route = "src\\app\\controlled-render-queue-contract-release-candidate"
  CommandLabel = "Go to Controlled Render Queue Contract Release Candidate"
  RouteHref = "/controlled-render-queue-contract-release-candidate"
  ContractFamily = "Render"
  Markers = @("Controlled render queue contract release candidate", "Controlled render queue contract release candidate does not create render queues create render jobs persist jobs retry jobs dispatch workers render videos create artifacts persist artifacts run commands spawn processes bind ports deploy runtimes start services call providers call models call connectors send prompts store credentials export files upload files download files publish posts schedule content probe localhost write browser storage or guarantee performance from the frontend", "Controlled render queue contract release requires explicit operator approval", "Release candidate adds the Render Queue Contract as review-only contract planning without frontend queue creation job persistence retry dispatch worker dispatch rendering artifact creation command execution service deployment export publishing scheduling or file mutation", "Denied controlled render queue contract paths remain blocked", "Controlled render queue contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
