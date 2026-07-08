param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4051 Jarvis Video Studio Release Candidate Backend Readiness Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-backend-readiness-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-backend-readiness-wiring' -RouteHref '/jarvis-video-studio-release-candidate-backend-readiness-wiring' -Phase 'Phase 4051' -Title 'Jarvis Video Studio Release Candidate Backend Readiness Wiring'
