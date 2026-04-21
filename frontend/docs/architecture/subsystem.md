\# Subsystems



\## Brain



Location:



```

src/lib/codexforge/brain

```



Responsibilities:



\* Provider routing (local / Ollama)

\* Structured response generation

\* Context handling



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



Location:



```

src/app/api/operator/\*

```



Responsibilities:



\* Diff generation

\* Safe file writes

\* Snapshots and checkpoints

\* Restore operations



\---



\## Memory Graph



Location:



```

src/lib/codexforge/brain/graph

```



Stores:



\* messages

\* plans

\* steps

\* runs

\* diffs



Used for:



\* context injection

\* reasoning history

\* future graph UI



