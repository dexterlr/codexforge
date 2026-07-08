param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4046 Jarvis Video Studio Release Candidate Readiness Score Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-readiness-score-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-readiness-score-wiring' -RouteHref '/jarvis-video-studio-release-candidate-readiness-score-wiring' -Phase 'Phase 4046' -Title 'Jarvis Video Studio Release Candidate Readiness Score Wiring'
