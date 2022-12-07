
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

const clearEl = document.getElementById('clear')
const answerEl = document.getElementById('answer')



// Get key presses

document.addEventListener('keypress',(e)=>{

    // Return expression result when enter is pressed
    if(e.code==="Enter"){
        evaluateMemoryExp()
        return
    }

    if(e.key==="Delete"){
        console.log(e.key)
    }
    if(!e.code.startsWith('Key')){
        consoleEl.innerText = consoleEl.innerText + e.key
        //console.log(e.key + " " + e.code)
    }
})

var isShift = false

// toggle shift button


shiftBtnEl.addEventListener('click',()=> { 
    toggleShift()
})


numbersEl.addEventListener('click', (event)=>{
    if(event.target.classList.contains('number')){
        //console.log(event.target.innerText)
        let number = event.target.dataset.target
        consoleEl.innerText = consoleEl.innerText + number
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
        consoleEl.innerText = consoleEl.innerText + operator

    })
}

equalToEl.addEventListener('click', ()=>{
    evaluateMemoryExp()
})


bracketEl.addEventListener('click', (event)=>{
    const openBracket = event.target.dataset.target
    const closeBracket = event.target.dataset.bracketclose
    if(isShift){
        consoleEl.innerText = consoleEl.innerText + closeBracket
    }else{
        consoleEl.innerText = consoleEl.innerText + openBracket
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


// HELPER FUNCTIONS

function toggleShift(){
    isShift = !isShift
    shiftEl.classList.toggle('hidden')
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
    }


}

function returnFromMemory(){
    let storedValue = JSON.parse(localStorage.getItem('value'))
    consoleEl.innerText = consoleEl.innerText + parseFloat(storedValue)
}

function subscractFromMemory(){
    let substracter = answerEl.innerText
    if(!substracter) return
    let storedValue = JSON.parse(localStorage.getItem('value'))
    localStorage.setItem("value", JSON.stringify(parseFloat(storedValue)- parseFloat(substracter)))
}