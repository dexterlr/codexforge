param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4058 Jarvis Video Studio Release Candidate Next Action Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-next-action-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-next-action-wiring' -RouteHref '/jarvis-video-studio-release-candidate-next-action-wiring' -Phase 'Phase 4058' -Title 'Jarvis Video Studio Release Candidate Next Action Wiring'
