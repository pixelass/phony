# phony
a collection of phony (mock) services

This project is currently a prototype/idea.

We often need some sort of mock service which can be tedious to set up.

I needed a mocked graphql service and decided to put this into a project that I can use over and over again.

The current prototype offers a basic express server and a graphql service with graphiql enabled.

It should offer various features

* database from JSON
* flush database (reset)
* mutations
* automatic queries with pagination, filters and whatnots

inspired by https://github.com/marmelab/json-graphql-server/
