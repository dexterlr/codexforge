param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4049 Jarvis Video Studio Release Candidate Approval Packet Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-approval-packet-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-approval-packet-wiring' -RouteHref '/jarvis-video-studio-release-candidate-approval-packet-wiring' -Phase 'Phase 4049' -Title 'Jarvis Video Studio Release Candidate Approval Packet Wiring'
