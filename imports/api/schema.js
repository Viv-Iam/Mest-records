import { gql } from 'apollo-server-express';

// The GraphQL schema

const typeDefs = gql`
scalar Date
type Query {
    getOneEit(id: String!): Record
    getAllEits: [Record]
}
type Mutation {
    addEit(firstName: String!, lastName:String,gender: String,dob: String): Record
    updateEit(id: String!, firstName: String!, lastName:String,gender: String,dob: String): Record
    deleteEit(id: String!): String
}
type Record {
    _id: String
    firstName: String
    lastName: String
    gender: String
    createdAt: Date
    dob: String
}`

export default typeDefs