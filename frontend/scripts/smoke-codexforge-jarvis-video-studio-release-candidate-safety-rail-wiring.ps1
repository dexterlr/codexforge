param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4055 Jarvis Video Studio Release Candidate Safety Rail Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-safety-rail-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-safety-rail-wiring' -RouteHref '/jarvis-video-studio-release-candidate-safety-rail-wiring' -Phase 'Phase 4055' -Title 'Jarvis Video Studio Release Candidate Safety Rail Wiring'
