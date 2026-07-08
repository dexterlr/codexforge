param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4042 Jarvis Video Studio Release Candidate Boundary Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-boundary-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-boundary-wiring' -RouteHref '/jarvis-video-studio-release-candidate-boundary-wiring' -Phase 'Phase 4042' -Title 'Jarvis Video Studio Release Candidate Boundary Wiring'
