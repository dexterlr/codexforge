param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4066 Jarvis Video Studio Release Candidate No Execution Guard Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-no-execution-guard-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-no-execution-guard-wiring' -RouteHref '/jarvis-video-studio-release-candidate-no-execution-guard-wiring' -Phase 'Phase 4066' -Title 'Jarvis Video Studio Release Candidate No Execution Guard Wiring'
