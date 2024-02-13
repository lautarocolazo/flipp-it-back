# FlippIt

FlippIt is a free flashcards software.

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes.

### Prerequisites

Requirements for the software and other tools to build, test and push

- [Docker engine](https://docs.docker.com/get-docker/)
- [NodeJS](https://nodejs.org/en)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Installing

A step by step series of examples that tell you how to get a development
environment running

Clone the repo

```bash
git clone git@github.com:lautarocolazo/flipp-it-back.git
```

Remember to always be on the root directory of the project

Install project dependencies

```bash
npm i
```

Create the database with docker compose. Make sure you have it installed before

```bash
sudo docker compose up -d
```

Now that we have our datbase running, let's create the schema. This will grab
our models declared in our prisma/schem.prisma file, and create them.

```bash
npx prisma migrate dev
```

Give a name that you consider convenient for the migration.

Now you should be able to start the project

```bash
npm run dev
```

## Running the tests

TODO

### Sample Tests

TODO

### Style test

TODO

## Deployment

TODO

## Built With

TODO

## Versioning

TODO

## Authors

TODO
