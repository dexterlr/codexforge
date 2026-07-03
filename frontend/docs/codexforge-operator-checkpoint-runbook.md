# CodexForge Operator Checkpoint Runbook

Canonical workspace:

```text

C:\ai-lab\projects\openclaw-workspace\repos\health-tracker\frontend

```

This runbook is for documentation and hygiene checkpoints. It does not approve live execution.

## Verify The Workspace

```powershell

Get-Location

git status --short

git diff --stat

git diff --check

```

Expected path: `C:\ai-lab\projects\openclaw-workspace\repos\health-tracker\frontend`.

Do not edit duplicate or scratch workspaces while preparing a CodexForge checkpoint.

## Run Build

```powershell

npm run build

```

Build output is local terminal evidence only. Do not claim CI passed unless actual CI or terminal logs prove it.

## Run All-Smoke

```powershell

powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-all.ps1

```

The all-smoke registry is the local source for the highest detected phase. It does not prove remote CI status.

## Run Focused Recent Smokes

```powershell

powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-checkpoint-docs.ps1

powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-command-ui-simplification.ps1

powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-repo-hygiene.ps1

npm run smoke:codexforge:server

```

Use focused smokes to catch documentation drift, command/navigation regressions, repo hygiene drift, and server-rendered route issues.

## Inspect All-Smoke For Latest Phase

```powershell

$allSmoke = Get-Content -Raw .\scripts\smoke-codexforge-all.ps1

$phases = [regex]::Matches($allSmoke, 'Phase\s+(\d+)') |

  ForEach-Object { [int]$_.Groups[1].Value }

$phases | Sort-Object -Descending | Select-Object -First 1

```

Update checkpoint docs to the actual highest detected phase. If phases 1114-1129 are present and no higher phase exists, document the checkpoint as through phase 1129 and describe the simulated command execution dry-run review layer: Simulated Command Execution Boundary, Simulated Command Intent Packet, Simulated Command Plan Packet, Simulated Command Argument Review, Simulated Command Environment Review, Simulated Command Working Directory Review, Simulated Command Risk Review, Simulated Command Evidence Preview, Simulated Command Result Preview, Simulated Command Failure Preview, Simulated Command Recovery Preview, Simulated Command Operator Review, Simulated Command Execution Hold State, Simulated Command Validation Preview, First Simulated Command Candidate, and Controlled Simulated Command Release Candidate surfaces. Keep the package preview-only, dry-run, approval-required, not executable from UI, not routed live, not auto-approved, not persisted as approval decisions, and not allowed to create queue jobs, persist queue state, release locks, run dry-runs, run validation, make live model calls, provider calls, credential reads, secret reads, network calls, prompt sends, backend adapter execution, project adapter execution, game adapter execution, domain adapter execution, file writes, file updates, file deletes, file moves, patch applies, command execution, shell execution, git execution, test execution, build execution, smoke execution, runtime starts, app scaffolds, website publishing, live data connections, tool creation, research browsing, automation creation, asset rendering, trading or broker calls, data ingestion, documentation export, integration connections, evidence/result/model-output persistence, recovery triggers, packaging/export, scaffolding, automatic memory promotions, browser credential writes, browser credential storage, hidden model calls, arbitrary path crawling, arbitrary local file browsing, auto-open local files, real path mutation, environment value reads, secret display, or hidden execution unless future approved backend-owned bounded implementations and evidence exist. Models are workers; CodexForge is the brain and owns the shared memory, knowledge, evidence, result, audit, and approval layer. Supported target language must remain broad and cover games, apps, websites, dashboards, tools, research packs, automation workflows, creative workflows, trading workspaces, data workspaces, documentation packs, integrations, and general local projects.

