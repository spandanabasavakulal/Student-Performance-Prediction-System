import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_squared_error
from math import sqrt

# Load dataset
data = pd.read_csv("student_data.csv")

# Features & target
features = ['age', 'studytime', 'absences', 'failures', 'G1', 'G2']
target = 'G3'

X = data[features]
y = data[target]

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestRegressor(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Metrics
r2 = r2_score(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = sqrt(mse)

print("R2 Score:", round(r2, 2))
print("RMSE:", round(rmse, 2))

# Save model
joblib.dump(model, "student_model.pkl")
print("Model saved successfully")
