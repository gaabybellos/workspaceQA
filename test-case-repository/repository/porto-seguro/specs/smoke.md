# Smoke

## Sources

- Technical documentation: `docs/technical/porto-seguro/modules/home/README.md`
- Requirement: `test-case-repository/repository/porto-seguro/requirements/public-site.md`
- Cases:
  - `test-case-repository/repository/porto-seguro/cases/smoke/TC-PORTO-SMOKE-001.md`
  - `test-case-repository/repository/porto-seguro/cases/smoke/TC-PORTO-SMOKE-002.md`

## Preconditions

- The public site is reachable.
- No login is used.

## Scenarios

### TC-PORTO-SMOKE-001 - Home carrega com logo, menu principal e conteudo publico

```gherkin
Funcionalidade: Smoke da home publica Porto Seguro

  Cenario: TC-PORTO-SMOKE-001 - Home carrega com logo e conteudo publico
    Dado que o visitante acessa `/`
    Entao o titulo da pagina deve indicar Porto Seguro
    E o logo da Porto deve estar visivel
    E ao menos uma secao publica de produto ou servico deve estar visivel
    E nenhuma area autenticada deve ser acessada
```

**Expected result:** A home carrega como entrada publica sem autenticacao.

**Observable elements:**
- Logo.
- Product or service content.

**Automation guidance:**
- Recommended layer: UI.
- Runner-specific notes: use Playwright web-first assertions.

### TC-PORTO-SMOKE-002 - Header exibe links publicos sem acessar login

```gherkin
Funcionalidade: Header publico Porto Seguro

  Cenario: TC-PORTO-SMOKE-002 - Header exibe links publicos sem acessar login
    Dado que o visitante acessa `/`
    Entao o header deve exibir os links `Seguros`, `Servico`, `Bank` e `Saude`
    E o link `Servico` deve apontar para `/servicos`
    E o link `Bank` deve apontar para `/bank`
    E o link `Saude` deve apontar para `/porto-seguro-saude`
    E o link `Area do Cliente` deve estar visivel
    E o teste nao deve clicar em `Area do Cliente`
```

**Expected result:** O header exibe navegacao publica e nao acessa login.

**Observable elements:**
- Seguros.
- Servico or Servicos.
- Bank.
- Saude.
- Area do Cliente.
- Hrefs publicos esperados.

**Automation guidance:**
- Recommended layer: UI.
- Runner-specific notes: use role `link` for header items; validate hrefs for public routes; do not click authenticated links.
