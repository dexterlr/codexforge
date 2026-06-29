param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-profit-lockbox-reinvestment-rules-smoke-helper.ps1") `
  -SmokeName "Phase 1721 Controlled Profit Lockbox Reinvestment Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-profit-lockbox-reinvestment-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-profit-lockbox-reinvestment-release-candidate" `
  -Route "src\app\controlled-profit-lockbox-reinvestment-release-candidate" `
  -MainPanel "ProfitLockboxReinvestmentRulesRoutePanel" `
  -CommandLabel "Go to Controlled Profit Lockbox Reinvestment Release Candidate" `
  -RouteHref "/controlled-profit-lockbox-reinvestment-release-candidate" `
  -Markers @("Controlled profit lockbox reinvestment release candidate", "Controlled profit lockbox reinvestment release candidate does not move money withdraw funds transfer funds reinvest capital read live P&L connect brokers read accounts place trades fetch live market data provide financial advice provide personalised recommendations issue buy sell instructions guarantee profit automate trading size orders monitor live accounts dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend", "Controlled profit lockbox reinvestment release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned profit lockbox and reinvestment workflows without frontend money movement", "Denied controlled profit lockbox reinvestment paths remain blocked", "Controlled profit lockbox reinvestment release checklist")
