param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4064 Jarvis Video Studio Release Candidate Developer Diagnostics Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-developer-diagnostics-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-developer-diagnostics-wiring' -RouteHref '/jarvis-video-studio-release-candidate-developer-diagnostics-wiring' -Phase 'Phase 4064' -Title 'Jarvis Video Studio Release Candidate Developer Diagnostics Wiring'
