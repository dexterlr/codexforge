param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4072 Jarvis Video Studio Release Candidate UX Polish Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-ux-polish-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-ux-polish-wiring' -RouteHref '/jarvis-video-studio-release-candidate-ux-polish-wiring' -Phase 'Phase 4072' -Title 'Jarvis Video Studio Release Candidate UX Polish Wiring'
