\# Architecture Overview



CodexForge is composed of four core subsystems:



1\. Brain (reasoning)

2\. Execution Engine

3\. Operator Pipeline

4\. Memory Graph



\---



\## Design Philosophy



\* Everything becomes structured data

\* No hidden actions

\* All writes are reversible

\* AI is optional



\---



\## High-Level Flow



User → Chat → Brain → Plan

↓

Execution Engine

↓

Operator

↓

File System

↓

Memory Graph



\---



\## Key Constraint



The system must always:



\* Build (`npm run build`)

\* Run (`npm run dev`)

\* Operate safely with explicit approval steps



