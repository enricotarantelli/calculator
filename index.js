
const screen = document.querySelector('.screen')
const arr = Array.from(document.querySelectorAll('.operation-button'));
calculatorButtons = arr.filter(btn => btn.dataset.value != '=')
let screenValue = 0;
let hasOperator = false
// let currentOperator
const operators = ['+', '-', '*', '/']

calculatorButtons.forEach(btn => {
    btn.addEventListener('click', getButtonValue)
})
document.querySelector('.operation-button[data-value="="]')
    .addEventListener('click', () => {
        const checkValidOperation = screenValue.split(' ')
        if(checkValidOperation.length == 3){
            screenValue = getOperationComponents(screenValue);
            screen.textContent = screenValue;
            hasOperator = false;
        }
    });
    document.querySelector('.functional-button[data-value="clear"]')
        .addEventListener('click', () => {
            screenValue = clear(screenValue);
        });
    document.querySelector('.functional-button[data-value="del"]')
        .addEventListener('click', () => {
            screenValue = backspace(screenValue);
        })

function sum(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}
function operate(operator, a, b){
    switch (operator){
        case '+':
            return sum(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
           return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
        default:
            alert('something went wrong')
    }
}
function getButtonValue(event) {
    const value = event.target.dataset.value;
    changeScreenValue(value);
}
function changeScreenValue(value){
    if(Number.isInteger(+value)){
        if(screenValue == 0){
            screenValue = `${value}`
        } else {
            screenValue += `${value}`
        }
    } else{
        if(hasOperator == false) {
            screenValue += ` ${value} `;
            hasOperator = true;
        } else {
            screenValue = getOperationComponents(screenValue);
            screenValue += ` ${value} `;

        }
    }
    screen.textContent = screenValue;
}

function getOperator(operation) {
    const arr = operation.split(' ');
    const operator = arr.filter(op => operators.includes(op));
    return operator[0];
}
function getOperands(operation){
    const arr = operation.split(' ');
    const operands = arr.filter(item => !operators.includes(item));
    return operands;
}
function getOperationComponents(operation) {
    const operator = getOperator(operation);
    const operands = getOperands(operation);
    const a = operands[0];
    const b = operands[1];
    operation = operate(operator, a, b);
    return `${operation}`;
}
function clear(value) {
    value = 0;
    screen.textContent = '0';
    hasOperator = false;
    return `${value}`;
}

function backspace(value) {
    value = value.split(' ')
    value = value.filter(val => val != '');
    const pop = value.pop();
    value = value.join(' ');
    if(operators.includes(value[value.length - 1])){
        value += ' '
    } else{
        hasOperator = false;
        if(value.length == 0) {
            value = 0;
        }
    }
    screen.textContent = value;
    return `${value}`;

}
// console.log(sum(5, 4));
// console.log(subtract(5, 4));
// console.log(multiply(5, 4));
// console.log(divide(5, 4));
