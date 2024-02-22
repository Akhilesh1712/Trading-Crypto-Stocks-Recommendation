import requests
import numpy as np
import pandas as pd
import streamlit as st

def fetch_stock_data(symbol, api_key):
    url = f"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={symbol}&apikey={api_key}"
    response = requests.get(url)
    data = response.json()
    return data

def moving_average_crossover(data, short_window=50, long_window=200):
    data = pd.DataFrame(data['Time Series (Daily)']).T
    data['close'] = data['4. close'].astype(float)
    # Calculate short and long moving averages
    data['Short_MA'] = data['close'].rolling(window=short_window).mean()
    data['Long_MA'] = data['close'].rolling(window=long_window).mean()
    
    # Generate buy/sell signals
    data['Signal'] = 0
    data['Signal'][short_window:] = np.where(data['Short_MA'][short_window:] > data['Long_MA'][short_window:], 1, 0)
    data['Position'] = data['Signal'].diff()

    return data

def calculate_position_size(portfolio_value, risk_pct):
    return portfolio_value * risk_pct

def generate_recommendations(data, portfolio_value, risk_pct):
    recommendations = pd.DataFrame(index=data.index)
    recommendations['Action'] = np.where(data['Position'] == 1, 'Buy', np.where(data['Position'] == -1, 'Sell', 'Hold'))
    recommendations['Position_Size'] = calculate_position_size(portfolio_value, risk_pct) * recommendations['Action'].map({'Buy': 1, 'Sell': -1, 'Hold': 0})
    return recommendations

def main():
    st.title("Trading Recommendation System")
    symbol = st.text_input("Enter stock symbol (e.g., AAPL):")
    api_key = "ZS046LDEPNMKN92I"
    portfolio_value = st.number_input("Enter portfolio value:")
    risk_pct = st.slider("Enter risk tolerance (%)", 0.01, 10.0, 2.0, 0.01)
    
    if st.button("Get Recommendations"):
        data = fetch_stock_data(symbol, api_key)
        processed_data = moving_average_crossover(data)
        recommendations = generate_recommendations(processed_data, portfolio_value, risk_pct)
        st.write(recommendations)

if __name__ == "_main_":
    main()
