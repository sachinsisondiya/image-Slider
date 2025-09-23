
const selectedImage = document.getElementById("photos")
const showImage = document.getElementById("show-image")
const backward = document.getElementById("backward")
const forward = document.getElementById("forward")
const currentImage = document.querySelector(".selected-image")
const imageView = document.getElementById("view-btn")
const mainSlider = document.getElementById("main-slider")
const indicators = document.getElementById("indicators")
const closeBtn = document.getElementById("close-btn")
const imageSelector = document.getElementById("image-selector")
 
const images = []
let index = 0
let totalImages = 0
let totalImageCount = 0
let autoIndex  = 0

selectedImage.addEventListener("change", (e)=>{
  for(let i =0 ;i<e.target.files.length;i++){
    images.push(e.target.files[i])
  }
   console.log(images)
    renderImages()

})
closeBtn.addEventListener("click" , () =>{
  showImage.classList.remove("big-show-image")
  showImage.classList.add('show-image')
  imageSelector.style.display = "block"
  imageView.style.display = "block"
  closeBtn.style.display = "none"
})

function handleClick(e){
  console.log(e.target.dataset.id)
  index = Number(e.target.dataset.id)
    document.querySelectorAll(".indicator").forEach(ind => {
      ind.classList.remove("active")
      if(Number(ind.dataset.id) === index){
        ind.classList.add("active")
      }
  })
  newImage(index)

}


imageView.addEventListener("click", () => {
  console.log("clicked")
  showImage.classList.remove('show-image')

  showImage.classList.add('big-show-image')
  imageSelector.style.display = "none"
  imageView.style.display = "none"
  closeBtn.style.display = "block"
  console.log(images.length)
  indicators.innerHTML= images.map( (img ,i)=>{

    return `<span class="material-symbols-outlined fill indicator" data-id="${i}">
                  fiber_manual_record
           </span>`

  }).join('')

  document.querySelectorAll(".indicator").forEach(ind =>{
    ind.addEventListener("click" , handleClick)
  })


})


function countImages(){
   totalImages = document.querySelectorAll(".selected-image")
   totalImageCount = totalImages.length
   console.log(totalImages[0].currentSrc)
}

function newImage(index){
  totalImages.forEach((img, idx) => {
    img.classList.toggle("show", idx === index)
  })

}

const automaticSlide = setInterval(()=>{
  if( images.length >0 && index < totalImageCount -1){
    index++
    newImage(index)
    if(index === totalImageCount -1){
      clearInterval(automaticSlide )
    }
  }


} , 4000)



backward.addEventListener("click",()=>{
  console.log("clicked backward")
  if(index > 0){
   index--
   newImage(index)
  }
  
})
forward.addEventListener("click",()=>{
  console.log("clicked forward")
  if(index < totalImageCount -1){
    index++
    newImage(index)
  }
})

function renderImages(){
  let loadedCount  = 0;
  let total = images.length
  images.forEach((image , i) =>{
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = () =>{
      showImage.innerHTML += `<img class="selected-image ${i === 0 ? "show": ""}" src="${reader.result}" alt="" />`
      loadedCount++
      if(loadedCount === total){
        countImages()
      }
      
    }
  })
}