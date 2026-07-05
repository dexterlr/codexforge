param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-image-storyboard-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke `
  -SmokeName 'Phase 3101 Approved Image Storyboard Audit Packet Wiring' `
  -ScriptFile 'smoke-codexforge-approved-image-storyboard-audit-packet-wiring.ps1' `
  -Route 'approved-image-storyboard-audit-packet-wiring' `
  -CommandLabel 'Go to Approved Image Storyboard Audit Packet Wiring' `
  -RouteHref '/approved-image-storyboard-audit-packet-wiring' `
  -Phase '3101' `
  -Title 'Approved Image Storyboard Audit Packet Wiring'
