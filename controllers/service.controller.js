const Service = require("../models/service.model");

const services = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response || response.length === 0) {
      res.status(404).json({ msg: "No service found" });
      return;
    }
    res.status(200).json({ msg: response });
  } catch (error) {
    console.log(`service: ${error}`);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = services;
