

# Crypto Recommendation AI - Trading, Crypto, and Stock Market Insights

This is an AI-powered recommendation system designed to assist users in making informed trading decisions for stocks, cryptocurrencies, and other market instruments. Built for the Scale 91 Hackathon, this project leverages cutting-edge machine learning models to analyze market data and provide personalized recommendations.

How to Use

1. Clone the repository and navigate to the project directory.


2. Run all the Python files by executing the following command in your terminal:

python app.py


3. Once the Python files are executed, open the index.html file, which serves as the main interface of the project.



Note:

The stock and crypto datasets are not yet available due to size limitations (approx. 2.2 TB). These datasets will be uploaded in the future.


How AI Works

1. Data Collection

The system gathers vast amounts of data from multiple sources, such as:

Historical market data

Financial reports

News articles

Social media sentiment


2. Data Preprocessing

Cleaning: Removing irrelevant or erroneous data.

Normalization: Scaling data to ensure consistency.

Feature Engineering: Creating new features from the existing data to better represent the problem.


3. Feature Selection

The AI selects key features based on their predictive importance using techniques like correlation analysis and feature importance methods.


4. Model Training

Machine learning algorithms such as neural networks, decision trees, and ensemble methods are trained on historical data to recognize patterns and relationships.


5. Algorithm Selection

Various algorithms are tailored for specific tasks:

Time series forecasting for price predictions

Sentiment analysis for market sentiment analysis

Pattern recognition for identifying technical analysis indicators



6. Technical Indicators

The system incorporates well-known technical indicators, including:

Moving averages (MA)

Relative Strength Index (RSI)

Moving Average Convergence Divergence (MACD)

Bollinger Bands


These indicators help identify trends, momentum, volatility, and potential entry/exit points.


7. Sentiment Analysis

Natural Language Processing (NLP) techniques are used to analyze sentiments from:

News articles

Social media posts

Financial reports


This helps gauge market sentiment and investor emotions, which influence market trends.


8. Pattern Recognition

Identifies recurring chart patterns such as head and shoulders, triangles, and flags, which are used to predict future price movements.


9. Market Analysis

The system performs fundamental analysis (financials, earnings reports) and technical analysis (chart patterns, technical indicators) to assess market conditions and opportunities.


10. Prediction

AI-generated predictions provide insights on:

Future price trends

Support/resistance levels

Potential buy/sell signals



11. Risk Management

Integrates risk management strategies to optimize investment decisions, such as:

Position sizing

Stop-loss orders

Portfolio diversification


These techniques help minimize risks and maximize returns.


12. Performance Evaluation

The models' performance is continuously evaluated through backtesting and validation techniques, ensuring that predictions are optimized based on real-world outcomes.


13. Continuous Learning

The system adapts over time by incorporating new data, feedback, and market changes to improve prediction accuracy and performance.


14. User Interaction

The AI provides an interactive interface where users can:

Input preferences, risk tolerance, and investment goals.

Receive tailored recommendations and strategies based on their needs.



15. Real-Time Updates

The system provides real-time updates on:

Market changes

Breaking news

Significant events that could impact investment decisions




---

Technologies Used

Python for the backend (data collection, analysis, training models)

Flask for the web framework

Machine Learning Libraries: TensorFlow, Scikit-learn, etc.

NLP tools for sentiment analysis

JavaScript (React.js) for the frontend interface

HTML/CSS for UI and presentation



---

This AI-based recommendation system brings data-driven insights and personalized trading strategies to users, enhancing decision-making for crypto, stocks, and other trading assets.
