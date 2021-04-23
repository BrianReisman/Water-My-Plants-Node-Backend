const jwt = require("jsonwebtoken");
const users = require("../Users/users-model");
const {jwtsecret} = require('../../config/jwtsecret')

const checkPayload = (req, res, next) => {
  // all three fields are present and of the correct type, string, and password is at least 6 characters long
  const { username, password, phone_number: phone } = req.body;
  if (!username || !password || !phone) {
    res.status(400).json({
      message: "username, password, and phone_number are all required",
    });
  } else if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof phone !== "string"
  ) {
    res.status(400).json({
      message: "username, password, and phone_number must all be strings",
    });
  } else if (password.length < 6) {
    res
      .status(400)
      .json({ message: "passwords must be at least 6 characters long" });
  } else {
    next();
  }
};

const checkUsername = async (req, res, next) => {
  const { username } = req.body;
  try {
    const [user] = await users.findByUsername(username);
    if (user) {
      res.status(400).json({
        message: `the username ${username} is already taken. Please try another one.`,
      });
    } else {
      next();
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "error with the server [checkUsername middleware]" });
  }
};

const checkLogin = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(400)
      .json({ message: "username and password are both required" });
  }

  try {
    const [user] = await users.findByUsername(username);
    if (!user) {
      res.status(400).json({
        message: `the username ${username} doesn't exist in our database. Please try another username or create an account`,
      });
    } else {
      next();
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "error with the server [checkUsername middleware]" });
  }
};

const restricted = (req, res, next) => {
  // ! is frontend sending token with 'bearer'?
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtsecret, (error, decodedToken) => {
      if (error) {
        console.log(error)
        res.status(401).json({ message: "invalid credentials" });
      } else {
        req.decodedToken = decodedToken;
        console.log("decoded Token", decodedToken);
        next();
      }
    });
  } else {
    res.status(401).json({ message: "missing credentials" });
  }

  // ! ADD token valid check
  // ! header[[s]] or header?
  // next()
};

module.exports = {
  checkPayload,
  checkUsername,
  checkLogin,
  restricted,
};
