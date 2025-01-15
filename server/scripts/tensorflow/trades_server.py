from flask import Flask
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/trades', methods=['GET'])
def home():
    print("something")
    return data_dict

if __name__ == '__main__':
    with open("./trades.txt", "r") as file:
        data_dict = json.load(file)
    print("Flask backend called")

    app.run(debug=True, port=8000)