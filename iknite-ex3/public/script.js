
const menuBtnEl = document.getElementById('menu-btn')
const dropDownMenuEl = document.getElementById('dropdown-menu')
const closeMenuBtnEl = document.getElementById('close-menu-btn')
const emailControlEl = document.getElementById('email-control')
const emailInputEl = document.getElementById('email')


menuBtnEl.addEventListener( 'click', ()=>{
    dropDownMenuEl.classList.toggle('hidden')
})

closeMenuBtnEl.addEventListener('click', ()=>{
    dropDownMenuEl.classList.toggle('hidden')
})

emailInputEl.addEventListener('focusin', ()=>{
    emailControlEl.classList.add('ring-4')
    emailControlEl.classList.add('ring-green-800')
})

emailInputEl.addEventListener('focusout', ()=>{
    emailControlEl.classList.remove('ring-4')
    emailControlEl.classList.remove('ring-green-800')
})
