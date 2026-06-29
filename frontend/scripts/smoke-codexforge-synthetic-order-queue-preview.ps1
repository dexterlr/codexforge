param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-broker-adapter-simulator-smoke-helper.ps1") `
  -SmokeName "Phase 1760 Synthetic Order Queue Preview" `
  -ScriptFile "smoke-codexforge-synthetic-order-queue-preview.ps1" `
  -Domain "src\lib\codexforge\synthetic-order-queue-preview" `
  -Route "src\app\synthetic-order-queue-preview" `
  -CommandLabel "Go to Synthetic Order Queue Preview" `
  -RouteHref "/synthetic-order-queue-preview" `
  -Markers @("Synthetic order queue preview", "Synthetic order queue preview does not enqueue real jobs dispatch workers submit trades call brokers or persist orders from the UI", "Synthetic order queue preview requires backend-owned simulator queue boundary", "Synthetic order queue preview shows simulated queued state simulated held state simulated rejected state simulated expired state and denied frontend queue mutation", "Denied synthetic order queue paths remain blocked", "Synthetic order queue checklist")
