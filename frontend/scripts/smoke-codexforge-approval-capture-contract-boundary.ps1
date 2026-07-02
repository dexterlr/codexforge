param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2154 Approval Capture Contract Boundary"
  ScriptFile = "smoke-codexforge-approval-capture-contract-boundary.ps1"
  Domain = "src\lib\codexforge\approval-capture-contract-boundary"
  Route = "src\app\approval-capture-contract-boundary"
  CommandLabel = "Go to Approval Capture Contract Boundary"
  RouteHref = "/approval-capture-contract-boundary"
  ContractFamily = "ApprovalCapture"
  Markers = @("Approval capture contract boundary", "Approval capture contract boundary does not persist approvals capture signatures verify identity authorize accounts export files publish content render videos call providers call models call connectors create APIs create services run commands or write files from the UI", "Approval capture contract boundary requires explicit operator approval", "Approval capture contract boundary prepares deterministic synthetic approval capture contract review without frontend approval persistence signature capture identity verification account authorization export publish render command execution or file mutation", "Denied approval capture contract paths remain blocked", "Approval capture contract boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
