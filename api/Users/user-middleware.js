const model = require("./users-model");

const userExists = async (req, res, next) => {
  const { userid: id } = req.params;

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

const plantExists = async (req, res, next) => {
  const [plant] = await model.findPlantById(req.params);
  if (plant) {
    next();
  } else {
    res.status(400).json({
      message: `[PLANT DOES NOT EXIST] User: ${req.params.userid} does not have a plant with an id: ${req.params.plantid} so it cannot be updated.`,
    });
  }
};

const validatePlant = (req, res, next) => {
  const { species, h20_frequency, plant_nickname } = req.body;
  if(!species ||
    !h20_frequency ||
    !plant_nickname){
      res.status(400).json({message: 'species, h20_frequency, plant_nickname are all required'})
    } else {
      next()
    }
};

module.exports = { userExists, plantExists, validatePlant };
