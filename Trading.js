

const recommendationsContainer = document.getElementById('recommendations-container');

// Sample data - Replace with your actual trading recommendations data
const recommendationsData = [
  { name: 'Recommendation 1', description: 'St Bk of India', chartUrl: 'https://example.com/chart1' },
  { name: 'Recommendation 2', description: 'Power Grid Corpn', chartUrl: 'https://example.com/chart2' },
  { name: 'Recommendation 3', description: 'Reliance Industr', chartUrl: 'https://example.com/chart3' },
  { name: 'Recommendation 4', description: 'NTPC', chartUrl: 'https://example.com/chart4' },
  { name: 'Recommendation 5', description: 'Dr Reddy', chartUrl: 'https://example.com/chart5' }
];

// Function to display trading recommendations
function displayRecommendations() {
  recommendationsData.forEach((recommendation, index) => {
    const recommendationDiv = document.createElement('div');
    recommendationDiv.classList.add('recommendation');
    recommendationDiv.innerHTML = `
      <h2>${recommendation.name}</h2>
      <p>${recommendation.description}</p>
      <a class="chart-link" href="${recommendation.chartUrl}" target="_blank">View Chart</a>
    `;
    recommendationsContainer.appendChild(recommendationDiv);
  });
}

// Display recommendations when the page loads
document.addEventListener('DOMContentLoaded', displayRecommendations);