Current checkpoint note: through phase 2345 with the latest completed batch recorded as 2314-2345 - Provider Gateway Backend Adapter Contract Mega Batch v1 and latest release candidate recorded as Controlled Provider Backend Adapter Contract Completion Candidate. /codexforge-cockpit keeps the premium Jarvis command area, First Backend Wiring Boundary readiness rail, and Provider Gateway Wiring readiness section, and now includes the Provider Backend Adapter Contract readiness section: Provider Backend Adapter Contract, adapter interface contract-only, adapter manifest review-only, request mapping synthetic only, response mapping synthetic only, error mapping policy-only, audit mapping required, approval mapping required, credential requirement backend-only, token handling backend-only, streaming blocked, retry/fallback/timeout contract-only, sandbox boundary required, disabled adapter catalog all disabled, implementation state blocked, and next batch 2346-2377 - First Provider Adapter Dry Run Harness Mega Batch v1. No live provider execution exists yet. No backend adapter implementation exists yet. No provider calls from frontend. No model calls from frontend. No prompt sending. No streaming. No credential storage. No token storage. Provider backend adapter remains backend-owned. Explicit operator approval required. Audit trail required. Next likely batch: 2346-2377 - First Provider Adapter Dry Run Harness Mega Batch v1.

The current phase ledger includes the latest Provider Gateway Backend Adapter Contract batch:

- Phase 2314 - Provider Backend Adapter Contract Map.
- Phase 2315 - Provider Adapter Interface Preview.
- Phase 2316 - Provider Adapter Manifest Preview.
- Phase 2317 - Provider Adapter Request Mapping Preview.
- Phase 2318 - Provider Adapter Response Mapping Preview.
- Phase 2319 - Provider Adapter Error Mapping Preview.
- Phase 2320 - Provider Adapter Audit Mapping Preview.
- Phase 2321 - Provider Adapter Approval Mapping Preview.
- Phase 2322 - Provider Adapter Credential Requirement Preview.
- Phase 2323 - Provider Adapter Token Handling Preview.
- Phase 2324 - Provider Adapter Streaming Contract Preview.
- Phase 2325 - Provider Adapter Retry Contract Preview.
- Phase 2326 - Provider Adapter Timeout Contract Preview.
- Phase 2327 - Provider Adapter Fallback Contract Preview.
- Phase 2328 - Provider Adapter Sandbox Boundary Preview.
- Phase 2329 - Disabled Provider Backend Adapter Catalog.
- Phase 2330 - Provider Adapter Cockpit Readiness Rail.
- Phase 2331 - Provider Adapter Test Harness Contract Preview.
- Phase 2332 - Provider Adapter Mock Fixture Contract Preview.
- Phase 2333 - Provider Adapter Redaction Contract Preview.
- Phase 2334 - Provider Adapter Cost Accounting Contract Preview.
- Phase 2335 - Provider Adapter Rate Limit Accounting Contract Preview.
- Phase 2336 - Provider Adapter Observability Contract Preview.
- Phase 2337 - Provider Adapter Safety Regression Guard.
- Phase 2338 - Provider Adapter Navigation Regression Guard.
- Phase 2339 - Provider Adapter Smoke Coverage Guard.
- Phase 2340 - Provider Adapter Checkpoint Completion Guard.
- Phase 2341 - First Provider Backend Adapter Contract Candidate.
- Phase 2342 - Provider Adapter Implementation Still Blocked Guard.
- Phase 2343 - Provider Adapter Backend Readiness Summary.
- Phase 2344 - Controlled Provider Backend Adapter Contract Release Candidate.
- Phase 2345 - Controlled Provider Backend Adapter Contract Completion Candidate.

The previous phase ledger includes the latest First Backend Wiring Boundary batch:

