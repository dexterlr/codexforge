param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3822 Jarvis Video Approval Packet Workspace Adapter Candidate Review Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-adapter-candidate-review-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-adapter-candidate-review-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Adapter Candidate Review Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-adapter-candidate-review-wiring' `
  -Phase 'Phase 3822' `
  -Title 'Jarvis Video Approval Packet Workspace Adapter Candidate Review Wiring'
