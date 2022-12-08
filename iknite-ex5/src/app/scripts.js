
const numbersEl = document.getElementById('numbers')
const consoleEl = document.getElementById('console')
const operatorsEl = document.querySelectorAll('.operator')
const equalToEl = document.getElementById('equalto')
const bracketEl = document.getElementById('bracket')
const shiftBtnEl = document.getElementById('shift-btn')
const shiftEl = document.getElementById('shift')
const deleteEl = document.getElementById('delete')
const returnMemBtn = document.getElementById('return-mem')
const addMemBtn = document.getElementById('add-mem')
const subMemBtn = document.getElementById('sub-mem')
const clearMemBtn = document.getElementById('clear-mem')
const memoryIndicatorEl = document.getElementById('memory')
const clearEl = document.getElementById('clear')
const answerEl = document.getElementById('answer')



// Get key presses

document.addEventListener('keypress',(event)=>{

    // Return expression result when enter is pressed
    if(event.code==="Enter"){
        evaluateMemoryExp()
        return
    }

    if(!event.code.startsWith('Key')){
        updateConsole(event.key)
        //console.log(e.key + " " + e.code)
    }
})

// flags

var isShift = false
var isDirty = false

// Indicate if there is a value in memory

let memory = JSON.parse(localStorage.getItem("value"))
if(memory){
    addMemoryIndicator()
}

// toggle shift button

shiftBtnEl.addEventListener('click',()=> { 
    toggleShift()
})

numbersEl.addEventListener('click', (event)=>{
    if(event.target.classList.contains('number')){
        //console.log(event.target.innerText)
        let number = event.target.dataset.target
        updateConsole(number)
    }
})

clearEl.addEventListener('click', ()=>{
    consoleEl.innerText = ""
    answerEl.innerText = ""
    
})

for(const operators of operatorsEl){
    operators.addEventListener('click', (event)=>{
        let operator = event.target.dataset.target
        //console.log(operator)
        updateConsole(operator)

    })
}

equalToEl.addEventListener('click', ()=>{
    evaluateMemoryExp()
})

bracketEl.addEventListener('click', (event)=>{
    const openBracket = event.target.dataset.target
    const closeBracket = event.target.dataset.bracketclose
    if(isShift){
        updateConsole(closeBracket)
        bracketEl.innerText = ")"
    }else{
        updateConsole(openBracket)
        bracketEl.innerText = "("
    }
    
})

deleteEl.addEventListener('click', ()=>{
    backSpace()
})


// Implement memory functionality

addMemBtn.addEventListener('click', ()=>{
    addToMemory()
})

subMemBtn.addEventListener('click', ()=>{
    subscractFromMemory()
})

returnMemBtn.addEventListener('click',()=>{
   returnFromMemory() 
})

clearMemBtn.addEventListener('click', ()=>{
    clearMemory()
})


// HELPER FUNCTIONS

function updateConsole(value){
    if(value==="*"){
        consoleEl.innerText = consoleEl.innerText + "x"
    }

    else{
        consoleEl.innerText = consoleEl.innerText + value
    }
}

function toggleShift(){
    isShift = !isShift
    shiftEl.classList.toggle('hidden')
    if(!isShift){
        bracketEl.innerText = "("
    }
    else{
        bracketEl.innerText = ")"
    }
}


function backSpace(){
    const expression = consoleEl.innerText.split('')
    expression.pop()
    consoleEl.innerText = expression.join('')
    
}


function evaluateMemoryExp(){
    const expression = consoleEl.innerText
    .split('')
    if(expression[0]==="0"){
        expression[0]=""
    }

    for( const c in expression){
        if(expression[c].toLowerCase()==='x'){
            expression[c] = '*'
        }

        if(expression[c]==='('&& isNumeric(expression[c-1])){
            expression[c] = "*("
        }
    }

    let answer = ""

    try{
        answer = eval(expression.join(''))  
    } catch (error){
        answer = "INVALID EXPRESSION!"
    }
    
    if(!answer){
        answer= 0
    }
    answerEl.innerText = answer
    consoleEl.innerText = ""

}

function addToMemory(){
    let memory = answerEl.innerText
    if(!memory) return
    let storedValue = JSON.parse(localStorage.getItem("value"))
    if(storedValue){
        let value = parseFloat(storedValue) + parseFloat(memory)
        localStorage.setItem("value", JSON.stringify(value))
    }
    else{
        localStorage.setItem("value",JSON.stringify(memory))
        addMemoryIndicator()
    }
}

function returnFromMemory(){
    let storedValue = JSON.parse(localStorage.getItem('value'))
    if(!storedValue) return
    updateConsole(parseFloat(storedValue))
}

function subscractFromMemory(){
    let substracter = answerEl.innerText
    if(!substracter) return
    let storedValue = JSON.parse(localStorage.getItem('value'))
    localStorage.setItem("value", JSON.stringify(parseFloat(storedValue)- parseFloat(substracter)))
}

function clearMemory(){
    localStorage.setItem("value", JSON.stringify(""))
    removeMemoryIndicator()
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

function removeMemoryIndicator(){
    memoryIndicatorEl.classList.add('hidden')
    isDirty = false
}

function addMemoryIndicator(){
    memoryIndicatorEl.classList.remove('hidden')
    isDirty = true
}