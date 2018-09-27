const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const user = require('./routes/user.route')
const app = express()
const mongoose = require('mongoose')

const dbUrl = 'mongodb://kmartin:f1lmbas3!@ds263832.mlab.com:63832/filmbase'
const mongoDB = process.env.MONGODB_URI || dbUrl
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
const connection = mongoose.connection
connection.on('open', () => {
  console.log("Successfully connected to db")
})
connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
connection.on('disconnected', () => {
  console.log("DB connection closed")
})

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://film-base.auth0.com/.well-known/jwks.json`
  }),

  audience: 'gec4UrR9vEWzdQBCrobGTdP5rnNUi4Bz',
  issuer: `https://film-base.auth0.com/`,
  algorithms: ['RS256']
})

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/', user)


app.listen(7001, () => {
  console.log('listening on port 7001');
});

process.on('SIGINT', () => {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});


