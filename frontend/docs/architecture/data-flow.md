\# Data Flow



\## Pipeline



1\. User sends message

2\. Brain generates structured plan

3\. Execution engine processes plan

4\. Operator produces diffs

5\. User approves changes

6\. Files are updated

7\. Results stored in memory graph



\---



\## Key Property



Every step produces structured output:



\* Chat → Plan

\* Plan → Steps

\* Steps → Execution

\* Execution → Graph



\---



\## Safety Model



\* No direct writes

\* All changes go through Operator

\* Dry-run is default

\* User approval required before apply



