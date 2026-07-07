$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3928 Jarvis Unified Product IA Capability Grid Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-capability-grid-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Capability Grid Wiring' -RouteHref '/jarvis-unified-product-ia-capability-grid-wiring' -Phase 'Phase 3928' -Title 'Jarvis Unified Product IA Capability Grid Wiring'