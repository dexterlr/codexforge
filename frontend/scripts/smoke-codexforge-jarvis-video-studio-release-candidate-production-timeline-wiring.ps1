param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4045 Jarvis Video Studio Release Candidate Production Timeline Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-production-timeline-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-production-timeline-wiring' -RouteHref '/jarvis-video-studio-release-candidate-production-timeline-wiring' -Phase 'Phase 4045' -Title 'Jarvis Video Studio Release Candidate Production Timeline Wiring'