- Phase 2250 - First Backend Wiring Boundary Map.
- Phase 2251 - Server Only Module Boundary Preview.
- Phase 2252 - Frontend To Backend Request Boundary Preview.
- Phase 2253 - Environment Config Boundary Preview.
- Phase 2254 - Provider Gateway Wiring Boundary Preview.
- Phase 2255 - Asset Storage Wiring Boundary Preview.
- Phase 2256 - Audio Storage Wiring Boundary Preview.
- Phase 2257 - Render Queue Wiring Boundary Preview.
- Phase 2258 - Worker Orchestration Wiring Boundary Preview.
- Phase 2259 - Artifact Export Wiring Boundary Preview.
- Phase 2260 - Publish Gateway Wiring Boundary Preview.
- Phase 2261 - Approval Capture Wiring Boundary Preview.
- Phase 2262 - Rights Consent Audit Wiring Boundary Preview.
- Phase 2263 - Command Action Adapter Boundary Preview.
- Phase 2264 - Cockpit Backend Readiness Rail.
- Phase 2265 - Disabled Backend Adapter Layer Preview.
- Phase 2266 - Endpoint Inventory Preview.
- Phase 2267 - Contract To Service Mapping Preview.
- Phase 2268 - Backend Error Envelope Preview.
- Phase 2269 - Backend Audit Envelope Preview.
- Phase 2270 - Backend Permission Envelope Preview.
- Phase 2271 - Backend Idempotency Boundary Preview.
- Phase 2272 - Backend Rate Limit Boundary Preview.
- Phase 2273 - Backend Secret Handling Boundary Preview.
- Phase 2274 - Backend Observability Boundary Preview.
- Phase 2275 - Backend Wiring Safety Regression Guard.
- Phase 2276 - Backend Wiring Navigation Regression Guard.
- Phase 2277 - Backend Wiring Smoke Coverage Guard.
- Phase 2278 - Backend Wiring Checkpoint Completion Guard.
- Phase 2279 - First Provider Wiring Readiness Preview.
- Phase 2280 - Controlled Backend Wiring Boundary Release Candidate.
- Phase 2281 - Controlled First Backend Wiring Boundary Completion Candidate.

The earlier phase ledger includes the latest Jarvis cockpit visual upgrade batch:

- Phase 2218 - Jarvis Cockpit Visual System.
- Phase 2219 - Mission Control Hero Preview.
- Phase 2220 - Holographic Command Grid Preview.
- Phase 2221 - Readiness Orb Cluster Preview.
- Phase 2222 - Cinematic Workflow Timeline Preview.
- Phase 2223 - Project Command Brief Panel Preview.
- Phase 2224 - Storyboard Orbit Panel Preview.
- Phase 2225 - Asset Audio Status Matrix Preview.
- Phase 2226 - Approval Rights Safety Rail Preview.
- Phase 2227 - Backend Systems Health Wall Preview.
- Phase 2228 - Blocked Action Command Deck Preview.
- Phase 2229 - Contract Status Drawer Preview.
- Phase 2230 - Premium Dark Glass Theme Preview.
- Phase 2231 - Responsive Command Centre Layout Preview.
- Phase 2232 - Cockpit Visual Accessibility Guard.
- Phase 2233 - Cockpit Animation Safety Guard.
- Phase 2234 - Cockpit Performance Budget Guard.
- Phase 2235 - Cockpit Empty Loading States Preview.
- Phase 2236 - Cockpit Microcopy Polish Preview.
- Phase 2237 - Cockpit Iconography System Preview.
- Phase 2238 - Cockpit Depth Lighting System Preview.
- Phase 2239 - Cockpit Data Density Tuning Preview.
- Phase 2240 - Cockpit Mobile Command Layout Preview.
- Phase 2241 - Cockpit High End UX Summary.
- Phase 2242 - First Jarvis Cockpit Candidate.
- Phase 2243 - Controlled Jarvis Cockpit Release Candidate.
- Phase 2244 - Jarvis Cockpit Safety Regression Guard.
- Phase 2245 - Jarvis Cockpit Navigation Regression Guard.
- Phase 2246 - Jarvis Cockpit Smoke Coverage Guard.
- Phase 2247 - Jarvis Cockpit Checkpoint Completion Guard.
- Phase 2248 - First Backend Wiring Readiness After Visual Upgrade.
- Phase 2249 - Controlled Jarvis Cockpit Completion Candidate.

