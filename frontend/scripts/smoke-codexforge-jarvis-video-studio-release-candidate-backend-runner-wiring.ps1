param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4053 Jarvis Video Studio Release Candidate Backend Runner Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-backend-runner-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-backend-runner-wiring' -RouteHref '/jarvis-video-studio-release-candidate-backend-runner-wiring' -Phase 'Phase 4053' -Title 'Jarvis Video Studio Release Candidate Backend Runner Wiring'
