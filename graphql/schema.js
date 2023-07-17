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

  type LoginResponse {
    token: String
    success: String!
  }

  type SignupResponse {
    success: String!
  }

  type DeleteUserResponse {
    success: String!
  }

  type DeleteUrlResponse {
    success: String!
  }

  type RootQuery {
    getLogin(email: String!, password: String!): LoginResponse
    getUser(email: String!): UserOutputData
    getUrl(urlCode: String!): UrlOutputData
  }

  type RootMutation {
    create(email: String!, name: String!, password: String!): SignupResponse
    createUserUrl(longUrl: String!, userId: String!): UrlOutputData
    deleteUser(email: String!): DeleteUserResponse
    deleteUrl(urlId: String!): DeleteUrlResponse
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);