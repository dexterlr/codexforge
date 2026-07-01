param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1870 Paper Adapter To Ledger Trace Preview"
  ScriptFile = "smoke-codexforge-paper-adapter-to-ledger-trace-preview.ps1"
  Domain = "src\lib\codexforge\paper-adapter-to-ledger-trace-preview"
  Route = "src\app\paper-adapter-to-ledger-trace-preview"
  CommandLabel = "Go to Paper Adapter To Ledger Trace Preview"
  RouteHref = "/paper-adapter-to-ledger-trace-preview"
  Markers = @("Paper adapter to ledger trace preview", "Paper adapter to ledger trace preview does not persist fills write ledgers call brokers execute orders or calculate real P&L from the UI", "Paper adapter to ledger trace preview requires backend-owned ledger persistence", "Paper adapter to ledger trace preview shows simulated paper event simulated synthetic fill note simulated ledger reference simulated audit requirement simulated denied frontend persistence", "Denied paper adapter to ledger trace paths remain blocked", "Paper adapter to ledger trace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-trading-end-to-end-review-smoke-helper.ps1") @params
