# CodexForge Private Alpha Cloud Approval Binding Foundation v0

This slice adds exact provider and model approval binding to private-alpha run
creation and approval persistence without enabling any cloud execution.

## Scope

- Exact provider and model binding is now available through an additive
  `bindingVersion: 1` sub-schema.
- `PRIVATE_ALPHA_RECORD_VERSION` remains `1`.
- Historical unbound records remain readable.
- Omitting `modelKey` keeps the current local Ollama behavior.
- The current UI still creates only the existing local Ollama request.
- No provider selector exists in this slice.
- No new private-alpha API route was added.

## Exact Binding Shapes

### Omitted `modelKey`

- The request follows the current local Ollama path.
- The persisted request shape is unchanged.
- The canonical request serialization and approval-scope serialization remain
  unchanged.

### Explicit local binding

- `providerPreference: ollama-local`
- `modelPreferenceLabel: gpt-oss:20b`
- `modelKey: ollama-local::gpt-oss:20b`
- `dataBoundary: local-machine`
- `cloudDataTransferRequirement: not-required`
- `executionMode: manual-approved-local-provider`

### Explicit Groq 20B binding

- `providerPreference: groq-cloud`
- `modelPreferenceLabel: openai/gpt-oss-20b`
- `modelKey: groq-cloud::openai/gpt-oss-20b`
- `dataBoundary: cloud-provider`
- `cloudDataTransferRequirement:
  explicit-operator-acknowledgement-required`
- `executionMode: manual-approved-cloud-provider-locked`

### Explicit Groq 120B binding

- `providerPreference: groq-cloud`
- `modelPreferenceLabel: openai/gpt-oss-120b`
- `modelKey: groq-cloud::openai/gpt-oss-120b`
- `dataBoundary: cloud-provider`
- `cloudDataTransferRequirement:
  explicit-operator-acknowledgement-required`
- `executionMode: manual-approved-cloud-provider-locked`

Mixed provider, model, boundary, and transfer-requirement combinations are not
accepted.

## Approval Binding

- The exact provider, model, data boundary, and cloud transfer requirement are
  included in the approval scope.
- The approval-scope hash now binds those exact fields for bound requests.
- The cloud transfer acknowledgement is separate from the generic manual
  approval acknowledgement.
- The cloud acknowledgement is persisted against the exact
  `approvalScopeHash`.
- Explicit local bound approvals persist
  `cloudDataTransferAcknowledgement: not-required`.
- Groq bound approvals persist
  `cloudDataTransferAcknowledgement: granted-for-approved-scope`.

## Data Boundary

- Bound Groq requests are marked with the `cloud-provider` data boundary.
- The cloud transfer requirement is part of the persisted request and approval
  scope.
- The request text is still persisted locally.
- The request text is not sent to Groq in this slice.
- No credential is stored.
- No API key is stored.
- No acceptance token is stored.

## Runtime Boundary

- Cloud approval creation performs no credential read.
- Cloud approval creation performs no availability discovery.
- Cloud approval creation performs no generation call.
- Cloud approval creation performs no Groq adapter construction.
- The runtime resolver remains disconnected from the store.
- Groq transport, Groq credential access, provider adapters, kill switch, API
  routes, and UI components remain otherwise unchanged.

## Execution

- Cloud execution remains disabled.
- Executing a Groq-bound approved run is rejected before kill-switch
  inspection, adapter work, availability discovery, generation, execution
  record creation, and execution audit creation.
- The rejection leaves the run approved and unchanged.
- No Groq execution record is created.
- No retry, fallback, streaming, or tools are added.
- Local Ollama execution remains unchanged.

## Next Slice

The next slice is a Jarvis manual provider and model selector plus a visible
cloud approval acknowledgement while cloud execution still remains disabled.
