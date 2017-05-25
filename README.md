[![CircleCI branch](https://img.shields.io/circleci/project/github/kieranroneill/prime-table/master.svg?style=flat-square)](https://circleci.com/gh/kieranroneill/prime-table/tree/master) [![Codecov branch](https://img.shields.io/codecov/c/github/kieranroneill/prime-table/master.svg?style=flat-square)](https://codecov.io/gh/kieranroneill/prime-table)

# Prime Table

Displays a multiplication table of prime numbers for a given size. The finding of prime numbers uses a simple segmented sieve of Eratosthenes.

## Usage

* Ensure [Docker](https://www.docker.com/community-edition#/download) is installed and running.
* Build and run the docker image: `docker-compose up`
* Navigate to [http://localhost](http://localhost)

## Development

* Install [Node.js v6.9.5+](https://nodejs.org/en/)
* Install [Yarn](https://yarnpkg.com/lang/en/docs/install)
* Install dependencies `yarn install`
* Start the application `yarn start`
* Navigate to [http://localhost:1337](http://localhost:1337)

## Testing

Testing is composed of:
* [Mocha](https://mochajs.org/) as the test runner.
* [Chai](http://chaijs.com/) for assertions.
* [SinonJS](http://sinonjs.org/) for spys, stubs and mocks.
* [Enzyme](https://github.com/airbnb/enzyme) for testing React components.
* [Istanbul](https://github.com/gotwarlost/istanbul) for code coverage reporting.

Testing is triggered by a single npm script: `yarn test`.

Once the tests have completed, coverage reports can be found in the `coverage/` directory and mocha will also convert the test results into a JUnit style `test-results.xml` at the root level.
