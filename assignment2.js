function getQuote() {
    fetch("https://zenquotes.io/api/random")
      .then(response => response.json())
      .then(data => {
        const quoteData = data[0];
        document.getElementById("quote").textContent = `"${quoteData.q}"`;
        document.getElementById("author").textContent = `– ${quoteData.a}`;
      })
      .catch(error => {
        document.getElementById("quote").textContent = "Could not load quote.";
        console.error("Error fetching quote:", error);
      });
  }
  
  // Call the function on page load
  window.onload = getQuote;


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

// Load dog breeds and create buttons
async function loadDogBreeds() {
  const response = await fetch("https://api.thedogapi.com/v1/breeds"); 
  const breeds = await response.json();
  const buttonContainer = document.getElementById("breedButtons");

  breeds.forEach(breed => {
    const button = document.createElement("button");
    button.textContent = breed.name;
    button.addEventListener("click", () => displayBreedInfo(breed));
    buttonContainer.appendChild(button);
  });
}

// Display breed info
function displayBreedInfo(breed) {
  document.getElementById("breedInfo").style.display = "block";
  document.getElementById("breedName").textContent = breed.name;
  document.getElementById("breedDescription").textContent = breed.bred_for;
  const [minLife, maxLife] = breed.life_span.split(" - ");
  document.getElementById("minLife").textContent = minLife;
  document.getElementById("maxLife").textContent = maxLife;
}

// Run everything after slider library loads
window.onload = () => {
  loadSliderLibrary(() => {
    loadDogImages();
    loadDogBreeds();
  });
};
