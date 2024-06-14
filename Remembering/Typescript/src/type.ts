//This is how we can use type
type typeuser1 = {
    name : string,
}

type typeuser2 = {
    age : number,
    cnic: number
}

// This is how we can union and intersection in type
type user = typeuser1 & typeuser2

const typeinput ={
    name : "sarfaraz",
    age : 18,
    cnic : 4140576568728
}

function typevalidate(user:user):string{
    if(user.age < 18){
        return `${user.name} you are not validated becasue you are less than 18 years` 
    }
    else{
        const numberString: string = user.cnic.toString();
        const lengthOfNumber: number = numberString.length;
        if(lengthOfNumber != 13){
            return `${user.name} you entered incorrect cnic`
        }
    }
    return `${user.name} you are validated`
}

console.log(typevalidate(typeinput))