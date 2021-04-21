const route = require('express').Router()

route.get('/', (req,res) => {
  console.log('[get] / users.js')
})

module.exports = route;