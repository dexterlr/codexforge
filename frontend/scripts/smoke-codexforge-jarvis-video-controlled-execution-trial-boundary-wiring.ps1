param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3946 Jarvis Video Controlled Execution Trial Boundary Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-boundary-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-boundary-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-boundary-wiring' -Phase 'Phase 3946' -Title 'Jarvis Video Controlled Execution Trial Boundary Wiring'
