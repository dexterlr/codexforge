$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3916 Jarvis Unified Product IA Home Order Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-home-order-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Home Order Wiring' -RouteHref '/jarvis-unified-product-ia-home-order-wiring' -Phase 'Phase 3916' -Title 'Jarvis Unified Product IA Home Order Wiring'