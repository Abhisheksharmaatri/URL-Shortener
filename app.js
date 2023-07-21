const express = require('express');
const app = express();

//Sensitive Data
const senstive = require('./sensitive');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//Routes
const urlRouter = require('./routes/url');
const userRouter = require('./routes/user');
const notFoundController = require('./controllers/notFound');
const errorMiddleware = require('./middleware/error');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// app.use('/', (req, res, next) => {
//     console.log('Body: ', req.body)
//     console.log('Params: ', req.params)
//     console.log('Query: ', req.query);
//     next();
// })

//Graphql
const graphqlHttp = require('express-graphql').graphqlHTTP;
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
}));

//Routes
app.use('/url', urlRouter);
app.use('/user', userRouter);
app.use(notFoundController);
app.use(errorMiddleware);

mongoose.connect(senstive.database.url)
    .then(result => {
        console.log('connected');
        app.listen(4000);
    })
    .catch(err => {
        console.log(err);
    });