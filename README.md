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


## example scheme

Her#Es an example of what is generated for Post.

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

## Graphiql

Graphiql is enabled. The following query will return this output

http://localhost:3001/?query=%7B%0A%20%20getPost(id%3A%20%221%22)%20%7B%0A%20%20%20%20title%0A%20%20%20%20view_count%0A%20%20%20%20created%0A%20%20%20%20updated%0A%20%20%20%20User%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20Comments%20%7B%0A%20%20%20%20%20%20body%0A%20%20%20%20%20%20created%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20_getPostsMeta%20%7B%0A%20%20%20%20count%0A%20%20%7D%0A%7D%0A

### data
```js
module.exports = {
  posts: [
    {
      id: 1,
      title: "Lorem Ipsum",
      view_count: 254,
      user_id: 123,
      created: new Date("2016-07-03"),
      updated: new Date("2016-07-06")
    },
    {
      id: 2,
      title: "Sic Dolor amet",
      view_count: 65,
      user_id: 456,
      created: new Date("2016-07-03")
    }
  ],
  users: [
    {
      id: 123,
      name: "John Doe",
      email: "john@doe.com",
      company: "Doe Inc.",
      bio: "Germanus, regius valebats etiam contactus de magnum, raptus burgus."
    },
    {
      id: 456,
      name: "Jane Doe",
      email: "jane@doe.com",
      company: "Doe Inc.",
      bio: "Apolloniatess cantare! Clabulare nobilis gemna est."
    }
  ],
  comments: [
    {
      id: 987,
      post_id: 1,
      body: "Consectetur adipiscing elit",
      created: new Date("2017-07-03")
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

### query
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

## data
```json
{
  "data": {
    "getPost": {
      "title": "Lorem Ipsum",
      "view_count": 254,
      "created": "2016-07-03T00:00:00.000Z",
      "updated": "2016-07-06T00:00:00.000Z",
      "User": {
        "name": "John Doe"
      },
      "Comments": [
        {
          "body": "Consectetur adipiscing elit",
          "created": "2017-07-03T00:00:00.000Z"
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
