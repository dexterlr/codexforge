param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2840 Video Dry Run Operator Approval Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-operator-approval-wiring.ps1" `
  -Route "video-dry-run-operator-approval-wiring" `
  -CommandLabel "Go to Video Dry Run Operator Approval Wiring" `
  -RouteHref "/video-dry-run-operator-approval-wiring" `
  -Phase "2840" `
  -Title "Video Dry Run Operator Approval Wiring"
