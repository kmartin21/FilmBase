const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const user = require('./routes/user.route')
const recentFavorites = require('./routes/recentFavorite.route')
const app = express()
const mongoose = require('mongoose')

const dbUrl = 'mongodb://kmartin:f1lmbas3!@ds263832.mlab.com:63832/filmbase'
const mongoDB = process.env.MONGODB_URI || dbUrl
mongoose.connect(mongoDB, { useNewUrlParser: true })
mongoose.Promise = global.Promise
const connection = mongoose.connection
connection.on('open', () => {
  console.log("Successfully connected to db")
})
connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
connection.on('disconnected', () => {
  console.log("DB connection closed")
})

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/', user)
app.use('/recent-favorites', recentFavorites)

app.listen(7001, () => {
  console.log('listening on port 7001');
});

process.on('SIGINT', () => {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});


