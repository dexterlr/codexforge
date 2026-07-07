param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3974 Jarvis Video Controlled Execution Trial Regression Coverage Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-regression-coverage-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-regression-coverage-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-regression-coverage-wiring' -Phase 'Phase 3974' -Title 'Jarvis Video Controlled Execution Trial Regression Coverage Wiring'
