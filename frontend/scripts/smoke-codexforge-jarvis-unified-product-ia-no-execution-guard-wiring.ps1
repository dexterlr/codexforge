$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3940 Jarvis Unified Product IA No Execution Guard Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-no-execution-guard-wiring' -CommandLabel 'Go to Jarvis Unified Product IA No Execution Guard Wiring' -RouteHref '/jarvis-unified-product-ia-no-execution-guard-wiring' -Phase 'Phase 3940' -Title 'Jarvis Unified Product IA No Execution Guard Wiring'