# Porto Seguro

Portal de seguros pessoais e empresariais. Permite cotação online, contratação e gerenciamento de seguros de auto, viagem e vida. Oferece agendamento de serviços residenciais e automotivos via Porto Serviço.

## What It Does

Plataforma digital de vendas de seguros. O usuário pode cotar e contratar seguros de automóvel, viagem, vida e residência diretamente pelo site. Também é possível agendar serviços como limpeza, instalações e assistência automotiva.

## User Roles And Permissions

| Role | Can Do | Cannot Do |
|---|---|---|
| Visitante | Cotar seguros, ver planos, agendar serviços, usar cupom de desconto | Gerenciar apólice sem login |
| Cliente autenticado | Gerenciar apólices, acessar histórico, acionar sinistro | To verify |

## Key User Flows

1. Cotação de Seguro Auto: placa do veículo → dados → escolha de plano → pagamento
2. Cotação de Seguro Viagem: destino + datas + passageiros → planos → dados pessoais
3. Agendamento de Serviço: escolha do serviço → data/horário → endereço → confirmação
4. Cupom de desconto: modal exibe cupom → botão COPIAR CUPOM → cupom aplicado na cotação

## Routes And Access Requirements

| Route | Access | Role | Descrição |
|---|---|---|---|
| /seguro | Público | Visitante | Hub de produtos de seguro |
| /seguro-viagem | Público | Visitante | Landing de Seguro Viagem |
| /loja/seguro-viagem | Público | Visitante | Wizard de cotação (3 passos) |
| /seguro-auto | Público | Visitante | Landing de Seguro Auto |
| /loja/seguro-auto/placa-do-veiculo | Público | Visitante | Início da cotação de auto |
| /servicos | Público | Visitante | Listagem de serviços |
| /porto-servico | Público | Visitante | Agendamento de serviços |
| /cliente (externo) | Autenticado | Cliente | Área do cliente |

## Key Entities

| Entity | Key Fields | Relationships |
|---|---|---|
| Cotação Viagem | destino, dataIda, dataVolta, passageiros, plano | Gera proposta de seguro |
| Cupom | código, desconto%, validade | Aplicado em cotações |
| Agendamento | serviço, data, horário, endereço, CEP | Vinculado a endereço |
| Plano de Seguro | nome, coberturas, valor/dia, parcelamento | Exibido na listagem de planos |

## Tech Stack

- Frontend: SPA (Single Page Application), client-side rendering com JavaScript
- API REST para cotações, CEP e agendamentos
- CDN para assets estáticos
- Modal de cupom com clipboard API

## Module Dependency Graph

```
Home (/seguro)
  ├── Seguro Viagem (/seguro-viagem → /loja/seguro-viagem)
  │     ├── Cupom Modal (TORCIDA50)
  │     └── Wizard: Passo 1 → Passo 2 (Planos) → Passo 3 (Dados)
  ├── Seguro Auto (/seguro-auto → /loja/seguro-auto/placa-do-veiculo)
  └── Serviços (/servicos → /porto-servico)
        └── Agendamento: Serviço → Data/Hora → Endereço → Confirmação
```

## Test Data Requirements

- CPF válido gerado com algoritmo oficial (sem CPF real)
- CEP público: 01310-100 (Av. Paulista, SP)
- Datas futuras geradas dinamicamente (nunca hardcoded)
- Cupom: capturado do modal via clipboard, validado contra .env

## Known Complexity

- Datepicker com validação de data passada — exige mock de Date via addInitScript
- Botão de confirmação habilita progressivamente conforme campos são preenchidos
- API de CEP integrada no formulário de agendamento — waitForResponse necessário
- Modal de cupom abre automaticamente no carregamento — deve ser fechado no fixture antes de cada teste
- Site é client-rendered (SPA) — não usar web_fetch diretamente, usar browser
