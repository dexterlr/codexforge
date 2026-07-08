param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4067 Jarvis Video Studio Release Candidate No Persistence Guard Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-no-persistence-guard-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-no-persistence-guard-wiring' -RouteHref '/jarvis-video-studio-release-candidate-no-persistence-guard-wiring' -Phase 'Phase 4067' -Title 'Jarvis Video Studio Release Candidate No Persistence Guard Wiring'
