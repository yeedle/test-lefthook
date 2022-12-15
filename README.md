# foobar

## Description

foobar

## Setup

- add the contents of `NestJS Service local .env file` (found in 1Password) into the `.env` file (you can run `yarn run generate:env`).
- add the contents of `Gitleaks Github Action License Key` (found in 1Password) to the `Environment secrets` in the `Actions secrets` section of your repo's settings. Use the name `GITLEAKS_LICENSE`.

## Installation

```bash
$ yarn
```

## Db setup

```bash
NODE_PATH=. yarn mikro-orm database:create
NODE_PATH=. yarn mikro-orm migration:fresh
NODE_PATH=. yarn mikro-orm seeder:run
```

## Running the app to accept HTTP requests

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# debug mode
$ yarn start:debug

# production mode
$ yarn start:prod

# repl mode
$ DEBUG=1 yarn start:repl
```

## Running the app to handle/send Kafka events

(For this to work you'll need to have an instance of Kafka running. You can find out how to get that setup at https://github.com/trialspark/local-services)

```bash
# development
$ yarn start:konsumer

# watch mode
$ yarn start:konsumer:watch

# debug mode
$ yarn start:konsumer:debug

# production mode
$ yarn start:konsumer:prod
```

## Graphiql Interface

After starting the app, GQL queries and mutations can be run at http://localhost:3000/graphiql

## Running Apps through Graphql Gateway

To run the app behind the federated graphql gateway, clone the gateway then follow instructions in gateway to configure it to connect to the app:
https://github.com/trialspark/graphql-gateway

Make sure your app is running on a unique port when running multiple apps

## Build

```bash
$ yarn run build
$ yarn run lint
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Format

```bash
# check if code is formatted correctly
yarn run format:check

# automatically fix code formatting
yarn run format:fix
```

## Types

```bash
# Generate types manually from the schema
$ yarn run generate:graphql-types
```

## Config Setup

There's a global `AppConfigModule` which you can use like any nest global module by adding `configService: AppConfigService` to your constructors. To add a value to the config service, add it app.config.ts and create a getter in src/config/config.service.ts

## Database setup & migrations

## Building and running docker image

```bash
$ docker build --ssh default -f containers/Dockerfile -t nest .
$ docker run -e "POSTGRESQL_URL=postgres://$USER@host.docker.internal:5432/nest" --rm -it  --name nest -p 3000:3000 nest
```

or using sparkctl

```bash
$ sparkctl update
$ sparkctl docker build
$ $ docker run -e "POSTGRESQL_URL=postgres://$USER@host.docker.internal:5432/nest" --rm -it  --name nest -p 3000:3000 nest
```
