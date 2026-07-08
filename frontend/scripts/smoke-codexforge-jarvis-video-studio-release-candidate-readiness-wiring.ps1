param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4071 Jarvis Video Studio Release Candidate Readiness Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-readiness-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-readiness-wiring' -RouteHref '/jarvis-video-studio-release-candidate-readiness-wiring' -Phase 'Phase 4071' -Title 'Jarvis Video Studio Release Candidate Readiness Wiring'
