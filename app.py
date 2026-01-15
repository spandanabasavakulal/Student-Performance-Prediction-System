from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

model = joblib.load("student_model.pkl")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    features = np.array([[
        int(data["age"]),
        int(data["studytime"]),
        int(data["absences"]),
        int(data["failures"]),
        int(data["g1"]),
        int(data["g2"])
    ]])

    prediction = round(model.predict(features)[0], 1)

    if prediction >= 15:
        category = "Very Good"
        risk = "Low Risk"
    elif prediction >= 10:
        category = "Good"
        risk = "Medium Risk"
    else:
        category = "Poor"
        risk = "High Risk"

    return jsonify({
        "prediction": prediction,
        "category": category,
        "risk": risk,
        "importance": model.feature_importances_.tolist()
    })

if __name__ == "__main__":
    app.run(debug=True)
