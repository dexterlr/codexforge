# CodexForge Private Alpha Provider Adapter Foundation v0

This document describes the typed server-only provider adapter boundary added
between the private-alpha store and the existing local Ollama client.

## Why This Boundary Exists

The store already owns run validation, approval gating, idempotency,
persistence, kill-switch checks, state transitions, and append-only audit
events. It should not also own a concrete provider transport contract.

Slice D introduces one typed server-only adapter boundary so future providers
can implement the same store-facing contract without rewriting store
orchestration.

## Dependency Flow

The execution dependency flow is now:

API routes
-> private-alpha store
-> typed provider adapter
-> Ollama adapter
-> existing server-only Ollama client
-> fixed loopback Ollama API

## Generic Adapter Contract

The generic contract is defined in
`src/lib/codexforge/private-alpha/private-alpha-provider.server.ts`.

It exposes:

- availability probing through `getAvailability()`
- approved text generation through `generateApprovedText(...)`
- a bounded `PrivateAlphaProviderError`

The contract is server-only and transport-agnostic. It does not contain
loopback URLs, fetch logic, provider SDK imports, environment-variable
handling, credential handling, browser storage, or provider-selection logic.

## Ollama Adapter Responsibility

`src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts`
adapts the existing Ollama client to the generic provider contract.

Its responsibility is narrow:

- construct or accept the existing Ollama client
- delegate availability probing unchanged
- delegate approved generation unchanged
- convert `PrivateAlphaOllamaError` into `PrivateAlphaProviderError`
- normalize the impossible `kill_switch_blocked` provider error to
  `ollama_http_error`

It does not duplicate fetch logic, fixed URL construction, timeout handling,
response parsing, GPT-OSS think handling, empty-output handling, or rejection
of unsupported tool or image output. Those remain exclusively inside
`private-alpha-ollama.server.ts`.

## What Stays Unchanged

The private-alpha store still owns orchestration only:

- manual approval requirements
- kill-switch checks
- one-attempt execution admission
- idempotency and replay behavior
- state transitions
- audit events and summaries
- persisted run and execution records
- bounded execution statuses and error responses

Persistence remains unchanged:

- same persisted record shapes
- same record version
- same provider value `ollama-local`
- same model value `gpt-oss:20b`
- same output hashing
- same provider metrics fields
- no schema migration

Approval and audit remain unchanged:

- same approval scope rules
- same approval and execute split
- same audit event types
- same audit summaries

Errors and statuses remain unchanged:

- same kill-switch behavior
- same availability block behavior
- same execution failure codes
- same response statuses
- same unknown-error fallback to `ollama_http_error` plus the existing safe
  unexpected-failure message

## Explicit Non-Goals

Slice D does not add:

- a second provider
- a provider selector
- a provider registry
- fallback
- retry
- streaming
- cloud execution
- credentials
- schema changes

Future providers should implement the typed provider adapter contract rather
than rewriting the private-alpha store.
