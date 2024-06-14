"use strict";
var AtCharge;
(function (AtCharge) {
    AtCharge[AtCharge["InCharge"] = 0] = "InCharge";
    AtCharge[AtCharge["OutCharge"] = 1] = "OutCharge";
})(AtCharge || (AtCharge = {}));
function Check(Check) {
    if (Check == AtCharge.InCharge) {
        return "charging";
    }
    return "please connect";
}
console.log(Check(AtCharge.OutCharge));
console.log(Check(AtCharge.InCharge));
