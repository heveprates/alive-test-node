# Projeto da API

Este projeto contém a API de backend para a aplicação. Ele é construído usando o [Node.js](https://nodejs.org/) e o framework [NestJS](https://nestjs.com/).

## Começando

Para começar com o projeto, siga estas etapas:

1. Clone o repositório
2. Navegue até a pasta `api`
3. Instale as dependências usando `npm install`
4. Inicie o servidor usando `npm start:dev`
5. (Opcional) Execute os testes usando `npm run test`

## Entrypoints da API

Os seguintes entrypoints estão disponíveis:

- `GET /stock/:stockName/quote`:
  - Retorna a cotação atual da ação especificada.
  - Parâmetros:
    - `stockName` (route param): nome da ação
- `GET /stocks/:stockName/history`:
  - Retorna o histórico de preços da ação especificada em um intervalo de datas.
  - Parâmetros:
    - `stockName` (route param): nome da ação
    - `from` (search param): data de início do intervalo (formato ISO 8601).
    - `to` (search param): data de fim do intervalo (formato ISO 8601).
- `GET /stocks/:stockName/gains`:

  - Retorna o lucro ou prejuízo obtido ao comprar uma quantidade de ações da ação especificada em uma data específica e vendê-las na cotação atual.
  - Parâmetros:

    - `stockName` (route param): nome da ação
    - `purchasedAt` (search param): data da compra das ações (formato ISO 8601).

    - `purchasedAmount` (search param): quantidade de ações compradas.

- `GET /stocks/:stockName/compare`:
  - Retorna a comparação entre a ação especificada e outras ações.
  - Parâmetros:
    - `stockName` (route param): nome da ação
    - `stocksToCompare[]` (search param): array com os nomes das ações a serem comparadas.

## Módulos

Os seguintes módulos foram criados:

- AlphaVantageApi: Módulo que faz a integracao com a API da AlphaVantage
- StockingApi: Módulo que tem o controller disponivel nesse projeto

### Módulos AlphaVantageApi

Este módulo chamado `AlphaVantageApiModule`, é responsável por fornecer serviços relacionados à API Alpha Vantage. O módulo é responsável por buscar seus dados e convertê-los em dados utilizáveis para a aplicação.

O módulo importa o módulo `HttpModule` sendo um módulo embutido no NestJS usado para realizar solicitações HTTP.

O módulo `AlphaVantageApiModule` fornece diversos provedores, incluindo `FetchApiService`, `DataParseService` e um provedor de fábrica para a chave da API.
A chave da API é fornecida como um valor de string usando o `ConfigService`, que é injetado no provedor de fábrica. O `ConfigService` é um serviço embutido no NestJS usado para gerenciar valores de configuração.

Além disso, o módulo exporta o provedor `FetchApiService`, o que significa que outros módulos podem importá-lo e usá-lo. Isso é útil para fazer solicitações à API Alpha Vantage a partir de outras partes da aplicação.

A classe `FetchApiService` importa diversos módulos e serviços, incluindo `axios-cache-interceptor`, `DataParseService` e DTOs (Objetos de Transferência de Dados) para as respostas da API. Além disso, ela importa uma classe de erro personalizada chamada `NoDataFoundError`, utilizada para lidar com situações em que a API não retorna dados. Dentro desse service, existe uma constante chamada `ONE_HOUR`, que representa o valor de 1 hora em milissegundos. Essa constante é usada para definir o tempo de cache para as solicitações à API.

### Módulos StockingApi

Este módulo chamado `StockingApiModule` é responsável por fornecer serviços relacionados à API de Quote.

O módulo importa dois outros módulos, incluindo `AlphaVantageApiModule` e `HttpModule`. O `AlphaVantageApiModule` é um módulo personalizado que fornece serviços relacionados à API Alpha Vantage, enquanto o `HttpModule` é um módulo embutido no NestJS usado para fazer solicitações HTTP.

O módulo `StockingApiModule` fornece dois provedores, incluindo `StockingApiService` e `StockingApiController`. O provedor `StockingApiService` é responsável por buscar dados atraves do módulo `AlphaVantageApiModule`, enquanto o provedor `StockingApiController` é responsável por lidar com solicitações HTTP para a API.

Por fim, o módulo `StockingApiModule` exporta o provedor `StockingApiService`, o que significa que outros módulos podem importar e usar este serviço.
