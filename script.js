const { useImperativeHandle } = require("react");

const currentOperand = document.querySelector(".current-operand");
const previousOperand = document.querySelector(".prevoiusOperand");
const buttons = document.querySelectorAll("button");

let currentInput = "0";
let previousInput = "";
let operator = null;
let shouldResetScreen= false;

function updateDisplay() {
    currentOperand.textContent = currentInput;
    previousOperand.textContent = previousInput;
}

const clearCalculator() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    shouldResetScreen = false;
    updateDisplay();
}

function deleteDigit() {
    if (shouldResetScreen) {
        currentInput = 0;
        shouldResetScreen = false;

    }

    else {
        currentInput = currentInput.slice(0, -1);


        if (currentInput === "" || currentInput === "-") {
            currentInput = "0";
        }
    }
    updateDisplay();
}

function chhoseOperator(selectedOperator) {
    if (operator !== null && !shouldResetScreen){
        calculate();
    }

    previousInput = currentInput;
    operator = selectedOperator;
    shouldResetScreen = true;
    updateDisplay();
}

function calculate() {
    if (operator === null || shouldResetScreen) {
        return;
    }
    const firstNumber = Number(previousInput);
    const secondNumber = number(currentInput);

    let result;

    switch(operator){
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
        result = firstNumber + secondNumber;
        break;

        case "×":
            result = firstNumber * secondNumber;
            break;

        case "÷":
            if (secondNumber === 0) {
                currentInput = "Cannot divide by zero";
                previousInput = "";
                operator = null;
                shouldResetScreen = true;
                updateDisplay();
                return;
            }

            result = firstNumber / secondNumber;
            break;
    }

    currentInput = string(NUmber(result.toPrecision(12)));
    previousInput = "";
    operator = null;
    shouldResetScreen = true;
    updateDisplay();
}

function percentage() {
    currentInput = String(Number(currentInput) / 100);
    shouldResetScreen = true;
    updateDisplay();
}

