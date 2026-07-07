param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3971 Jarvis Video Controlled Execution Trial Jarvis Video Update Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-jarvis-video-update-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-jarvis-video-update-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-jarvis-video-update-wiring' -Phase 'Phase 3971' -Title 'Jarvis Video Controlled Execution Trial Jarvis Video Update Wiring'
