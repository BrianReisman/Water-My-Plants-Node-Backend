const model = require("./users-model");

const userExists = async (req, res, next) => {
  const id = req.params.userid;
  try {
    const user = await model.findUserById(id);
    if (!user) {
      res.status(400).json({ message: `no user with the id: ${id} exists` });
    } else {
      next();
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: `server side error. [userExists middleware]` });
  }
};

module.exports = { userExists };
