
const numbersEl = document.getElementById('numbers')
const consoleEl = document.getElementById('console')
const operatorsEl = document.querySelectorAll('.operators')
const equalToEl = document.getElementById('equalto')

const clearEl = document.getElementById('clear')
const answerEl = document.getElementById('answer')

numbersEl.addEventListener('click', (event)=>{
    if(event.target.classList.contains('number')){
        console.log(event.target.innerText)
        let number = event.target.innerText
        consoleEl.innerText = consoleEl.innerText + number
    }
})


clearEl.addEventListener('click', ()=>{
    consoleEl.innerText = ""
    answerEl.innerText = ""
    
})

for(const operators of operatorsEl){
    operators.addEventListener('click', (event)=>{
        let operator = event.target.innerText
        if(!operator){
            operator = event.target.dataset.target
            console.log(operator)
        }
        console.log(operator)
    })
}

equalToEl.addEventListener('click', ()=>{
    let answer = eval(consoleEl.innerText)
    answerEl.innerText = answer
})
