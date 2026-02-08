let featureChart = null;
let radarChart = null;

function predict() {
    const data = {
        age: document.getElementById("age").value,
        studytime: document.getElementById("studytime").value,
        absences: document.getElementById("absences").value,
        failures: document.getElementById("failures").value,
        g1: document.getElementById("g1").value,
        g2: document.getElementById("g2").value
    };

    fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {

        /* SHOW RIGHT PANEL */
        document.getElementById("resultSection").style.display = "block";

        /* SHOW ML MODEL PERFORMANCE METRICS  ✅ THIS WAS MISSING */
        document.getElementById("metricsSection").style.display = "block";

        /* UPDATE VALUES */
        document.getElementById("prediction").innerText =
            res.prediction + " / 20";
        document.getElementById("category").innerText = res.category;
        document.getElementById("risk").innerText = res.risk;

        document.getElementById("recommendation").innerText =
            res.prediction >= 15
                ? "🌟 Great work! Maintain consistency to achieve excellence."
                : res.prediction >= 10
                ? "📘 Focus more on regular study habits."
                : "⚠️ Immediate academic support recommended.";

        drawFeatureChart(res.importance);
        drawRadarChart(res.prediction);
    })
    .catch(err => console.error("Prediction error:", err));
}

/* FEATURE IMPORTANCE BAR CHART */
function drawFeatureChart(values) {
    const ctx = document
        .getElementById("featureChart")
        .getContext("2d");

    if (featureChart) featureChart.destroy();

    featureChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Age", "Study Time", "Absences", "Failures", "G1", "G2"],
            datasets: [{
                data: values,
                backgroundColor: "#8b5cf6"
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

/* PERFORMANCE ANALYSIS RADAR CHART */
function drawRadarChart(score) {
    const ctx = document
        .getElementById("radarChart")
        .getContext("2d");

    if (radarChart) radarChart.destroy();

    radarChart = new Chart(ctx, {
        type: "radar",
        data: {
            labels: [
                "Academic Score",
                "Attendance",
                "Study Habits",
                "Consistency",
                "Performance"
            ],
            datasets: [{
                data: [
                    score * 5,
                    80,
                    70,
                    85,
                    score * 5
                ],
                backgroundColor: "rgba(139,92,246,0.4)",
                borderColor: "#8b5cf6",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    min: 0,
                    max: 100
                }
            }
        }
    });
}
