

const currentOperand = document.querySelector(".current-operand");
const previousOperand = document.querySelector(".previous-operand");
const buttons = document.querySelectorAll("button");

let currentInput = "0";
let previousInput = "";
let operator = null;
let shouldResetScreen = false;

function updateDisplay() {
    currentOperand.textContent = currentInput;
    previousOperand.textContent = previousInput;
}

function clearCalculator() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    shouldResetScreen = false;
    updateDisplay();
}

function deleteDigit() {
    if (shouldResetScreen) {
        currentInput = "0";
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

function appendNumber(number) {
    if (shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;

    }
    else {
        if (number === "." && currentInput.includes(".")
        ) { return; }
        
        if(currentInput === "0" && number !== "."){
            currentInput = number;
        }
        else {
            currentInput += number;
        }
    }
    updateDisplay();
}

function chooseOperator(selectedOperator) {
    if (operator !== null && !shouldResetScreen) {
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
    const secondNumber = Number(currentInput);

    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
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

    currentInput = String(Number(result.toPrecision(12)));
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

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "AC") {
            clearCalculator();
        }
 
        else if (value == "DEL") {
            deleteDigit();
        }

        else if (value === "%") {
            percentage()
        }
        
        else if (value === "=") {
            calculate();
        }

        else if (["+", "-", "×", "÷"].includes(value)) {
            chooseOperator(value);
        }
        else {
            appendNumber(value);
        }

    });
});
updateDisplay();