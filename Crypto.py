from flask import Flask, render_template, request, jsonify
import os
import pandas as pd
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split
from surprise import accuracy

app = Flask(__name__)

# Define the path to the folder containing cryptocurrency CSV files
cryptocurrency_data_path = 'Top 100 Crypto Coins/'

# Create an empty DataFrame to store the cryptocurrency data
columns = ['Name', 'Symbol', 'Price (USD)', 'Market Cap (USD)', '24h % Change', '7d % Change', '30d % Change']
df = pd.DataFrame(columns=columns)

# Loop over all CSV files in the specified folder
for filename in os.listdir(cryptocurrency_data_path):
    if filename.endswith('.csv'):
        # Read data from the CSV file
        file_path = os.path.join(cryptocurrency_data_path, filename)
        crypto_data = pd.read_csv(file_path)

        # Append the data to the DataFrame
        df = df.append(crypto_data, ignore_index=True)

# Print the DataFrame
print(df)

# Optionally, you can save the DataFrame to a CSV file
df.to_csv('cryptocurrency_data.csv', index=False)

# Assuming your DataFrame is named df
reader = Reader(rating_scale=(0, 1))
data = Dataset.load_from_df(df[['Name', 'Symbol', '30d % Change']], reader)

# Split the data into training and testing sets
trainset, testset = train_test_split(data, test_size=0.2)

# Train the collaborative filtering model
model = SVD()
model.fit(trainset)

@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    # Receive data from the front end
    user_id = int(request.json['user_id'])
    selected_crypto = request.json['crypto']
    risk_amount = float(request.json['risk_amount'])

    # Make a prediction for the selected cryptocurrency
    prediction = model.predict(user_id, selected_crypto)
    predicted_rating = prediction.est

    # Return the result as JSON
    recommendations = model.get_neighbors(selected_crypto, 5)  # Get top 5 recommendations

    # Prepare the recommendations data
    recommendation_data = [
        {'name': crypto, 'rating': 0.8, 'image': f'{crypto.lower()}.png'} for crypto in recommendations
    ]

    return jsonify({'crypto': selected_crypto, 'predicted_rating': predicted_rating, 'recommendations': recommendation_data})

if __name__ == '__main__':
    app.run(debug=True)
