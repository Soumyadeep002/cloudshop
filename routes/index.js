const express = require('express')
const index = express()

index.get('/', function (req, res) {
  res.send('Hello World')
})

module.exports = index;