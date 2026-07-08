param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4050 Jarvis Video Studio Release Candidate Dry Run Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-dry-run-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-dry-run-wiring' -RouteHref '/jarvis-video-studio-release-candidate-dry-run-wiring' -Phase 'Phase 4050' -Title 'Jarvis Video Studio Release Candidate Dry Run Wiring'
