const express = require('express')
const index = express()

index.get('/', function (req, res) {
  res.send('Cloudshop API Service -  running ...')
})

module.exports = index;