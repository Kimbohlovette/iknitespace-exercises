
const numbersEl = document.getElementById('numbers')
const consoleEl = document.getElementById('console')
const operatorsEl = document.querySelectorAll('.operator')
const equalToEl = document.getElementById('equalto')
const bracketEl = document.getElementById('bracket')
const shiftBtnEl = document.getElementById('shift-btn')
const shiftEl = document.getElementById('shift')
const deleteEl = document.getElementById('delete')
const memoryEl = document.getElementById('memory')


const clearEl = document.getElementById('clear')
const answerEl = document.getElementById('answer')

// On init, bring the keyboard input field to focus

memoryEl.focus()

// Get key presses

memoryEl.addEventListener('keypress',(e)=>{
    if(!e.code.startsWith('Key')){
        consoleEl.innerText = consoleEl.innerText + e.key
        //console.log(e.key + " " + e.code)
    }
})

// Keep the keyboard input field focus

memoryEl.addEventListener('blur', ()=>{
    memoryEl.focus()
})


var isShift = false






// toggle shift button


shiftBtnEl.addEventListener('click',()=> { 
    toggleShift()
})


numbersEl.addEventListener('click', (event)=>{
    if(event.target.classList.contains('number')){
        console.log(event.target.innerText)
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
        console.log(operator)
        consoleEl.innerText = consoleEl.innerText + operator

    })
}

equalToEl.addEventListener('click', ()=>{
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