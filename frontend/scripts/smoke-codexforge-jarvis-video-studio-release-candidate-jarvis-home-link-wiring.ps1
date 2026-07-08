param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4061 Jarvis Video Studio Release Candidate Jarvis Home Link Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-jarvis-home-link-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-jarvis-home-link-wiring' -RouteHref '/jarvis-video-studio-release-candidate-jarvis-home-link-wiring' -Phase 'Phase 4061' -Title 'Jarvis Video Studio Release Candidate Jarvis Home Link Wiring'
