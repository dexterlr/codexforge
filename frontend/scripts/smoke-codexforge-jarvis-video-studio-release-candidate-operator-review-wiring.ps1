param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4070 Jarvis Video Studio Release Candidate Operator Review Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-operator-review-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-operator-review-wiring' -RouteHref '/jarvis-video-studio-release-candidate-operator-review-wiring' -Phase 'Phase 4070' -Title 'Jarvis Video Studio Release Candidate Operator Review Wiring'