The previous phase ledger includes the latest interactive video workspace UX batch:

- Phase 2186 - Interactive Video Workspace Shell.

- Phase 2187 - Project Brief Editor Mock.

- Phase 2188 - Audience Outcome Selector Mock.

- Phase 2189 - Script Outline Editor Mock.

- Phase 2190 - Scene Storyboard Builder Mock.

- Phase 2191 - Shot List Planner Mock.

- Phase 2192 - Asset Checklist Panel Mock.

- Phase 2193 - Audio Voiceover Planner Mock.

- Phase 2194 - Caption Accessibility Planner Mock.

- Phase 2195 - Brand Style Guard Panel Mock.

- Phase 2196 - Rights Consent Checklist Mock.

- Phase 2197 - Approval Gate Checklist Mock.

- Phase 2198 - Render Readiness Panel Mock.

- Phase 2199 - Export Readiness Panel Mock.

- Phase 2200 - Publish Readiness Panel Mock.

- Phase 2201 - Fake Video Job Timeline Mock.

- Phase 2202 - Blocked Backend Action Centre.

- Phase 2203 - Interactive Workspace Empty State.

- Phase 2204 - Interactive Workspace Dirty State Mock.

- Phase 2205 - Interactive Workspace Review State Mock.

- Phase 2206 - Interactive Workspace Approved State Mock.

- Phase 2207 - Interactive Workspace Blocked State Mock.

- Phase 2208 - Interactive UX Contract Summary.

- Phase 2209 - Cockpit Interactive Video Workspace Summary.

- Phase 2210 - First Interactive Video Workspace Candidate.

- Phase 2211 - Controlled Interactive Video Workspace Release Candidate.

- Phase 2212 - UX Safety Regression Guard.

- Phase 2213 - UX Navigation Integration Guard.

- Phase 2214 - UX Smoke Coverage Guard.

- Phase 2215 - UX Checkpoint Completion Guard.

- Phase 2216 - First Backend Wiring Readiness Preview.

- Phase 2217 - Controlled Interactive Video Workspace Completion Candidate.

The previous phase ledger includes the latest approval rights audit contract batch:

- Phase 2154 - Approval Capture Contract Boundary.

- Phase 2155 - Approval Request Schema Preview.

- Phase 2156 - Operator Attestation Preview.

- Phase 2157 - Multi Step Approval Chain Preview.

- Phase 2158 - Approval Expiration Policy Preview.

- Phase 2159 - Approval Revocation Policy Preview.

- Phase 2160 - Approval Evidence Packet Preview.

- Phase 2161 - Approval Denial Ledger Preview.

- Phase 2162 - Approval Escalation Policy Preview.

- Phase 2163 - Approval Audit Event Preview.

- Phase 2164 - Frontend Approval Persistence Blocked Preview.

- Phase 2165 - Cockpit Approval Capture Contract Summary.

- Phase 2166 - First Approval Capture Contract Candidate.

- Phase 2167 - Controlled Approval Capture Contract Release Candidate.

- Phase 2168 - Rights Consent Audit Contract Boundary.

- Phase 2169 - Rights Evidence Schema Preview.

- Phase 2170 - Consent Evidence Schema Preview.

- Phase 2171 - Likeness Consent Contract Preview.

- Phase 2172 - Music Rights Contract Preview.

- Phase 2173 - Brand Legal Review Contract Preview.

- Phase 2174 - Usage License Policy Preview.

- Phase 2175 - Consent Expiration Policy Preview.

- Phase 2176 - Consent Revocation Policy Preview.

- Phase 2177 - Immutable Audit Ledger Preview.

- Phase 2178 - Audit Redaction Policy Preview.

- Phase 2179 - Audit Retention Policy Preview.

- Phase 2180 - Frontend Rights Consent Persistence Blocked Preview.

