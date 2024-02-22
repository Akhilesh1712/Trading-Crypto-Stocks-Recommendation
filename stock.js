// script.js

function calculatePositionSize() {
    var portfolioValue = parseFloat(document.getElementById('portfolio-value').value);
    var riskPercentage = parseFloat(document.getElementById('risk-percentage').value);

    if (isNaN(portfolioValue) || isNaN(riskPercentage)) {
        alert('Please enter valid numbers for portfolio value and risk tolerance.');
        return;
    }

    var positionSize = (portfolioValue * (riskPercentage / 100)).toFixed(2);

    document.getElementById('position-size').innerText = `Position Size: ${positionSize}`;
}
