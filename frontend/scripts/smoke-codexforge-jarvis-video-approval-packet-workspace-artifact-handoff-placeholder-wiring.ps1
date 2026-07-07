param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-approval-packet-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke `
  -SmokeName 'Phase 3840 Jarvis Video Approval Packet Workspace Artifact Handoff Placeholder Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-approval-packet-workspace-artifact-handoff-placeholder-wiring.ps1' `
  -Route 'jarvis-video-approval-packet-workspace-artifact-handoff-placeholder-wiring' `
  -CommandLabel 'Go to Jarvis Video Approval Packet Workspace Artifact Handoff Placeholder Wiring' `
  -RouteHref '/jarvis-video-approval-packet-workspace-artifact-handoff-placeholder-wiring' `
  -Phase 'Phase 3840' `
  -Title 'Jarvis Video Approval Packet Workspace Artifact Handoff Placeholder Wiring'