- Phase 2181 - Cockpit Rights Consent Audit Contract Summary.

- Phase 2182 - First Rights Consent Audit Contract Candidate.

- Phase 2183 - Controlled Rights Consent Audit Contract Release Candidate.

- Phase 2184 - Unified Approval Rights Audit Release Gate Preview.

- Phase 2185 - Controlled Foundation Contracts Completion Candidate.

The current phase ledger is:

- Phase 890 - Controlled Model Use Dry-Run Inventory.

- Phase 891 - OpenAI-Compatible Model Use Dry-Run.

- Phase 892 - Local Model Use Dry-Run.

- Phase 893 - Free Model Use Dry-Run.

- Phase 894 - Paid Model Use Dry-Run.

- Phase 895 - Pro Model Use Dry-Run.

- Phase 896 - Specialist Video Model Use Dry-Run.

- Phase 897 - Specialist Image Model Use Dry-Run.

- Phase 898 - Specialist Coding Model Use Dry-Run.

- Phase 899 - Specialist Research Model Use Dry-Run.

- Phase 900 - Specialist Trading Model Use Dry-Run.

- Phase 901 - Shared Context Packet Validation.

- Phase 902 - Shared Memory Handoff Validation.

- Phase 903 - Model Router Decision Explanation Review.

- Phase 904 - First Controlled Model Router Trial Review.

- Phase 905 - Controlled Model Use Release Candidate.

- Phase 906 - Live Provider Readiness Boundary.

- Phase 907 - Approved Provider Test Packet.

- Phase 908 - OpenAI-Compatible Provider Test Packet.

- Phase 909 - Local Model Bridge Dry-Run.

- Phase 910 - Free Model Provider Trial Packet.

- Phase 911 - Paid Model Provider Trial Packet.

- Phase 912 - Pro Model Provider Trial Packet.

- Phase 913 - Specialist Model Provider Trial Packet.

- Phase 914 - Model Router Trial Cockpit.

- Phase 915 - Model Router Candidate Ranking Review.

- Phase 916 - Model Router Budget Decision Review.

- Phase 917 - Model Router Privacy Decision Review.

- Phase 918 - Model Router Shared Context Review.

- Phase 919 - Model Router Evidence Capture Review.

- Phase 920 - First Controlled Provider Trial Candidate.

- Phase 921 - Model Router Execution Readiness Candidate.

- Phase 922 - Approved Provider Health Check Boundary.

- Phase 923 - Provider Health Check Request Packet.

- Phase 924 - Provider Health Check Result Packet.

- Phase 925 - Local Model Bridge Readiness Review.

- Phase 926 - Local Model Bridge Context Packet.

- Phase 927 - Local Model Bridge Evidence Packet.

- Phase 928 - OpenAI-Compatible Router Trial Result.

- Phase 929 - Free Model Router Trial Result.

- Phase 930 - Paid Model Router Trial Result.

- Phase 931 - Pro Model Router Trial Result.

- Phase 932 - Specialist Model Router Trial Result.

- Phase 933 - Model Router Trial Summary.

- Phase 934 - Model Router Trial Regression Guard.

- Phase 935 - Model Router Trial Operator Review.

- Phase 936 - First Model Router Beta Candidate.

- Phase 937 - Controlled Model Router Beta Release Candidate.

- Phase 938 - Backend Execution Router Integration Boundary.

- Phase 939 - File Write Model-Routed Execution Preview.

- Phase 940 - Command Runner Model-Routed Execution Preview.

- Phase 941 - Local Runtime Model-Routed Execution Preview.

- Phase 942 - Evidence Store Model-Routed Execution Preview.

- Phase 943 - Result Store Model-Routed Execution Preview.

- Phase 944 - Recovery Model-Routed Execution Preview.

- Phase 945 - Packaging Model-Routed Execution Preview.

- Phase 946 - Project Scaffold Model-Routed Execution Preview.

- Phase 947 - Model-Routed Execution Approval Packet.

