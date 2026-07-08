param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4063 Jarvis Video Studio Release Candidate Release Summary Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-release-summary-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-release-summary-wiring' -RouteHref '/jarvis-video-studio-release-candidate-release-summary-wiring' -Phase 'Phase 4063' -Title 'Jarvis Video Studio Release Candidate Release Summary Wiring'
