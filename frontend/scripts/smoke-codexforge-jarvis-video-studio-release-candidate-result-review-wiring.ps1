param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4054 Jarvis Video Studio Release Candidate Result Review Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-result-review-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-result-review-wiring' -RouteHref '/jarvis-video-studio-release-candidate-result-review-wiring' -Phase 'Phase 4054' -Title 'Jarvis Video Studio Release Candidate Result Review Wiring'