- Phase 948 - Model-Routed Execution Audit Packet.

- Phase 949 - Model-Routed Execution Sandbox Review.

- Phase 950 - Model-Routed Execution Validation Review.

- Phase 951 - Model-Routed Execution Operator Trial.

- Phase 952 - First Model-Routed Backend Execution Candidate.

- Phase 953 - Controlled Backend Model Router Release Candidate.

- Phase 954 - Project Builder MVP Integration Boundary.

- Phase 955 - Project Goal Intake Packet.

- Phase 956 - Project Domain Classifier Preview.

- Phase 957 - Project Plan Model-Routing Preview.

- Phase 958 - Project File Plan Preview.

- Phase 959 - Project Command Plan Preview.

- Phase 960 - Project Runtime Plan Preview.

- Phase 961 - Project Evidence Plan Preview.

- Phase 962 - Project Result Plan Preview.

- Phase 963 - Project Recovery Plan Preview.

- Phase 964 - Project Packaging Plan Preview.

- Phase 965 - Project Approval Plan Preview.

- Phase 966 - Project Builder Operator Review.

- Phase 967 - First Useful Project Builder Candidate.

- Phase 968 - Project Builder MVP Trial Packet.

- Phase 969 - Controlled Project Builder Release Candidate.

- Phase 970 - Universal Game Builder Boundary.

- Phase 971 - Game Target Intake Packet.

- Phase 972 - Game Platform Classifier Preview.

- Phase 973 - Game Server Plan Preview.

- Phase 974 - Game Modpack Plan Preview.

- Phase 975 - Game Content Plan Preview.

- Phase 976 - Game Automation Plan Preview.

- Phase 977 - Game Asset Pipeline Plan Preview.

- Phase 978 - Game Deployment Plan Preview.

- Phase 979 - Game Safety Approval Plan.

- Phase 980 - Game Evidence Capture Plan.

- Phase 981 - Game Result Review Plan.

- Phase 982 - Game Recovery Plan Preview.

- Phase 983 - Game Packaging Plan Preview.

- Phase 984 - First Universal Game Builder Candidate.

- Phase 985 - Controlled Universal Game Builder Release Candidate.

- Phase 986 - Universal Project Builder Boundary.

- Phase 987 - App Builder Target Packet.

- Phase 988 - Website Builder Target Packet.

- Phase 989 - Dashboard Builder Target Packet.

- Phase 990 - Tool Builder Target Packet.

- Phase 991 - Research Pack Builder Target Packet.

- Phase 992 - Automation Workflow Builder Target Packet.

- Phase 993 - Creative Workflow Builder Target Packet.

- Phase 994 - Trading Workspace Builder Target Packet.

- Phase 995 - Data Workspace Builder Target Packet.

- Phase 996 - Documentation Pack Builder Target Packet.

- Phase 997 - Integration Pack Builder Target Packet.

- Phase 998 - Universal Project Builder Safety Plan.

- Phase 999 - First Universal Project Builder Candidate.

- Phase 1000 - Universal Builder MVP Trial Packet.

- Phase 1001 - Controlled Universal Project Builder Release Candidate.

- Phase 1002 - Universal Builder Cockpit Boundary.

- Phase 1003 - Build Anything Goal Composer.

- Phase 1004 - Builder Intent Clarifier Preview.

- Phase 1005 - Builder Target Recommendation Preview.

- Phase 1006 - Builder Plan Outline Preview.

- Phase 1007 - Builder Adapter Stack Preview.

- Phase 1008 - Builder Approval Timeline Preview.

- Phase 1009 - Builder Evidence Timeline Preview.

- Phase 1010 - Builder Result Timeline Preview.

- Phase 1011 - Builder Recovery Timeline Preview.

- Phase 1012 - Builder Packaging Timeline Preview.

- Phase 1013 - Builder Cost Privacy Risk Review.

- Phase 1014 - Builder Operator Decision Packet.

