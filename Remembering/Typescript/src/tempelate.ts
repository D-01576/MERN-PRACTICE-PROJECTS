function process<T>(input:T):T{
    return input;
}

//This is how we can use genrics 
const output1 = process<string>("sarfaraz");
const output2 = process<number>(1);
const output3 = process<boolean>(true);
const output4 = process<null>(null);

console.log("output1: ",output1)
console.log("output2: ",output2)
console.log("output3: ",output3)
console.log("output4: ",output4)
