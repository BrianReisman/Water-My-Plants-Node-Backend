const route = require("express").Router();
const bcrypt = require('bcryptjs')

route.post("/register", (req, res) => {
  try {
    const newUser = req.body
    console.log('original newUser >>>>>', newUser)
    const hash = bcrypt.hashSync(newUser, 10)
    console.log('hash>>>', hash)
    newUser.password = hash
    console.log('newUser now>>>>', newUser)
  } catch (err) {
    
  }

  // res.status(201).json({ message: "inside" });
});

module.exports = route;
