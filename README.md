<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Schedule Tasks: Project notes

  1. NestJS has been used due to well tried and tested patterns for modular code and dependencies.
  2. `ts-rest` with Zod is being used for api contract first approach and also used as Controller decorator for validations with Zod.
  3. Integration test files end with `.i-spec.ts`.
  4. Thunder collection `thunder-collection_local.json` has been provided in the root project to test api endpoints.

## Pending or to improve (Due to time constraints)

  1. Integration test for Task table (would be similar pattern as for Schedule), only Schedule table is done to demonstrate integration test.
  2. Better http response payload for validations instead of throwing raw Zod error responses.
  3. No Pagination provided for GET collection, ideally should have pagination.
  
## Swagger Docs

Upon running the app (instructions as below), API documentation is available at http://localhost/api


## Pre-requisites

  1. Dotenv cli
  2. Docker
  3. Node version 18 or above

## Installation

```bash
$ npm install
```

## Running the app
Run docker and prisma db migration first.

```bash
# spins up test and development db containers
$ docker compose up

# Local db development migration with Prisma.
# Before migration please rename .env.sample to .env that has local credentials already set via the Docker containers.
$ npx prisma migrate deploy

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
# dotenv needed for using env.test for running integration tests
$ npm install -g dotenv-cli
$ npm run test:i

# destroy docker test and db containers
$ npm run docker:down

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
