# CodexForge Groq Live Qualification Admission v0

## Bounded Live Qualification Evidence

One controlled live Groq qualification completed on `2026-07-26`.

Authenticated discovery returned both allowlisted model IDs:

- `openai/gpt-oss-20b`
- `openai/gpt-oss-120b`

Observed bounded facts from that live qualification:

- both models were reported active on `2026-07-26`
- provider-reported context window: `131072`
- provider-reported maximum output: `65536`
- CodexForge-approved maximum output remains `4096`
- exact visible-output qualification passed for both models
- reasoning was not exposed
- no tool request or tool result was exposed
- no retry occurred
- no fallback occurred
- the operator confirmed the Groq Free tier on `2026-07-26`

## Admission Boundaries

Groq is admitted to the authoritative model catalog for manual routing only.

Automatic routing remains disabled for Groq:

- `local-only` does not select Groq
- `free-only` does not select Groq
- `free-first` does not select Groq automatically
- `best-within-budget` does not select Groq automatically

Free does not mean private. Groq remains a cloud provider, and cloud privacy
approval is still a separate gate.

Current private-alpha execution remains local-only on Ollama. No Jarvis provider
selector exists in this slice.

Catalog admission is not execution integration. A routing decision is not
provider execution.

Paid execution is not enabled by this slice.

## Storage And Change Limits

No credential is stored.

No acceptance token is stored.

No prompt text is stored.

No raw provider response is stored.

Only bounded qualification facts are recorded.

Account tier and provider limits can change. The Free-tier confirmation from
`2026-07-26` must be revalidated if the organisation changes or if provider
limits change.

## Next Slices

The next slice is a typed Groq `PrivateAlphaProviderAdapter` plus the runtime
availability boundary.

Later slices add:

- explicit cloud approval
- manual execution
- UI selection
- free-first automation
