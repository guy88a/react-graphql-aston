// Requires ================================================== //
const graphql = require('graphql');
const axios = require('axios');

// Settings ================================================== //
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
});

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery' ,
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`)
                .then(resp => resp.data);
            }
        }
    }
});

// Export ==================================================== //
module.exports = new GraphQLSchema({
    query: RootQueryType
});