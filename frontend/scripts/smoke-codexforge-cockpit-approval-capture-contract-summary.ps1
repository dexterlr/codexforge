param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2165 Cockpit Approval Capture Contract Summary"
  ScriptFile = "smoke-codexforge-cockpit-approval-capture-contract-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-approval-capture-contract-summary"
  Route = "src\app\cockpit-approval-capture-contract-summary"
  CommandLabel = "Go to Cockpit Approval Capture Contract Summary"
  RouteHref = "/cockpit-approval-capture-contract-summary"
  ContractFamily = "ApprovalCapture"
  Markers = @("Cockpit approval capture contract summary", "Cockpit approval capture contract summary keeps the cockpit as the normal user surface", "Cockpit approval capture contract summary does not persist approvals capture signatures verify identity authorize accounts export files publish content render videos call providers call models call connectors create APIs create services run commands or write files from the cockpit", "Cockpit approval capture contract summary shows approval request schema operator attestation multi step chain expiration revocation evidence packet denial ledger escalation audit event frontend approval persistence blocked and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit approval capture contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
