# Porto Seguro - Entities

## Public Content Entities

| Entity | Fields | Evidence |
|---|---|---|
| Navigation item | label, target | [FACT] Home and services pages expose public navigation labels. |
| Coupon | code, copy action, campaign context | [FACT] Home exposes `TORCIDA50`; services exposes `GANHEI20`. |
| Product card | title, description, CTA | [FACT] Home exposes cards such as Seguro Viagem and Seguro Auto. |
| Service card | category, name, price text, CTA | [FACT] `/servicos` exposes service cards. |
| FAQ item | question, answer | [FACT] `/servicos` exposes FAQ content. |

## Out-Of-Scope Entities

| Entity | Reason |
|---|---|
| Customer account | Requires login. |
| Policy | Requires authenticated customer data. |
| Payment | Real transaction risk. |
| Scheduling confirmation | Real service request risk. |
| Vehicle plate quote | Sensitive data and external lookup risk. |
