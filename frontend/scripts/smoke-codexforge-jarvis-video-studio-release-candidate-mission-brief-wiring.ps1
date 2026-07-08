param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4044 Jarvis Video Studio Release Candidate Mission Brief Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-mission-brief-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-mission-brief-wiring' -RouteHref '/jarvis-video-studio-release-candidate-mission-brief-wiring' -Phase 'Phase 4044' -Title 'Jarvis Video Studio Release Candidate Mission Brief Wiring'
