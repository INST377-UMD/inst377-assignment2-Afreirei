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