- Phase 1015 - First Guided Build Anything Candidate.

- Phase 1016 - Universal Builder Cockpit Trial Packet.

- Phase 1017 - Controlled Universal Builder Cockpit Release Candidate.

- Phase 1018 - Guided Build Workflow Boundary.

- Phase 1019 - Guided Build Goal Review.

- Phase 1020 - Guided Build Target Selection.

- Phase 1021 - Guided Build Requirement Checklist.

- Phase 1022 - Guided Build Architecture Sketch.

- Phase 1023 - Guided Build File Blueprint.

- Phase 1024 - Guided Build Command Blueprint.

- Phase 1025 - Guided Build Runtime Blueprint.

- Phase 1026 - Guided Build Adapter Blueprint.

- Phase 1027 - Guided Build Validation Blueprint.

- Phase 1028 - Guided Build Risk Review.

- Phase 1029 - Guided Build Approval Queue.

- Phase 1030 - Guided Build Evidence Plan.

- Phase 1031 - Guided Build Result Plan.

- Phase 1032 - First Practical Guided Build Candidate.

- Phase 1033 - Controlled Guided Build Workflow Release Candidate.

- Phase 1034 - Build Plan Bundle Boundary.

- Phase 1035 - Build Plan Summary Packet.

- Phase 1036 - Build Plan Requirements Packet.

- Phase 1037 - Build Plan Architecture Packet.

- Phase 1038 - Build Plan File Manifest Packet.

- Phase 1039 - Build Plan Command Manifest Packet.

- Phase 1040 - Build Plan Runtime Manifest Packet.

- Phase 1041 - Build Plan Adapter Manifest Packet.

- Phase 1042 - Build Plan Validation Manifest Packet.

- Phase 1043 - Build Plan Risk Manifest Packet.

- Phase 1044 - Build Plan Approval Manifest Packet.

- Phase 1045 - Build Plan Evidence Manifest Packet.

- Phase 1046 - Build Plan Result Manifest Packet.

- Phase 1047 - Build Plan Recovery Manifest Packet.

- Phase 1048 - First Complete Build Plan Candidate.

- Phase 1049 - Controlled Build Plan Bundle Release Candidate.

- Phase 1050 - Build Plan Approval Boundary.

- Phase 1051 - Build Plan Approval Queue.

- Phase 1052 - Build Plan Approval Detail Packet.

- Phase 1053 - Build Plan Approval Diff Preview.

- Phase 1054 - Build Plan Approval Command Preview.

- Phase 1055 - Build Plan Approval Runtime Preview.

- Phase 1056 - Build Plan Approval Adapter Preview.

- Phase 1057 - Build Plan Approval Risk Gate.

- Phase 1058 - Build Plan Approval Evidence Gate.

- Phase 1059 - Build Plan Approval Result Gate.

- Phase 1060 - Build Plan Approval Recovery Gate.

- Phase 1061 - Build Plan Ready-To-Execute Packet.

- Phase 1062 - Build Plan Execution Hold State.

- Phase 1063 - Build Plan Operator Signoff Packet.

- Phase 1064 - First Approved Build Plan Candidate.

- Phase 1065 - Controlled Build Plan Approval Release Candidate.

- Phase 1066 - Guarded Execution Queue Boundary.

- Phase 1067 - Guarded Execution Queue Item.

- Phase 1068 - Guarded File Write Handoff Preview.

- Phase 1069 - Guarded Command Handoff Preview.

- Phase 1070 - Guarded Runtime Handoff Preview.

- Phase 1071 - Guarded Adapter Handoff Preview.

- Phase 1072 - Guarded Domain Handoff Preview.

- Phase 1073 - Guarded Evidence Handoff Preview.

- Phase 1074 - Guarded Result Handoff Preview.

- Phase 1075 - Guarded Recovery Handoff Preview.

- Phase 1076 - Guarded Packaging Handoff Preview.

- Phase 1077 - Guarded Execution Preflight Checklist.

