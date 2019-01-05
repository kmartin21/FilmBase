const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
require('dotenv').config()
const user = require('./routes/user.route')
const recentFavorites = require('./routes/recentFavorite.route')
const app = express()
const mongoose = require('mongoose')

const mongoDbURI = process.env.MONGODB_URI
const port = process.env.PORT || 7001

mongoose.connect(mongoDbURI, { useNewUrlParser: true })
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
app.use(express.static(path.join(__dirname, 'client', 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

process.on('SIGINT', () => {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});


