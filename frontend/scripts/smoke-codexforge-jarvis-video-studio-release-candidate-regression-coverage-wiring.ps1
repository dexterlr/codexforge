param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4069 Jarvis Video Studio Release Candidate Regression Coverage Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-regression-coverage-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-regression-coverage-wiring' -RouteHref '/jarvis-video-studio-release-candidate-regression-coverage-wiring' -Phase 'Phase 4069' -Title 'Jarvis Video Studio Release Candidate Regression Coverage Wiring'
