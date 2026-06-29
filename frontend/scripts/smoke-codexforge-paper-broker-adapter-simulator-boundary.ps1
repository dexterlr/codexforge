param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-broker-adapter-simulator-smoke-helper.ps1") `
  -SmokeName "Phase 1754 Paper Broker Adapter Simulator Boundary" `
  -ScriptFile "smoke-codexforge-paper-broker-adapter-simulator-boundary.ps1" `
  -Domain "src\lib\codexforge\paper-broker-adapter-simulator-boundary" `
  -Route "src\app\paper-broker-adapter-simulator-boundary" `
  -CommandLabel "Go to Paper Broker Adapter Simulator Boundary" `
  -RouteHref "/paper-broker-adapter-simulator-boundary" `
  -Markers @("Paper broker adapter simulator boundary", "Paper broker adapter simulator boundary does not connect brokers read accounts place orders dispatch orders execute paper trades move money fetch live market data or provide financial advice from the UI", "Paper broker adapter simulator boundary requires explicit operator approval", "Paper broker adapter simulator boundary prepares deterministic synthetic backend-owned paper adapter workflows without frontend execution", "Denied paper broker simulator paths remain blocked", "Paper broker adapter simulator boundary checklist")
