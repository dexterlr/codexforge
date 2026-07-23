# CodexForge Private Alpha v0

Phase 6153 is the frozen dry-run architecture checkpoint.

This document describes Private Alpha Slice A.

Private Alpha Slice A adds real local file persistence, real manual approval
recording, and real audit recording for the first practical private-alpha
vertical slice.

The runtime remains local only:

- provider execution remains unavailable;
- no provider credential is read;
- no prompt is transmitted externally;
- no provider call or model call is made in this slice.

Local data is stored under `.codexforge/private-alpha`.

Deleting `.codexforge/private-alpha` resets private-alpha runtime data for this
slice.

This slice does not claim production durability, multi-user safety, serverless
persistence, database transactions, or provider execution.

The following slice connects one server-only provider call.
