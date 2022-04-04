function ConvertHandler() {

  this.getNum = function(input) {
    let numCheck = (check) => {
      if (/^\d+$/.test(check) || /^\d+\.\d+$/.test(check)){
        return Number(check);
      } else if (/^\d+\/\d+$/.test(check) || /^\d+\.\d+\/\d+\.\d+$/.test(check) || 
      /^\d+\.\d+\/\d+$/.test(check) || /^\d+\/\d+\.\d+$/.test(check)) {
        let firstNum = check.slice(0, check.search("/"));
        let secondNum = check.slice(check.search("/") + 1);
        return Number(firstNum / secondNum);
      } else {
        return "invalid number";
      };
    };
    let firstLetterIndex = input.search(/[a-z]/i);
    if (firstLetterIndex === -1) {
      return numCheck(input);
    } else if (firstLetterIndex === 0) {
      return 1;
    } else {
      let number = input.slice(0, firstLetterIndex)
      return numCheck(number);
    };
  };

  this.getUnit = function(input) {
    let firstLetterIndex = input.search(/[a-z]/i);
    let result = input.slice(firstLetterIndex);
    result = result.toLowerCase();
    let testRegx = /^gal$|^lbs$|^kg$|^mi$|^km$/i;
    if (result.length === 1 && /^l$/i.test(result)) {
      return result.toUpperCase();
    } else if (testRegx.test(result)) {
      return result;
    } else {
      return "invalid unit"
    };
  };

  this.getReturnUnit = function(initUnit) {
    unit = initUnit.toLowerCase();
    return unit === "gal" ? "L" : unit === "l" ? "gal"
      : unit === "lbs" ? "kg" : unit === "kg" ? "lbs"
        : unit === "mi" ? "km" : "mi"
  };

  this.spellOutUnit = function(unit) {
    return unit === "gal" ? "gallons"
      : unit === "L" ? "liters"
        : unit === "lbs" ? "pounds"
          : unit === "kg" ? "kilograms"
            : unit === "mi" ? "miles"
              : "kilometers"
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    return initNum === "invalid number" && initUnit === "invalid unit" ? "invalid number and unit"
      : initNum === "invalid number" ? "invalid number"
      : initUnit === "invalid unit" ? "invalid unit"
      : initUnit === "gal" ? Number((initNum * galToL).toFixed(5))
      : initUnit === "L" ? Number((initNum / galToL).toFixed(5))
      : initUnit === "lbs" ? Number((initNum * lbsToKg).toFixed(5))
      : initUnit === "kg" ? Number((initNum / lbsToKg).toFixed(5))
      : initUnit === "mi" ? Number((initNum * miToKm).toFixed(5))
      : Number((initNum / miToKm).toFixed(5))
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
      return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
};

module.exports = ConvertHandler;
