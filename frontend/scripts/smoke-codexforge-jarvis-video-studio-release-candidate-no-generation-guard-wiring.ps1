param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4065 Jarvis Video Studio Release Candidate No Generation Guard Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-no-generation-guard-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-no-generation-guard-wiring' -RouteHref '/jarvis-video-studio-release-candidate-no-generation-guard-wiring' -Phase 'Phase 4065' -Title 'Jarvis Video Studio Release Candidate No Generation Guard Wiring'
