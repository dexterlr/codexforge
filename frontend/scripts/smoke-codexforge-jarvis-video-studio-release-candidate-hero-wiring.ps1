param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4043 Jarvis Video Studio Release Candidate Hero Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-hero-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-hero-wiring' -RouteHref '/jarvis-video-studio-release-candidate-hero-wiring' -Phase 'Phase 4043' -Title 'Jarvis Video Studio Release Candidate Hero Wiring'
