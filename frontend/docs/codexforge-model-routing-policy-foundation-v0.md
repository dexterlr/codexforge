# CodexForge Model Routing Policy Foundation v0

## Purpose

This slice creates a live, authoritative model-catalog and routing-policy
foundation for future Athena provider selection without changing current
execution.

The live router is separate from the legacy preview registries because the
historical directories are preview-only, smoke-preserved, and intentionally not
connected to production routing:

- `src/lib/codexforge/ai-provider-registry/`
- `src/lib/codexforge/athena-model-routing-provider-selection-preview/`

The new live domain is isolated at:

- `src/lib/codexforge/model-routing/`

The live domain does not import preview-only registry or preview-only routing
types.

## Authoritative Production Catalog

Catalog version:

- `codexforge-model-routing-v1`

Authoritative production provider catalog in this slice:

- one enabled provider: `ollama-local`
- label: `Local Ollama`
- locality: `local`
- data boundary: `local-machine`
- adapter id: `private-alpha-ollama-adapter`

Authoritative production model catalog in this slice:

- one model: `ollama-local::gpt-oss:20b`
- routing state: `automatic`
- qualification state: `live-verified`
- capability metadata: `text-generation`
- approved maximum output: `4096`
- cost class: `local-no-provider-token-charge`
- token pricing: `USD 0 / 0`

No real cloud provider or cloud model is enabled in the production catalog in
this slice.

## Qualification And Enablement

The qualification lifecycle is intentionally explicit:

- `discovered`
- `metadata-ready`
- `deterministic-tested`
- `live-verified`
- `disabled`
- `deprecated`

Discovered does not mean qualified. Qualified does not mean enabled. Enabled
does not mean automatically routable unless the provider, model, runtime
availability, quota, privacy, pricing, and routing-state gates all pass.

Provider-discovered models are not automatically routable. Model claims require
qualification evidence.

## Capability Metadata And Cost Classes

Capability metadata is explicit model metadata, not inferred from provider names
or model names.

Supported cost classes in the routing foundation:

- `local-no-provider-token-charge`
- `free-tier`
- `paid`
- `unknown`

Important policy statements:

- free does not automatically mean private
- local privacy can outrank free cloud availability
- unknown price is never treated as free
- expensive does not automatically mean better
- paid use requires explicit approval and a budget

Pricing freshness is modeled with `pricingAsOf`. Unknown-price safety is hard
gated: unknown pricing is never automatically eligible.

## Runtime Snapshots, Privacy, And Routing Modes

Runtime routing inputs are deterministic snapshots:

- availability: `available`, `unavailable`, `unknown`
- quota: `not-applicable`, `available`, `exhausted`, `unknown`

The router consumes those snapshots but does not fetch them, infer them from
time, or call a provider.

Privacy is a hard gate:

- `local-required` rejects every cloud model
- `cloud-allowed` permits cloud candidates if every other gate passes

Supported routing modes:

- `local-only`
- `free-only`
- `free-first`
- `best-within-budget`
- `manual`

Manual mode requires exact model selection and never substitutes another model.

## Deterministic Routing Policy

Hard gates cover:

- provider enablement
- model routing enablement
- qualification state
- runtime availability
- capability coverage
- approved output ceilings
- privacy restrictions
- cost-class restrictions
- free-tier quota
- paid-budget limits
- explicit paid approval

The router is deterministic and pure:

- no provider call in this slice
- no current execution integration
- no silent paid fallback
- no multi-model delegation yet
- no child-run delegation yet

Ranking inside an eligible tier is deterministic:

1. task-profile score
2. qualification rank: `live-verified` before `deterministic-tested`
3. lower known estimated paid cost
4. local before cloud
5. lexical `modelKey`

Explainable decisions include:

- stable decision status
- stable reason codes
- stable rejection codes
- concise explanation text
- explicit paid-approval requirement when relevant

Paid selection never occurs silently. If a paid model is otherwise the best
choice and approval is not granted, the router returns
`paid-approval-required`.

## Current Slice Boundaries

This slice does not:

- add a second executable provider
- add a cloud model to the production catalog
- call Ollama
- call a cloud provider
- call an API route
- change run creation
- change approval scope
- change execution
- change persistence
- integrate the router into current private-alpha execution

Current execution remains fixed to:

- `ollama-local`
- `gpt-oss:20b`

## Future Work

Future slices can extend this foundation with:

- provider discovery after adapter, privacy, quota, and smoke coverage exist
- future benchmark evidence
- future actual-cost ledger
- future child-run delegation
- future routing-decision integration into approved run creation
