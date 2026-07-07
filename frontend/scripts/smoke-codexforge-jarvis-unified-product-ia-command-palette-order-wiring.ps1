$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3934 Jarvis Unified Product IA Command Palette Order Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-command-palette-order-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Command Palette Order Wiring' -RouteHref '/jarvis-unified-product-ia-command-palette-order-wiring' -Phase 'Phase 3934' -Title 'Jarvis Unified Product IA Command Palette Order Wiring'