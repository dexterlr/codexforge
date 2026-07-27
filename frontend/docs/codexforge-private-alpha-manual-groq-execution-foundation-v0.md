## CodexForge Private Alpha manual Groq execution foundation

This slice enables one explicit manual Groq execution attempt for an exactly
bound and approved private-alpha run while preserving the existing local Ollama
path unchanged.

### Exact manual execution sequence

1. The operator manually selects `Groq Cloud`.
2. The operator explicitly selects one exact Groq model:
   `openai/gpt-oss-20b` or `openai/gpt-oss-120b`.
3. The exact request and exact approval scope are persisted locally.
4. Manual approval is recorded for the exact approved scope.
5. Separate cloud-transfer consent is recorded for the exact approved scope.
6. The run reaches `approved`.
7. A separate cloud execution acknowledgement is granted for one action.
8. The store validates the exact persisted approval scope and transfer consent.
9. The global private-alpha kill switch is checked before adapter work.
10. The store resolves only the exact approved model adapter.
11. The adapter identity is verified against the approved scope.
12. Availability is checked once.
13. An `executing` record is persisted before prompt transmission.
14. The kill switch is checked a second time before generation.
15. The exact approved normalized prompt is sent once to the exact Groq model.
16. Visible output, hashes, metrics, and safe audit events are persisted locally.
17. No retry, fallback, substitution, or automatic routing occurs.

### Scope and compatibility

- Supported exact Groq models are `openai/gpt-oss-20b` and
  `openai/gpt-oss-120b`.
- There is no default Groq model.
- Automatic routing remains disabled for Groq.
- Retry and fallback are not introduced.
- The persisted execution-mode string remains
  `manual-approved-cloud-provider-locked` for hash compatibility.
- `PRIVATE_ALPHA_RECORD_VERSION` remains `1`.
- `PRIVATE_ALPHA_APPROVAL_BINDING_VERSION` remains `1`.
- Historical request hashes remain valid.
- Historical approval-scope hashes remain valid.

### Acknowledgements and safety gates

- Cloud-transfer consent is stored separately from generic approval.
- Cloud execution acknowledgement is stored separately from cloud-transfer
  consent.
- The first kill-switch check occurs before adapter construction, credential
  work, or provider discovery.
- Exact adapter identity is verified before availability or generation.
- Availability is checked before prompt transmission.
- The executing record is persisted before prompt transmission.
- The second kill-switch check occurs before generation.
- The exact prompt is sent once.
- One execution attempt is allowed per approved run.

### Persistence and runtime behavior

- Local execution remains unchanged.
- Provider-specific persisted execution records remain version `1`.
- Safe bounded errors are persisted locally.
- Output SHA-256 hashing is persisted for exact visible output.
- Prompt/output token counts and duration metrics are persisted when provided.
- No credential is stored in private-alpha records.
- The Jarvis UI never probes Groq availability in the browser.
- Validation, creation, and approval do not call Groq.
- No provider call occurred during validation for this slice.

### Next step

The next step is live acceptance of the exact 20B and 120B paths, followed by
free-first automatic routing as a separate later policy slice.
