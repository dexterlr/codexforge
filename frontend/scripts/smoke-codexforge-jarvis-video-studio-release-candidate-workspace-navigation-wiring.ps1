param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4059 Jarvis Video Studio Release Candidate Workspace Navigation Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-workspace-navigation-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-workspace-navigation-wiring' -RouteHref '/jarvis-video-studio-release-candidate-workspace-navigation-wiring' -Phase 'Phase 4059' -Title 'Jarvis Video Studio Release Candidate Workspace Navigation Wiring'
