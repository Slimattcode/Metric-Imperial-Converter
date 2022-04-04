const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
const app = require('../server.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite("basic tests", () => {
        test("#Whole numbers", () => {
            assert.typeOf(convertHandler.getNum("9"), "number");
        });
        test("#decimal", () => {
            assert.typeOf(convertHandler.getNum("9.5"), "number");
        });
        test("#fraction", () => {
            assert.typeOf(convertHandler.getNum("9/9"), "number");
        });
        test("#fraction with a decimal", () => {
            assert.typeOf(convertHandler.getNum("9.7/5"), "number");
        });
        test("#invalid input", () => {
            assert.equal(convertHandler.getNum("9/8/7"), "invalid number");
          assert.equal(convertHandler.getUnit("k"), "invalid unit"); assert.equal(convertHandler.convert(convertHandler.getNum("9/8/7"), convertHandler.getUnit("k")), "invalid number and unit");
        });
        test("#no numrical input", () => {
            assert.equal(convertHandler.getNum("km"), 1);
        });
        test("#input unite tests", () => {
            assert.equal(convertHandler.getUnit("gal"), "gal");
            assert.equal(convertHandler.getUnit("l"), "L");
            assert.equal(convertHandler.getUnit("L"), "L");
            assert.equal(convertHandler.getUnit("km"), "km");
            assert.equal(convertHandler.getUnit("mi"), "mi");
            assert.equal(convertHandler.getUnit("lbs"), "lbs");
            assert.equal(convertHandler.getUnit("kg"), "kg");
        });
        test("#input error unit", () => {
            assert.equal(convertHandler.getUnit("k"), "invalid unit");
        });
        test("#correct return unit for input unit", () => {
            assert.equal(convertHandler.getReturnUnit("gal"), "L");
            assert.equal(convertHandler.getReturnUnit("l"), "gal");
            assert.equal(convertHandler.getReturnUnit("L"), "gal");
            assert.equal(convertHandler.getReturnUnit("mi"), "km");
            assert.equal(convertHandler.getReturnUnit("km"), "mi");
            assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
            assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
        });
        test("#correct spelled-out string unit for input unit", () => {
            assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
            assert.equal(convertHandler.spellOutUnit("L"), "liters");
            assert.equal(convertHandler.spellOutUnit("mi"), "miles");
            assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
            assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
            assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
        });
        test("#correctly convert gal to L", () => {
            assert.equal(convertHandler.convert("1", "gal"), 3.78541);
        });
        test("#correctly convert L to gal", () => {
            assert.equal(convertHandler.convert("1", "L"), 0.26417);
        });
        test("#correctly convert mi to km", () => {
            assert.equal(convertHandler.convert("1", "mi"), 1.60934);
        });
        test("#correctly convert km to mi", () => {
            assert.equal(convertHandler.convert("1", "km"), 0.62137);
        });
        test("#correctly convert lbs to kg", () => {
            assert.equal(convertHandler.convert("1", "lbs"), 0.45359);
        });
        test("#correctly convert kg to lbs", () => {
            assert.equal(convertHandler.convert("1", "kg"), 2.20462);
        });
    });
});