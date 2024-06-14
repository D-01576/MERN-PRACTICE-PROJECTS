//This is how we can use Enums
enum AtCharge{
    InCharge,
    OutCharge
}

function Check(Check:number):string{
    if(Check == AtCharge.InCharge){
        return "charging"
    }
    return "please connect"
}

console.log(Check(AtCharge.OutCharge))
console.log(Check(AtCharge.InCharge))