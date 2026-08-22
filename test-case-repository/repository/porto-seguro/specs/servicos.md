# Servicos

## Sources

- Technical documentation: `docs/technical/porto-seguro/modules/servicos/README.md`
- Requirement: `test-case-repository/repository/porto-seguro/requirements/public-site.md`
- Cases:
  - `test-case-repository/repository/porto-seguro/cases/servicos/TC-PORTO-SERV-001.md`
  - `test-case-repository/repository/porto-seguro/cases/servicos/TC-PORTO-SERV-002.md`
  - `test-case-repository/repository/porto-seguro/cases/servicos/TC-PORTO-SERV-003.md`
  - `test-case-repository/repository/porto-seguro/cases/servicos/TC-PORTO-SERV-004.md`

## Preconditions

- The public services page is reachable.
- No purchase flow is completed.

## Scenarios

### TC-PORTO-SERV-001 - Servicos lista categorias e cards sem compra

**Steps:**
1. Open `/servicos`.
2. Verify the services page heading or public service content is visible.
3. Verify service categories are visible.
4. Verify at least one service card is visible.
5. Do not click purchase actions.

**Expected result:** The services page exposes service discovery content.

**Observable elements:**
- Service page heading.
- Categories.
- Service cards.

**Automation guidance:**
- Recommended layer: UI.
- Runner-specific notes: avoid final purchase CTAs.

### TC-PORTO-SERV-002 - FAQ de servicos expande pergunta e mostra resposta

**Steps:**
1. Open `/servicos`.
2. Navigate to FAQ content.
3. Select one FAQ question.
4. Verify the answer text is visible.

**Expected result:** FAQ content is visible after user interaction or already visible by default.

**Observable elements:**
- FAQ heading.
- FAQ question.
- FAQ answer.

**Automation guidance:**
- Recommended layer: UI.
- Runner-specific notes: use role or text locators; handle already-expanded FAQ.

### TC-PORTO-SERV-003 - CEP valido habilita compra e abre selecao de limpeza

```gherkin
Funcionalidade: Habilitacao de compra por CEP em Porto Servico

  Cenario: TC-PORTO-SERV-003 - CEP valido identifica endereco, habilita compra e abre opcoes de limpeza
    Dado que o visitante esta em `/servicos/limpeza-de-ar-condicionado`
    E que o visitante nao esta autenticado
    E o botao `Compre agora` esta desabilitado
    Quando o visitante informa o CEP `01310-100`
    E pressiona Enter no campo CEP
    Entao o endereco do CEP deve ser identificado
    E o botao `Compre agora` deve ficar habilitado
    Quando o visitante seleciona `Compre agora`
    Entao o modal de opcoes de limpeza deve ser exibido
    E o modal deve listar opcoes de quantidade para `limpeza de ar-condicionado`
    E a compra nao deve ser concluida
```

**Expected result:** O CEP valido identifica o endereco, habilita o CTA de compra e o CTA abre o modal de opcoes de limpeza sem concluir a compra.

**Observable elements:**
- CEP input.
- Endereco identificado.
- `Compre agora` button.
- `Selecione a opcao` modal.
- Quantity option buttons.

**Automation guidance:**
- Recommended layer: E2E UI.
- Runner-specific notes: validate the Enter behavior in the CEP field; do not click unrelated `Consultar` buttons or complete purchase.

### TC-PORTO-SERV-004 - Orientacoes de servico individual abrem modal tecnico

```gherkin
Funcionalidade: Orientacoes tecnicas em Porto Servico

  Cenario: TC-PORTO-SERV-004 - Orientacoes de aparelho abrem modal tecnico
    Dado que o visitante esta em `/servicos/limpeza-de-ar-condicionado`
    E que o visitante nao esta autenticado
    Quando o visitante acessa `Orientacoes para este servico`
    E seleciona `Especificacoes do aparelho`
    Entao o modal tecnico deve ser exibido
    E o corpo do modal `.c-modal__body` deve existir
    E o modal deve exibir os requisitos do aparelho
    Quando o visitante fecha o modal
    Entao o modal tecnico deve deixar de ser exibido
```

**Expected result:** O atalho abre e fecha o modal tecnico com os requisitos do aparelho e com o corpo `.c-modal__body` presente.

**Observable elements:**
- `Especificacoes do aparelho` shortcut.
- Modal tecnico.
- `.c-modal__body`.
- Requisitos tecnicos do aparelho.
- `Fechar modal` button.

**Automation guidance:**
- Recommended layer: E2E UI.
- Runner-specific notes: treat the shortcut as `aria-haspopup="dialog"`, not as an accordion.
