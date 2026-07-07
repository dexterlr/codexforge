param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3966 Jarvis Video Controlled Execution Trial Artifact Handoff Placeholder Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-artifact-handoff-placeholder-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-artifact-handoff-placeholder-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-artifact-handoff-placeholder-wiring' -Phase 'Phase 3966' -Title 'Jarvis Video Controlled Execution Trial Artifact Handoff Placeholder Wiring'
