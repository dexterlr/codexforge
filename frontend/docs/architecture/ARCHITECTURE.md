\# CodexForge Architecture



\## Overview



CodexForge is composed of four major subsystems:



1\. Brain (reasoning)

2\. Execution Engine

3\. Operator Pipeline

4\. Memory Graph



\---



\## Brain System



Located in:



```

src/lib/codexforge/brain

```



Responsibilities:



\* Route between providers (local / Ollama)

\* Generate structured responses

\* Maintain context awareness



\---



\## Execution Engine



Triggered via:



```

/api/codexforge/run

```



Phases:



\* planning

\* awaiting\_plan\_approval

\* diffing

\* awaiting\_diff\_approval

\* applying

\* testing

\* done / error



\---



\## Operator Pipeline



Located in:



```

src/app/api/operator/\*

```



Handles:



\* diff generation

\* safe file writes

\* snapshots

\* checkpoints

\* restore



\---



\## Memory Graph



Located in:



```

src/lib/codexforge/brain/graph

```



Stores:



\* messages

\* tasks

\* plans

\* steps

\* runs

\* diffs



Used for:



\* context injection

\* reasoning history

\* future graph UI



\---



\## Data Flow



```

User → Chat → Brain → Plan

&#x20;                ↓

&#x20;           Execution Engine

&#x20;                ↓

&#x20;             Operator

&#x20;                ↓

&#x20;           File System

&#x20;                ↓

&#x20;          Graph Memory

```



\---



\## Key Principle



Everything becomes structured data:



\* chat → plan

\* plan → steps

\* steps → execution

\* execution → graph



