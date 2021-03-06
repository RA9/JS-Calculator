/*
*  @author  : Carlos S. Nah Jr
*  @title   : JS calculator
*  date     : October 28, 2018
*/
(function () {
    "use strict";
    // Get all the numbers
let ids = function (element) {
    if(element.charAt(0) === "#"){
       return document.querySelector(element);
    }

   return document.querySelectorAll(element);
};

// Initialize  variables
let nums = ids(".nums"),
 operators = ids(".ops"),
 viewer = ids("#viewer"),
 equals = ids("#equals"),
 clearNum = ids("#clear"),
firstNum = "",
secondNum = "",
    operator,
    results;

// Set or get the attribute of number
let setNum = function () {
    if(results) {
        secondNum = this.getAttribute("data-num");
        results = "";
    } else{
        secondNum += this.getAttribute("data-num");
    }

    viewer.innerHTML = secondNum;
};

function clean(elem) {
    elem.innerHTML = "";
}

let moveNum = function() {
    firstNum = secondNum;
    secondNum = "";
    operator = this.getAttribute("data-ops");
    viewer.innerHTML = operator;
    equals.setAttribute("data-result", "");
};

// display Number or Results
let displayNum = function () {
    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);

    switch(operator) {
        case "+":
            results = firstNum + secondNum;
            break;
        case "-":
            results = firstNum - secondNum;
            break;
        case "*":
            results = firstNum * secondNum;
            break;
        case "/":
            results = (firstNum / secondNum ).toFixed(2);
            break;
        default:
            results = secondNum;
    }

    //If NaN or Infinity
    if(!isFinite(results)) {
        if(isNaN(results)){
            results = "You've broken it!";
        } else {
            results = "Don't divide by zero";
        }
    }

    //Display the result
    viewer.innerHTML = results;
    equals.setAttribute("data-result", results);

    //Reset the Number to its actual value and keep result
    firstNum = 0;
    secondNum = results;
};

// clear the out result
let clearAll = function () {
    firstNum = "";
    secondNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", results);
};

// get the onclick for numbers
for(var i = 0, l = nums.length; i < l; i++){
    nums[i].onclick = setNum;
}

// get onclick of operators
for(var i = 0, l = operators.length; i < l; i++) {
    operators[i].onclick = moveNum;

};





equals.onclick = displayNum;

clearNum.onclick = clearAll;

}());
 