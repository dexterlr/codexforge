param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2185 Controlled Foundation Contracts Completion Candidate"
  ScriptFile = "smoke-codexforge-controlled-foundation-contracts-completion-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-foundation-contracts-completion-candidate"
  Route = "src\app\controlled-foundation-contracts-completion-candidate"
  CommandLabel = "Go to Controlled Foundation Contracts Completion Candidate"
  RouteHref = "/controlled-foundation-contracts-completion-candidate"
  ContractFamily = "Foundation"
  Markers = @("Controlled foundation contracts completion candidate", "Controlled foundation contracts completion candidate does not create APIs create services run commands spawn workers bind ports deploy runtimes call providers call models call connectors send prompts upload files download files export files publish content schedule content render videos create artifacts persist approvals persist rights persist consent persist audit events store credentials store tokens write browser storage or guarantee performance from the frontend", "Controlled foundation contracts completion candidate requires explicit operator approval", "Completion candidate closes the current backend contract foundation and marks readiness for the next Interactive Video Workspace UX Mega Batch without implementing backend execution", "Denied foundation completion paths remain blocked", "Controlled foundation contracts completion checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
