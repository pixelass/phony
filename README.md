# phony

<p align="center"><img src="https://raw.githubusercontent.com/pixelass/phony/master/resources/logo.png" alt="phony logo" width="200"/></p>
<big>Phony is a collection of phony (mock) services.  
Its main purpose is to provide a mocked graphql service</big>  
<br/><br/>

<!-- toc -->

- [Install](#install)
  * [yarn](#yarn)
  * [npm](#npm)
- [Usage](#usage)
  * [cli](#cli)
  * [node.js](#nodejs)
- [Features](#features)
- [Examples](#examples)
- [Example schema](#example-schema)
- [Example Mutation](#example-mutation)
  * [Mutation](#mutation)
  * [Mutation variables](#mutation-variables)
  * [Mutation data](#mutation-data)
- [Example Query](#example-query)
  * [Query](#query)
  * [Query data](#query-data)
- [Example data](#example-data)

<!-- tocstop -->

## Install

Phony is a mono-repository and is available on npm under the `@phony` namespace

> Warning. This project has not been published yet so an install will not work  
> This is still a prototype. You can clone/fork this repository to test it locally

### yarn

```bash
yarn add @phony/cli @phony/graphlql
```

### npm

```bash
npm install  @phony/cli @phony/graphlql
```

## Usage

Phony can be used via the cli or in node.js

### cli

```bash
## run server with initialized database
phonyql --init
## run server with flushed database
phonyql --flush
## flush database only
phonyql --flush --no-serve
## export schema to custom file from custom db
phonyql my-database.js --schema my-schema.grahphl --export
```

```
Options
  --export, -e    schema will be exported when true
  --schema, -s    schema will be exported to this path
  --database, -d  database will be generated or read from to this path
  --no-serve, -n  don't serve
  --flush, -f     resets the local database (removes all additions, updates and deletions)
  --init, -i      initializes the local database (only if it doesn't exist, does not flush)
  --port, -p      port for graphql service
```

### node.js

```js
const serve = require("@phony/graphql");
const flush = require("@phony/graphql/flush");
const path = require("path");
const db = require("./db");

(async function() {
  const filePath = path.resolve(__dirname, "db.json");
  await flush(db, filePath);
  await serve(db, filePath);
})();
```

## Features

- build a graphql service from JSON
- build a local database from JSON
- allow flushing the local database (reset)
- export the generated typeDefs in a `schema.graphql` file
- persistent local database (persists until flushed)
- automatic queries and mutations (i.e. `[name]` = `User`)
  - `get[name]s(pagination: Pagination)`: returns all items with optional pagination and sorting
  - `get[name](id: ID!)`: returns item with matching id
  - `_get[name]Meta`: get meta info (`{count: Int!}`)
  - `create[name](input: [name]Input)`: add new item from given input
  - `update[name](input: [name]Input)`: update item with given input
  - `delete[name](id: ID!)`: deleteItem

inspired by https://github.com/marmelab/json-graphql-server/

## Examples

Please take a look at the Examples.

* [cli](https://github.com/pixelass/phony/tree/master/examples/cli)
* [node.js](https://github.com/pixelass/phony/tree/master/examples/graphql)

## Example schema

Here is an example of what is generated for Post.

```graphql
type Query {
  getPosts: [Post]
  getPost(id: ID!): Post
  _getPostsMeta: MetaData
}

type Mutation {
  createPost(input: PostInput): Post
  updatePost(input: PostUpdateInput): Post
  deletePost(id: ID!): Boolean
}

type MetaData {
  count: Int!
}

type Post {
  id: ID!
  title: String!
  view_count: Int!
  user_id: ID!
  created: String!
  updated: String!
  User: User!
  Comments: [Comment]!
}

input PostInput {
  title: String!
  user_id: ID!
}

input PostUpdateInput {
  id: ID!
  title: String
}
```

## Example Mutation

http://localhost:1337/?query=mutation%20example(%24input%3A%20UserUpdateInput!)%7B%0A%20%20updateUser(input%3A%20%24input)%20%7B%0A%20%20%20%20company%0A%20%20%09name%0A%20%20%7D%0A%7D&operationName=example&variables=%7B%0A%20%20%22input%22%3A%20%7B%0A%20%20%20%20%22id%22%3A%20123%2C%0A%20%20%20%20%22company%22%3A%20%22Doe%20Corp.%22%0A%20%20%7D%0A%7D

### Mutation

```graphql
mutation example($input: UserUpdateInput!) {
  updateUser(input: $input) {
    company
    name
  }
}
```

### Mutation variables

```json
{
  "input": {
    "id": 123,
    "company": "Doe Corp."
  }
}
```

### Mutation data

```json
{
  "data": {
    "updateUser": {
      "company": "Doe Corp.",
      "name": "John Doe"
    }
  }
}
```

## Example Query

http://localhost:1337/?query=%7B%0A%20%20getPost(id%3A%20%221%22)%20%7B%0A%20%20%20%20title%0A%20%20%20%20view_count%0A%20%20%20%20created%0A%20%20%20%20updated%0A%20%20%20%20User%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20Comments%20%7B%0A%20%20%20%20%20%20body%0A%20%20%20%20%20%20created%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20_getPostsMeta%20%7B%0A%20%20%20%20count%0A%20%20%7D%0A%7D%0A

### Query

```graphql
{
  getPost(id: "1") {
    title
    view_count
    created
    updated
    User {
      name
    }
    Comments {
      body
      created
    }
  }
  _getPostsMeta {
    count
  }
}
```

### Query data

```json
{
  "data": {
    "getPost": {
      "title": "Lorem Ipsum",
      "view_count": 254,
      "created": "2015-02-01T00:00:00.000Z",
      "updated": "2016-07-06T00:00:00.000Z",
      "User": {
        "name": "John Doe"
      },
      "Comments": [
        {
          "body": "Consectetur adipiscing elit",
          "created": "2017-02-19T00:00:00.000Z"
        },
        {
          "body": "Nam molestie pellentesque dui",
          "created": "2017-08-17T00:00:00.000Z"
        }
      ]
    },
    "_getPostsMeta": {
      "count": 2
    }
  }
}
```

## Example data

```js
module.exports = {
  posts: [
    {
      id: 1,
      title: "Lorem Ipsum",
      view_count: 254,
      user_id: 123,
      created: new Date("2015-02-01"),
      updated: new Date("2016-07-06")
    },
    {
      id: 2,
      title: "Sic Dolor amet",
      view_count: 65,
      user_id: 456,
      created: new Date("2015-09-13")
    }
  ],
  users: [
    {
      id: 123,
      name: "John Doe",
      email: "john@doe.com",
      company: "Doe Inc.",
      bio: "Germanus, regius valebats etiam contactus de magnum, raptus burgus.",
      created: new Date("2016-11-21"),
      updated: new Date("2017-01-03")
    },
    {
      id: 456,
      name: "Jane Doe",
      email: "jane@doe.com",
      company: "Doe Inc.",
      bio: "Apolloniatess cantare! Clabulare nobilis gemna est.",
      created: new Date("2016-10-12")
    }
  ],
  comments: [
    {
      id: 987,
      post_id: 1,
      body: "Consectetur adipiscing elit",
      created: new Date("2017-02-19"),
      updated: new Date("2017-02-09")
    },
    {
      id: 995,
      post_id: 1,
      body: "Nam molestie pellentesque dui",
      created: new Date("2017-08-17")
    }
  ]
};
```
