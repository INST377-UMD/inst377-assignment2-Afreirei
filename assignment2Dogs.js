
// Load the Simple Slider library dynamically
function loadSliderLibrary(callback) {
  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/simple-slider/1.0.0/simpleslider.min.js";
  script.onload = callback;
  document.head.appendChild(script);
}

// Load 10 random dog images
async function loadDogImages() {
  const response = await fetch("https://dog.ceo/api/breeds/image/random/10");
  const data = await response.json();
  const carousel = document.getElementById("carousel");

  data.message.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    img.height = 612;
    img.width = 612;
    carousel.appendChild(img);
  });

  simpleslider.getSlider()
}


let allBreeds = [];

// Load dog breeds and create buttons
async function loadDogBreeds() {
  const response = await fetch("https://dogapi.dog/api/v2/breeds"); 
  const data = await response.json();
  const breeds = data.data;
  allBreeds = breeds;
  const buttonContainer = document.getElementById("breedButtons");

  breeds.forEach(breed => {
    const button = document.createElement("button");
    button.textContent = breed.attributes.name; 
    button.addEventListener("click", () => displayBreedInfo(breed));
    buttonContainer.appendChild(button);
  });
}

// Display breed info
function displayBreedInfo(breed) {
  document.getElementById("breedInfo").style.display = "block";
  document.getElementById("breedName").textContent = breed.attributes.name;
  document.getElementById("breedDescription").textContent = breed.attributes.description;
  document.getElementById("minLife").textContent = breed.attributes.life.min;
  document.getElementById("maxLife").textContent = breed.attributes.life.max;
}

// Run everything after slider library loads
window.onload = () => {
  loadSliderLibrary(() => {
    loadDogImages();
    loadDogBreeds();
  });
};



