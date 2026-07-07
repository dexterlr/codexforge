$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3935 Jarvis Unified Product IA Navigation Shell Order Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-navigation-shell-order-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Navigation Shell Order Wiring' -RouteHref '/jarvis-unified-product-ia-navigation-shell-order-wiring' -Phase 'Phase 3935' -Title 'Jarvis Unified Product IA Navigation Shell Order Wiring'