import { GraphQLDateTime } from 'graphql-iso-date'
// import { Author, FortuneCookie } from './connectors.js'
import { Records } from './records'

// A map of functions which return data for the schema
const resolvers = {
    Date: GraphQLDateTime,
    Query: {
        getOneEit(_, args) {
            return Records.findOne(args.id)
        },
        getAllEits() {
            return Records.find({}).fetch()
        },
    },
        Mutation: {
            addEit(_, args) {
                args.createdAt
                let id = Records.insert(args)
                return Records.findOne(id)
            },
            deleteEit(_, args) {
                Records.remove(args.id)
                return args.id
            },
            updateEit(_, args) {
                let id = Records.update(args)
                return Records.findOne(id)
            },
        },
        
}
export default resolvers