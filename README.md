<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-url]: https://circleci.com/gh/nestjs/nest

## Schedule Tasks: Project notes

  1. No Pagination provided for collection, ideally should have pagination.
  2. Covered happy path scenarios only, not covered specific failure scenarios which would default to 500 response.
  3. Error handling in specific scenarios for eg. record not available while update.

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

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
