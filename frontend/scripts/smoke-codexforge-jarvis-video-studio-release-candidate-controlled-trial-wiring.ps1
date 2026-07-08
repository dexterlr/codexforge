param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4052 Jarvis Video Studio Release Candidate Controlled Trial Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-controlled-trial-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-controlled-trial-wiring' -RouteHref '/jarvis-video-studio-release-candidate-controlled-trial-wiring' -Phase 'Phase 4052' -Title 'Jarvis Video Studio Release Candidate Controlled Trial Wiring'
