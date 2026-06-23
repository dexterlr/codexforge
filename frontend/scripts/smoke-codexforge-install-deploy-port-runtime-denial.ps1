param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-command-runner-safety-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1508 Install Deploy Port Runtime Denial" `
  -ScriptFile "smoke-codexforge-install-deploy-port-runtime-denial.ps1" `
  -Domain "src\lib\codexforge\install-deploy-port-runtime-denial" `
  -Route "src\app\install-deploy-port-runtime-denial" `
  -MainPanel "CommandRunnerSafetyV2RoutePanel" `
  -CommandLabel "Go to Install Deploy Port Runtime Denial" `
  -RouteHref "/install-deploy-port-runtime-denial" `
  -Markers @("Install deploy port runtime denial", "Install deploy port runtime denial does not install deploy bind ports or start runtimes", "Install deploy port runtime denial requires explicit operator approval", "Install deploy port runtime denial blocks package installs deploy commands server starts port binding background processes runtime launches and daemonized tasks", "Denied install deploy port runtime paths remain blocked", "Install deploy port runtime checklist")
