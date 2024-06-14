"use strict";
const typeinput = {
    name: "sarfaraz",
    age: 18,
    cnic: 4140576568728
};
function typevalidate(user) {
    if (user.age < 18) {
        return `${user.name} you are not validated becasue you are less than 18 years`;
    }
    else {
        const numberString = user.cnic.toString();
        const lengthOfNumber = numberString.length;
        if (lengthOfNumber != 13) {
            return `${user.name} you entered incorrect cnic`;
        }
    }
    return `${user.name} you are validated`;
}
console.log(typevalidate(typeinput));
