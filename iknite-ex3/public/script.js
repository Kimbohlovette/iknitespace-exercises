
const menuBtnEl = document.getElementById('menu-btn')
const dropDownMenuEl = document.getElementById('dropdown-menu')
const closeMenuBtnEl = document.getElementById('close-menu-btn')


menuBtnEl.addEventListener( 'click', ()=>{
    dropDownMenuEl.classList.toggle('hidden')
})

closeMenuBtnEl.addEventListener('click', ()=>{
    dropDownMenuEl.classList.toggle('hidden')
})