param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3960 Jarvis Video Controlled Execution Trial Prompt Redaction Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-prompt-redaction-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-prompt-redaction-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-prompt-redaction-wiring' -Phase 'Phase 3960' -Title 'Jarvis Video Controlled Execution Trial Prompt Redaction Wiring'
