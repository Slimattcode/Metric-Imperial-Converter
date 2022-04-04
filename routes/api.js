'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  
  app.get("/api/convert", (req, res) => {
    let input = req.query.input;
    if (convertHandler.convert(convertHandler.getNum(input), convertHandler.getUnit(input)) === "invalid number and unit") {
      res.json("invalid number and unit");
    } else if (convertHandler.convert(convertHandler.getNum(input), convertHandler.getUnit(input)) === "invalid number") {
      res.json("invalid number");
    } else if (convertHandler.convert(convertHandler.getNum(input), convertHandler.getUnit(input)) === "invalid unit") {
      res.json("invalid unit");
    } else {
      res.json({
        initNum: convertHandler.getNum(input),
        initUnit: convertHandler.getUnit(input),
        returnNum: convertHandler.convert(convertHandler.getNum(input), convertHandler.getUnit(input)),
        returnUnit: convertHandler.getReturnUnit(convertHandler.getUnit(input)),
        string: convertHandler.getString(convertHandler.getNum(input), convertHandler.getUnit(input),
        convertHandler.convert(convertHandler.getNum(input), convertHandler.getUnit(input)), 
        convertHandler.getReturnUnit(convertHandler.getUnit(input)))
      });
    }
  })
};
