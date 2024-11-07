# Tech-Lead

## Descrição do Projeto

O sistema consiste em uma aplicação web onde o usuário pode inserir seu nome na tela inicial e, em seguida, será redirecionado para uma tela com a lista de todos os clientes cadastrados. Nesta tela, é possível cadastrar, selecionar, atualizar e excluir clientes, além de visualizar detalhes dos clientes selecionados.

## Como Rodar a Aplicação

Para executar a aplicação, certifique-se de ter o Docker e o Docker Compose instalados em sua máquina. Em seguida, siga os passos abaixo:

Clone o repositório do projeto para a sua máquina local.

Navegue até o diretório raiz do projeto.

Execute o comando:

```bash
docker compose up
```

Aguarde até que todos os containers sejam iniciados.

Acesse a aplicação no seu navegador através do endereço:

```bash
http://localhost:3000
```

## Respostas às Perguntas sobre o Desenvolvimento do Painel Administrativo

### 1. Quanto tempo levaria?

O desenvolvimento do painel administrativo está estimado em 40 horas para um desenvolvedor sênior. Com a participação de dois desenvolvedores (um sênior e um pleno), esse tempo pode ser reduzido para aproximadamente 30 horas devido à divisão de tarefas e paralelismo.

### 2. Quantos desenvolvedores?

Opção 1: 1 desenvolvedor sênior.
Opção 2: 2 desenvolvedores (1 sênior e 1 pleno).

### 3. Qual a senioridade dos desenvolvedores?

Desenvolvedor Sênior: Responsável por decisões arquiteturais, configurações avançadas e coordenação geral do projeto.
Desenvolvedor Pleno: Auxilia no desenvolvimento das funcionalidades, implementação de testes e melhorias.

#### Detalhamento das Atividades e Estimativa de Horas

- Configuração da AWS (Total: 6 horas)
- Configuração do AWS SQS para filas: 2 horas
- Configuração do AWS CloudWatch para monitoramento: 2 horas
- Configuração de ambientes (Dev, Homologação, Produção): 2 horas
- Desenvolvimento Back-End (Total: 15 horas)
- Setup do projeto Nest.js com TypeORM e PostgreSQL: 2 horas
- Implementação das rotas de listagem e exclusão lógica de clientes: 3 horas
- Integração com AWS SQS para criação e atualização de clientes: 3 horas
- Documentação da API com Swagger: 2 horas
- Implementação de testes unitários: 3 horas
- Adição de observabilidade (logs, métricas, tracing): 2 horas
- Desenvolvimento Front-End (Total: 9 horas)
- Setup do projeto React com Vite: 1 hora
- Criação da tela inicial e fluxo de autenticação: 2 horas
- Implementação das funcionalidades de CRUD de clientes: 4 horas
- Implementação de testes end-to-end: 2 horas
- Melhorias e Implementações Adicionais (Total: 8 horas)
- Implementação de autenticação com Keycloak: 3 horas
- Implementação de múltiplas filas para escalabilidade: 2 horas
- Integração com SonarQube para análise de qualidade de código: 1 hora
- Otimizações de performance e segurança: 2 horas
- DevOps e Deploy (Total: 5 horas)
- Criação de Dockerfiles e docker-compose.yml: 2 horas
- Configuração de pipelines de CI/CD: 2 horas
- Deploy das aplicações na AWS: 1 hora
- Documentação e Demonstração (Total: 3 horas)
- Elaboração do README detalhado: 1 hora
- Revisão geral e refinamento: 1 hora
- Tempo Total Estimado: 46 horas

#### Com dois desenvolvedores (1 sênior e 1 pleno), o tempo pode ser otimizado para aproximadamente 30 horas.

## Tecnologias Utilizadas

#### Front-End:

- React
- Vite
- TypeScript

#### Back-End:

- Nest.js
- TypeORM
- PostgreSQL
- Swagger (NI)
- AWS SQS
- AWS CloudWatch (NI)

#### Autenticação e Segurança:

- Keycloak(NI)

#### Qualidade de Código:

- SonarQube(NI)

#### Testes:

- Jest (unitários)
- Cypress ou Playwright (end-to-end) (NI)

#### DevOps:

- Docker
- Docker Compose
- AWS (EC2, ECS ou EKS)(NI)

### Melhorias Futuras

Implementação de mais filas para processamentos específicos.
Aprimoramento do monitoramento com dashboards customizados no CloudWatch.
Escalonamento automático de recursos com base na demanda.
Integração contínua com pipelines mais robustos (ex: GitHub Actions, Jenkins).
Otimizações de performance no banco de dados e nas consultas.

#

\*NI (Nao implementado)
