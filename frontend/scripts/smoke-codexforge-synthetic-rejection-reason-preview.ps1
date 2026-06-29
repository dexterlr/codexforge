param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-broker-adapter-simulator-smoke-helper.ps1") `
  -SmokeName "Phase 1763 Synthetic Rejection Reason Preview" `
  -ScriptFile "smoke-codexforge-synthetic-rejection-reason-preview.ps1" `
  -Domain "src\lib\codexforge\synthetic-rejection-reason-preview" `
  -Route "src\app\synthetic-rejection-reason-preview" `
  -CommandLabel "Go to Synthetic Rejection Reason Preview" `
  -RouteHref "/synthetic-rejection-reason-preview" `
  -Markers @("Synthetic rejection reason preview", "Synthetic rejection reason preview does not call brokers retry orders mutate orders or recover live execution from the UI", "Synthetic rejection reason preview requires deterministic synthetic rejection reasons only", "Synthetic rejection reason preview shows simulated insufficient buying power simulated risk governor hold simulated kill switch hold simulated stale intent simulated invalid symbol simulated operator review", "Denied synthetic rejection reason paths remain blocked", "Synthetic rejection reason checklist")
