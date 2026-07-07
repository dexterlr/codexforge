$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3930 Jarvis Unified Product IA Readiness Summary Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-readiness-summary-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Readiness Summary Wiring' -RouteHref '/jarvis-unified-product-ia-readiness-summary-wiring' -Phase 'Phase 3930' -Title 'Jarvis Unified Product IA Readiness Summary Wiring'