param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2167 Controlled Approval Capture Contract Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-approval-capture-contract-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-approval-capture-contract-release-candidate"
  Route = "src\app\controlled-approval-capture-contract-release-candidate"
  CommandLabel = "Go to Controlled Approval Capture Contract Release Candidate"
  RouteHref = "/controlled-approval-capture-contract-release-candidate"
  ContractFamily = "ApprovalCapture"
  Markers = @("Controlled approval capture contract release candidate", "Controlled approval capture contract release candidate does not persist approvals capture signatures verify identity authorize accounts export files publish content render videos call providers call models call connectors create APIs create services bind ports spawn workers run commands deploy runtimes store credentials store tokens persist audit events write browser storage or guarantee performance from the frontend", "Controlled approval capture contract release requires explicit operator approval", "Release candidate adds the Approval Capture Contract as review-only contract planning without frontend approval persistence signature capture identity verification account authorization protected action approval audit persistence service deployment command execution provider calls or browser storage writes", "Denied controlled approval capture contract paths remain blocked", "Controlled approval capture contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
