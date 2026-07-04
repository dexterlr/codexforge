param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2848 Video Dry Run Approval Boundary Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-approval-boundary-wiring.ps1" `
  -Route "video-dry-run-approval-boundary-wiring" `
  -CommandLabel "Go to Video Dry Run Approval Boundary Wiring" `
  -RouteHref "/video-dry-run-approval-boundary-wiring" `
  -Phase "2848" `
  -Title "Video Dry Run Approval Boundary Wiring"
