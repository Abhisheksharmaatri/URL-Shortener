const {
  buildSchema
} = require('graphql');

module.exports = buildSchema(`
  type UserOutputData {
    email: String!
    name: String!
    urls: [UrlOutputData!]!
    verificationStatus: Boolean!
  }

  type UrlOutputData {
    longUrl: String!
    shortUrl: String!
    expirationDate: String!
  }

  type message{
    success:String!
  }

  type LoginResponse {
    token: String
    success: String!
  }

  type RootQuery {
    getLogin(email: String!, password: String!): LoginResponse
    getUser(email: String!): UserOutputData
    getUrl(urlCode: String!): UrlOutputData
  }

  type RootMutation {
    create(email: String!, name: String!, password: String!): message
    createUserUrl(longUrl: String!, email: String!): message
    deleteUser(email: String!): message
    deleteUrl(urlId: String!): message
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);