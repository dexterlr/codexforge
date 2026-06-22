param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-trial-hardening-smoke-helper.ps1") `
  -SmokeName "Phase 1382 Recovery Review Packet" `
  -ScriptFile "smoke-codexforge-recovery-review-packet.ps1" `
  -Domain "src\lib\codexforge\recovery-review-packet" `
  -Route "src\app\recovery-review-packet" `
  -MainPanel "RealTrialHardeningRoutePanel" `
  -CommandLabel "Go to Recovery Review Packet" `
  -RouteHref "/recovery-review-packet" `
  -Markers @("Recovery review packet", "Recovery review packet does not execute rollback retry or recovery", "Recovery review packet requires explicit operator approval", "Recovery review packet previews rollback retry stop restore explain-failure manual-review safety-stop and partial-recovery options", "Recovery execution remains blocked", "Recovery review checklist")
