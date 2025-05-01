printVariables();

console.log(localVar)
console.log(testingVar)
function printVariables(value1=9,value2=9,value3=9){
    //console.log('hi',value1,value2,value3)
    var localVar=3,testingVar=5;
    if (arguments.length > 3) {
        for (let i = 3; i < arguments.length; i++) {
            console.log(arguments[i]);
        }
    }
    return [value1,value2,value3]
}


let printVariablesExp =function (value1=9,value2=9,value3=9){
    var localVar=3,testingVar=5;
    if (arguments.length > 3) {
        for (let i = 3; i < arguments.length; i++) {
            console.log(arguments[i]);
        }
    }
    return [value1,value2,value3]
}



function sum2var(x,y){
    if (typeof x !== 'number' || typeof y !== 'number') {
        return "Error: Inputs must be numbers";
    }
     return x+y;
}
   
