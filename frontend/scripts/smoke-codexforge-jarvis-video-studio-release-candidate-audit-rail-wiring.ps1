param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4056 Jarvis Video Studio Release Candidate Audit Rail Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-audit-rail-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-audit-rail-wiring' -RouteHref '/jarvis-video-studio-release-candidate-audit-rail-wiring' -Phase 'Phase 4056' -Title 'Jarvis Video Studio Release Candidate Audit Rail Wiring'
