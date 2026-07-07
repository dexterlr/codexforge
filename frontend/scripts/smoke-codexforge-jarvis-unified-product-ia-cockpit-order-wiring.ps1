$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3917 Jarvis Unified Product IA Cockpit Order Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-cockpit-order-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Cockpit Order Wiring' -RouteHref '/jarvis-unified-product-ia-cockpit-order-wiring' -Phase 'Phase 3917' -Title 'Jarvis Unified Product IA Cockpit Order Wiring'