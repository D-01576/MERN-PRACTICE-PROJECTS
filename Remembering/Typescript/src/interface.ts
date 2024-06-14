//This is how we can use interface 
interface User{
    name : string,
}

//This is how we can extends interface
interface jsd extends User{
    age : number,
    cnic: number
}

const interfaceinput ={
    name : "sarfaraz",
    age : 18,
    cnic : 4140576568728
}

function interfacevalidate(user:jsd):string{
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

console.log(interfacevalidate(interfaceinput))