- Phase 1078 - Guarded Execution Operator Lock.

- Phase 1079 - Guarded Execution Dry-Run Ticket.

- Phase 1080 - First Guarded Execution Queue Candidate.

- Phase 1081 - Controlled Guarded Execution Queue Release Candidate.

- Phase 1082 - Dry-Run Execution Handoff Boundary.

- Phase 1083 - Dry-Run File Write Ticket.

- Phase 1084 - Dry-Run Command Ticket.

- Phase 1085 - Dry-Run Runtime Ticket.

- Phase 1086 - Dry-Run Adapter Ticket.

- Phase 1087 - Dry-Run Domain Ticket.

- Phase 1088 - Dry-Run Evidence Ticket.

- Phase 1089 - Dry-Run Result Ticket.

- Phase 1090 - Dry-Run Recovery Ticket.

- Phase 1091 - Dry-Run Packaging Ticket.

- Phase 1092 - Dry-Run Execution Trace Preview.

- Phase 1093 - Dry-Run Execution Validation Preview.

- Phase 1094 - Dry-Run Execution Operator Review.

- Phase 1095 - Dry-Run Execution Hold Release Preview.

- Phase 1096 - First Dry-Run Execution Arm Candidate.

- Phase 1097 - Controlled Dry-Run Execution Handoff Release Candidate.

- Phase 1098 - Simulated File Write Dry-Run Boundary.

- Phase 1099 - Simulated File Diff Packet.

- Phase 1100 - Simulated File Create Packet.

- Phase 1101 - Simulated File Update Packet.

- Phase 1102 - Simulated File Delete Packet.

- Phase 1103 - Simulated File Move Packet.

- Phase 1104 - Simulated File Patch Packet.

- Phase 1105 - Simulated File Conflict Review.

- Phase 1106 - Simulated File Safety Review.

- Phase 1107 - Simulated File Evidence Preview.

- Phase 1108 - Simulated File Result Preview.

- Phase 1109 - Simulated File Recovery Preview.

- Phase 1110 - Simulated File Operator Review.

- Phase 1111 - Simulated File Apply Hold State.

- Phase 1112 - First Simulated File Write Candidate.

- Phase 1113 - Controlled Simulated File Write Release Candidate.

## Commit And Tag Checkpoint Docs

1. Confirm `git status --short` shows only intentional README, docs, and smoke script changes.

2. Run build, checkpoint docs smoke, all-smoke, focused smokes, server smoke, and diff hygiene checks.

3. Stage only the approved checkpoint files.

4. Commit after explicit operator approval.

5. Tag after explicit operator approval and after reviewing the final commit.

## Recover If Checkpoint Docs Smoke Fails

- Read the failing `[FAIL]` line first.

- If the highest detected phase changed, update the checkpoint docs to the actual all-smoke state.

- If safety wording is missing, add plain language for review-only surfaces, explicit operator approval, no silent mutation, no provider/local/connector/automation execution without approval, no credential/output storage, and no memory auto-promotion.

- If the smoke finds stale 230-series language, remove the obsolete roadmap text.

- If the smoke finds a false live execution or CI claim, replace it with bounded approval-language or proof-backed validation language.

- Re-run `powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-checkpoint-docs.ps1`.

## What Not To Edit

- Do not create product phase surfaces.

- Do not add runtime workflow routes for documentation-only checkpoints.

- Do not add dependencies or package install behavior.

- Do not edit ignored/generated folders such as `node_modules`, `.next`, `out`, `dist`, `build`, `coverage`, `.operator`, `.codexforge`, `.checkpoints`, `_codexforge-backups`, or `unpushed-patches`.

- Do not call providers, local models, connectors, automations, web, files, shell, git, or local bridge from UI.

- Do not mutate Brain or memory.

- Do not store credentials or live outputs in `localStorage` or `sessionStorage`.

- Do not claim live execution unless an approved local/backend/provider boundary exists.
