const route = require("express").Router();

route.get('/', (req,res) => {
  console.log('[GET] / plants')
})

module.exports = route;
