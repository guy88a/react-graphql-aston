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

//COMPANY
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    }
});
//USER
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: { 
            type: CompanyType,
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                .then(res => res.data);
            }
        }
    }
});
//ROOT
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