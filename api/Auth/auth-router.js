const route = require("express").Router();
const bcrypt = require("bcryptjs");
const users = require("../Users/users-model");

route.post("/register", async (req, res, next) => {
  try {
    const newUser = req.body;
console.log(newUser)
    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash;

    const added = await users.add(newUser);

    if (added) {
      res
        .status(201)
        .json({ message: "user successfully create", user: added });
    } else {
      res.status(400).json({ message: "failed to create new User" });
    }
  } catch (err) {
    next(err); //!
  }
});

route.post("/login", async (req, res, next) => {
  try {
    let { username, password } = req.body;
    console.log(password)
    const user = await users.findByUsername(username).first()

    console.log(bcrypt.compareSync(password, user.password)) //false
    
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({message: `Welcome ${username}`})
    } else {
      res.status(400).json({message: 'invalid'})
    }
  } catch (error) {
    console.log("catch of /login in users-model.js", error);
    next(error);
  }
});

module.exports = route;
