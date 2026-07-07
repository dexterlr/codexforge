param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3964 Jarvis Video Controlled Execution Trial Audit Observability Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-audit-observability-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-audit-observability-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-audit-observability-wiring' -Phase 'Phase 3964' -Title 'Jarvis Video Controlled Execution Trial Audit Observability Wiring'
