const route = require("express").Router();
const bcrypt = require("bcryptjs");
const users = require("../Users/users-model");

route.post("/register", async (req, res, next) => {
  try {
    const newUser = req.body;
    
    const hash = bcrypt.hashSync(newUser, 10);
    newUser.password = hash;

    const added = await users.add(newUser)

    if(added){
      res.status(201).json({message: 'user successfully create', user: added})
    } else {
      res.status(400).json({message: 'failed to create new User'})
    }

  } catch (err) {
    next(err) //!
  }
});




module.exports = route;
