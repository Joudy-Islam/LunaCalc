

const currentOperand = document.querySelector(".current-operand");
const previousOperand = document.querySelector(".previous-operand");
const buttons = document.querySelectorAll(".buttons button");
const historyBtn = document.querySelector(".history-btn");
const historyPanel = document.querySelector(".history-panel");
const historyList = document.querySelector(".history-list");
const ClearHistoryBtn = document.querySelector(".clear-history");

let currentInput = "0";
let previousInput = "";
let operator = null;
let shouldResetScreen = false;
let history = [];

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
        currentInput = number === "." ? "0." :number;
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
    const formattedResult = Number(result.toPrecision(12));
    const equation = `${firstNumber} ${operator} ${secondNumber} = ${formattedResult}`;
    history.unshift(equation);
    renderHistory();
    currentInput = String(Number(result.toPrecision(12)));
    previousInput = "";
    operator = null;
    shouldResetScreen = true;
    updateDisplay();
}
function renderHistory(){
    historyList.innerHTML = "";
    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });
 
    const hHistory = history.length > 0;
    historyList.classList.toggle("hidden", !hHistory);
    ClearHistoryBtn.classList.toggle("hidden", !hHistory);
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

document.addEventListener("keydown", (event) => {
    const key = event.key;

   if(key >= "0" && key <= "9"){
     appendNumber(key);
   }

   else if(key === "."){
    appendNumber(".");
   }

   else if(key === "+"){
    chooseOperator("+");
   }

   else if(key === "-"){
    chooseOperator("-");
   }

   else if(key === "*"){
    chooseOperator("×");
   }

   else if(key === "/"){
    event.preventDefault();
    chooseOperator("÷");
   }

   else if(key === "Enter" || key === "="){
    calculate();
   }

   else if(key === "Backspace" || key === "Delete"){
    deleteDigit();
   }

   else if(key === "Escape"){
    clearCalculator();
   }
   else if(key === "%"){
    percentage();
   }
});
historyBtn.addEventListener("click", () => {
    historyPanel.classList.toggle("hidden");
});
ClearHistoryBtn.addEventListener("click", () => {
    history = [];
    renderHistory();
});
updateDisplay();