# Phase 2B.0D: server-owned credential readiness

`GET /api/codexforge/animation-studio/provider-readiness` is a read-only local configuration check. It uses the same server-side credential parser as the real estimate transport, behind the existing Studio feature flag and local request boundary. No UI or live estimate button is changed.

The route requires `CODEXFORGE_STUDIO_OPERATOR_ENABLED="1"`, an actual loopback-only listener, the existing `X-CodexForge-Animation-Studio: local-operator-v1` client marker, matching Host/URL and any supplied Origin, accepted direct-request forwarded metadata, and same-origin fetch metadata when supplied. It accepts only GET with no query or body. Other methods cannot inspect configuration. Disabled Studio still returns `503 studio_disabled` before lookup. No permissive CORS or caching is enabled.

Successful responses contain exactly `ok` and `result`. The result contains only:

| Field | Values |
| --- | --- |
| provider | HIGGSFIELD |
| configuration | NOT_CONFIGURED / LOCALLY_CONFIGURED / INVALID_LOCAL_FORMAT |
| remoteAuthentication | NOT_VERIFIED |
| execution | EXECUTION_DISABLED |
| estimateCapability | READY_LOCALLY only for LOCALLY_CONFIGURED; otherwise BLOCKED |
| generation | LOCKED |

Missing/empty configuration maps to NOT_CONFIGURED. Locally valid structure maps to LOCALLY_CONFIGURED. Malformed values or lookup exceptions map to INVALID_LOCAL_FORMAT. No key, secret, length, prefix, suffix, hash, encoding, identifier or error payload is returned. Configuration is read only after request admission; import, construction, disabled requests and rejected requests perform no lookup.

READY_LOCALLY is **only credential-format readiness**. It is not remote authentication, request compatibility, a quote, an authorization or permission to execute. The endpoint has no project/repository/transport/authority capability. It never prepares an estimate, acquires or consumes an attempt, records costs, changes policies or creates jobs. Repeated calls and restart do not acquire rights. Generation LOCKED describes the endpoint's execution boundary; it is not a substitute for separately checking a saved project's canonical generation state.

The existing project GET can separately provide persisted estimate views. Neither a readiness result nor a prepared intent enables live execution. The final zero-request operation preflight must still establish exact IDs, revision, digest, eligible route, PREPARED state, attempt 0/1 and unconsumed authority. Any actual estimate POST requires separate explicit authorization.

## Validation

Run `node scripts/test-animation-studio-phase2b0d.mjs` for focused synthetic-only source tests. Phase 2B.0C, estimate lifecycle, provider, Phase 1 operator and Phase 0 regression suites remain applicable. Isolated exact-source production build, generated-state TypeScript, focused lint, production HTTP security and client-output sentinel scanning are acceptance gates. Do not reuse or overwrite consumed evidence roots. No UI changed, so a new visual acceptance is not required for this seam.

## Next private server launch (operator only; not run automatically)

Use the private PowerShell that already holds the credential at process scope. Do not paste it into Codex or create credential files. The operator should first stop only their own previously started port-3317 server using that console; do not terminate unknown PIDs or touch port 3000.

Set the non-secret Studio feature flag at process scope in that same console:

```powershell
$env:CODEXFORGE_STUDIO_OPERATOR_ENABLED = '1'
```

Keep the existing private credential in that process. Use the current accepted application source (not the older sealed visual runtime). From its frontend directory, launch a loopback-only webpack server:

```powershell
npm run dev -- --webpack --hostname localhost --port 3317
```

The configuration-only readiness route does not open a workspace. For subsequent canonical project preflight, the server must select the exact accepted synthetic test namespace with the preserved fixture present at that server's workspace root. Do not silently fall back to the default development namespace, seed/replace evidence or copy a fixture into an uncertain destination. See the new phase HANDOFF for the precise source/runtime and fixture-preservation status.

After a separately requested preflight, a same-origin local client may issue the read-only GET with the existing Studio marker. Use `http://localhost:3317` consistently. No credential belongs in the request, URL, browser or client code. Do not automatically run this private preflight during automated acceptance. All automated tests use synthetic configuration only; no provider endpoint is contacted.
