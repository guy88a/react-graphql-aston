// Requires ================================================== //
const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

// Settings ================================================== //
const PORT = 4000;
const app = express();

// Usage ===================================================== //
app.use('/graphql', expressGraphQL({
    schema, //equls 'schema: schema'
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});