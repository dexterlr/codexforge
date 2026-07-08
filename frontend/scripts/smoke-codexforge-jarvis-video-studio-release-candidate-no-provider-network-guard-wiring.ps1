param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4068 Jarvis Video Studio Release Candidate No Provider Network Guard Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-no-provider-network-guard-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-no-provider-network-guard-wiring' -RouteHref '/jarvis-video-studio-release-candidate-no-provider-network-guard-wiring' -Phase 'Phase 4068' -Title 'Jarvis Video Studio Release Candidate No Provider Network Guard Wiring'
