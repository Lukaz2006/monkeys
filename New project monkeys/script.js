const circlew = document.querySelector('#circlew')
const $score = document.querySelector('#score')

function start(){
   setScore(getScore())
   setImage()
}
function setScore(score){
   localStorage.setItem('score', score)
   $score.textContent= score 
}
function getScore(){
   return Number(localStorage.getItem('score')) ?? 0
}
function addOne(){
   setScore(getScore() +1)
   setImage()
}
function setImage(){
   if(getScore()>=50){
      circlew.getAttribute('src','images/OIP-removebg-preview')
   }
}

circlew.addEventListener('click', event=> {
   console.log('Click')
   const rect = circlew.getBoundingClientRect()

   const offsetX = event.clientX - rect.left - rect.width / 2
   const offsetY = event.clientY - rect.right - rect.height / 2

   const DEG = 40

   const tiltX = (offsetY/rect.height) * DEG
   const tiltY = (offsetX/rect.width) * -DEG
    
   circlew.style.setProperty('--tiltX', `${tiltX}deg`)
   circlew.style.setProperty('--tiltY', `${tiltY}deg`)

   setTimeout(()=>{
      circlew.style.setProperty('--tiltX', `0deg`)
      circlew.style.setProperty('--tiltY', `0deg`)
   },300)

   const plusOne = document.createElement('div')
   plusOne.classList.add('plus-one')
   plusOne.textContent='+1'
   plusOne.style.left = `${event.clientX - rect.left}px`
   plusOne.style.top = `${event.clientY - rect.top}px`

   circlew.parentElement.appendChild(plusOne)
   addOne()

   setTimeout(()=>{
     plusOne.remove()
   },2000)
})

start()