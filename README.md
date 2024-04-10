<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Schedule Tasks: Project notes

  1. NestJS has beend used as it has well set patterns for modular code and dependencies.
  2. No Pagination provided for collection, ideally should have pagination.
  3. Covered happy path scenarios only, not covered specific failure scenarios which would default to 500 response.
  4. Error handling in specific scenarios for eg. record not available while update.
  5. Intergation test files end with `.i-spec.ts`.

## Pending or to improve (Due to time constraints)

  1. Integration test for Task table (would be similar pattern as for Schedule), only Schedule table is done to demonstrate.
  2. Better http response payload for validations instead of throwing Zod error responses.
  
## Swagger Docs

Upon running the app (instructions below), API documentation can be found at http://localhost/api

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Pre-requisites

  1. Dotenv cli
  2. Docker
  3. Node version 18 or above

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# integration tests
# dotenv needed for using env.test for integration tests
$ npm install -g dotenv-cli
$ npm run test:integration

# destroy docker test db container after running integration tests
$ npm run docker:down

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
