const apiKey = 'SxhYfwWtBszS_LwpNPflfA0e6UxgfMsC';

const stockButton = document.getElementById('fetchStock');
const ctx = document.getElementById('stockChart').getContext('2d');
let chartDisplay = document.getElementById('chartContainer');
let stockChart;

function loadChartLibrary(callback) {
    const script = document.createElement("script");
    script.src = "C:/Users/arifr/Desktop/INST377/Assignment 2/package/dist/chart.umd.js";
    script.onload = callback;
    document.head.appendChild(script);
}

// Handle stock fetch
stockButton.addEventListener('click', async () => {
  const ticker = document.getElementById('stockTicker').value.trim().toUpperCase();
  allStock = ticker;
  const days = document.getElementById('dayRange').value;
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - parseInt(days));

  const from = startDate.toISOString().split('T')[0];
  const to = endDate.toISOString().split('T')[0];

  try {
    const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&apiKey=${apiKey}`);
    const data = await response.json();

    const labels = data.results.map(item => new Date(item.t).toLocaleDateString());
    const closePrices = data.results.map(item => item.c);
    
 
    renderChart(labels, closePrices, ticker);
  } catch (error) {
    console.error(error);
    alert('Error fetching stock data.');
  }
});



// Render Chart.js Line Chart
function renderChart(labels, data, ticker) {
  if (stockChart) {
    stockChart.destroy();
  }
  stockChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: `${ticker} Closing Prices`,
        data: data,
        borderColor: '#007bff',
        tension: 0.3,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
        },
        y: {
          display: true,
        }
      }
    }
  });
}

// Load Top 5 Reddit Stocks
async function loadRedditStocks() {
  try {
    const response = await fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03');
    const data = await response.json();
    const top5 = data.slice(0, 5);

    const tbody = document.getElementById('redditStocks').querySelector('tbody');
    tbody.innerHTML = '';

    top5.forEach(stock => {
      const tr = document.createElement('tr');

      const tickerTd = document.createElement('td');
      const link = document.createElement('a');
      link.href = `https://finance.yahoo.com/quote/${stock.ticker}`;
      link.textContent = stock.ticker;
      link.target = '_blank';
      tickerTd.appendChild(link);

      const commentsTd = document.createElement('td');
      commentsTd.textContent = stock.no_of_comments;

      const sentimentTd = document.createElement('td');
      const icon = document.createElement('img');
      if (stock.sentiment === 'Bullish') {
        icon.src = 'https://www.pngfind.com/pngs/m/680-6806037_bull-emoji-hd-png-download.png';
      } else {
        icon.src = 'https://i.pinimg.com/736x/1c/8e/d3/1c8ed3f95411a47cfb86450ca12c4985.jpg';
      }
      icon.height = 35;
      icon.width = 35;
      icon.classList.add('sentimentIcon');
      sentimentTd.appendChild(icon);

      tr.appendChild(tickerTd);
      tr.appendChild(commentsTd);
      tr.appendChild(sentimentTd);

      tbody.appendChild(tr);
    });

  } catch (error) {
    console.error(error);
    alert('Error loading Reddit stocks.');
  }
}

// Initial Load
loadRedditStocks();
loadChartLibrary();