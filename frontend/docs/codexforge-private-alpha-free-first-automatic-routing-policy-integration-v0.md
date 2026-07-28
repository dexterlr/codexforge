# CodexForge Private Alpha Free-First Automatic Routing Policy Integration v0

## Scope

Slice M adds an opt-in, server-owned, free-first selection path for Private Alpha.
It performs model selection before run creation only.

Automatic selection never:

- persists a run by itself;
- approves a run;
- executes a run;
- transfers the prompt to Groq;
- performs provider generation;
- retries, falls back, substitutes providers, or reroutes a persisted run.

## Admitted automatic candidates

The only automatic candidates in Slice M are:

1. `ollama-local::gpt-oss:20b`
2. `groq-cloud::openai/gpt-oss-20b`

`groq-cloud::openai/gpt-oss-120b` remains manual-only.

## Routing posture

- Local Ollama is always inspected first.
- A successful local selection performs zero Groq credential, configuration, or discovery calls.
- Groq 20B is considered only after local is affirmatively unavailable.
- Groq 20B automatic consideration also requires:
  - `routingMode: "free-first"`
  - `capability: "text"`
  - `maximumOutputTokens <= 512`
  - explicit metadata-probe acknowledgement
  - explicit request-scoped Free-tier operator confirmation
- Groq automatic selection is metadata-only and remains capped at the admitted 512-token output envelope.

## Selection result contract

The free-first routing endpoint returns safe selection metadata only:

- deterministic routing decision;
- runtime snapshots;
- whether cloud metadata was inspected;
- explicit `promptTransferredToCloud: false`;
- explicit `providerGenerationPerformed: false`.

The endpoint never accepts prompt text, budgets, paid approval, retry, fallback, substitution, or candidate-policy controls from the browser.

## Create, approve, and execute integration

When routing returns `selected-for-approval`, the client derives the exact label from its allowlisted mapping and then calls the existing create-run path with the unchanged five-field payload:

```ts
{
  requestText,
  capability: "text",
  modelKey,
  modelPreferenceLabel,
  maximumOutputTokens,
}
```

The created run remains `awaiting_approval`.

Manual approval, cloud-transfer acknowledgement, cloud-execution acknowledgement, exact binding, and explicit execute remain mandatory.

Groq execution also now requires a separate request-scoped execution-time operator confirmation that the current Groq account remains Free tier.

## Envelope hardening

- New direct or manual Groq requests accept `1..512`.
- New Groq requests at `513` are rejected before persistence or provider work.
- Local requests retain `1..4096`.
- Automatic routing may still select local for `513..4096`.
- Historical Groq records above `512` remain readable.
- Historical Groq execution above `512` is blocked after the first kill-switch check and before adapter, credential, availability, or generation work.
