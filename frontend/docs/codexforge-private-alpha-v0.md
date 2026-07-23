# CodexForge Private Alpha v0

Phase 6153 remains the frozen dry-run architecture checkpoint for the original
foundation slice.

Private Alpha Slice A is still the compatibility base for legacy persisted
records that were created before provider execution existed.

Private Alpha Slice B adds the first real local-only provider execution slice:

- operator creates a run;
- operator records exact manual approval;
- operator explicitly executes once;
- the Node.js server calls local Ollama on `http://127.0.0.1:11434`;
- output, execution metadata, and append-only audit events are persisted locally.

See `docs/codexforge-private-alpha-local-ollama-execution-v0.md` for the real
execution architecture, fixed loopback provider boundary, idempotency model,
kill-switch behavior, and private-alpha limitations.
