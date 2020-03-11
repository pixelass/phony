# Phony

<p align="center"><img src="https://raw.githubusercontent.com/pixelass/phony/master/resources/logo.png" alt="phony logo" width="300"/></p>
Phony is a collection of phony (mock) services.  
Its main purpose is to provide a mocked graphql service

## [Documentation][docs] | [Playground][playground]

[![MIT license][license-badge]][license]
[![Build status][build-badge]][build]
[![Codecov status][codecov-badge]][codecov]

This is the contributor documentation for the `phony` mono-repository.
For user docs see the [Introduction][introduction]

| version                                          | description                      |
| :----------------------------------------------- | :------------------------------- |
| [![phony graphql][graphql-badge]][phony-graphql] | A mocking graphql service        |
| [![phony cli][cli-badge]][phony-cli]             | Command Line Interface for phony |


### Build packages

```bash
yarn build
```

### Watch packages

```bash
yarn watch
```

### Develop docs

```bash
yarn develop
```

### Run examples

We provide some simple to complex examples to give you a better idea on how you
can use or integrate Phony in your project.

```bash
yarn examples:apollo
yarn examples:graphql
yarn examples:cli
```

[docs]: https://pixelass.github.io/phony/
[introduction]: https://pixelass.github.io/phony/introduction
[playground]: https://8gdw8.sse.codesandbox.io/

[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge
[license]: https://raw.githubusercontent.com/pixelass/phony/master/LICENSE
[build-badge]: https://img.shields.io/travis/pixelass/phony/master.svg?style=for-the-badge&logo=travis&logoColor=white
[build]: https://travis-ci.org/pixelass/phony
[codecov-badge]: https://img.shields.io/codecov/c/github/pixelass/phony.svg?style=for-the-badge&logo=codecov&logoColor=white
[codecov]: https://codecov.io/gh/pixelass/phony
[utils-badge]: https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fpixelass%2Fphony%2Fmaster%2Fpackages%2Futils%2Fpackage.json&query=version&prefix=@phony/utils@&style=for-the-badge&label=yarn&colorB=2c8ebb
[phony-utils]: https://www.yarnpkg.com/package/@phony/utils
[server-badge]: https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fpixelass%2Fphony%2Fmaster%2Fpackages%2Fserver%2Fpackage.json&query=version&prefix=@phony/server@&style=for-the-badge&label=yarn&colorB=2c8ebb
[phony-server]: https://www.yarnpkg.com/package/@phony/server
[graphql-badge]: https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fpixelass%2Fphony%2Fmaster%2Fpackages%2Fgraphql%2Fpackage.json&query=version&prefix=@phony/graphql@&style=for-the-badge&label=yarn&colorB=2c8ebb
[phony-graphql]: https://www.yarnpkg.com/package/@phony/graphql
[cli-badge]: https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fpixelass%2Fphony%2Fmaster%2Fpackages%2Fcli%2Fpackage.json&query=version&prefix=@phony/cli@&style=for-the-badge&label=yarn&colorB=2c8ebb
[phony-cli]: https://www.yarnpkg.com/package/@phony/cli
