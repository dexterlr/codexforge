param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3967 Jarvis Video Controlled Execution Trial Kill Switch Lock Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-kill-switch-lock-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-kill-switch-lock-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-kill-switch-lock-wiring' -Phase 'Phase 3967' -Title 'Jarvis Video Controlled Execution Trial Kill Switch Lock Wiring'
