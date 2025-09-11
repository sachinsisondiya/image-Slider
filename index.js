const selectedImage = document.getElementById("photos")
const showImage = document.getElementById("show-image")
const backward = document.getElementById("backward")
const forward = document.getElementById("forward")
const currentImage = document.querySelector(".selected-image")
const images = []
let index = 0
let totalImages = 0
let totalImageCount = 0

selectedImage.addEventListener("change", (e)=>{
  for(let i =0 ;i<e.target.files.length;i++){
    images.push(e.target.files[i])
  }
   console.log(images)
    renderImages()

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
