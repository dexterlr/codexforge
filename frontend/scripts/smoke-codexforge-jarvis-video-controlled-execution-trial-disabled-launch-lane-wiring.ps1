param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3969 Jarvis Video Controlled Execution Trial Disabled Launch Lane Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-disabled-launch-lane-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-disabled-launch-lane-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-disabled-launch-lane-wiring' -Phase 'Phase 3969' -Title 'Jarvis Video Controlled Execution Trial Disabled Launch Lane Wiring'
