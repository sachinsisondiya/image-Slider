const selectedImage = document.getElementById("photos")
const showImage = document.getElementById("show-image")
const backward = document.getElementById("backward")
const forward = document.getElementById("forward")

const images = []

selectedImage.addEventListener("change", (e)=>{
  for(let i =0 ;i<e.target.files.length;i++){
    images.push(e.target.files[i])
  }
   console.log(images)
    renderImages()

})
let index = 0
let totalImages = 0
function countImages(){
   totalImages = document.querySelectorAll(".selected-image").length
}

backward.addEventListener("click",()=>{
  console.log("clicked backward")
  if(index > 0){
   index--
   showImage.style.transform = `translateX(-${index * 200}px)`
  }
  
})
forward.addEventListener("click",()=>{
  console.log("clicked forward")
  if(index < totalImages -1){
    index++
    showImage.style.transform = `translateX(-${index * 200}px)`
  }
})

function renderImages(){
  images.forEach((image) =>{
    console.log(images)
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = () =>{
      showImage.innerHTML += `<img class="selected-image" src="${reader.result}" alt="" />`
       countImages()
    }
  })
 
}
