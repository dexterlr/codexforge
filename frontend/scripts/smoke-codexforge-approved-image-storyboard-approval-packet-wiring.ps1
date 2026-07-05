param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3084 Approved Image Storyboard Approval Packet Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-approval-packet-wiring.ps1' `
  -Route 'approved-image-storyboard-approval-packet-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Approval Packet Wiring' `
  -RouteHref '/approved-image-storyboard-approval-packet-wiring' `
  -Phase '3084' `
  -Title 'Approved Image Storyboard Approval Packet Wiring'
