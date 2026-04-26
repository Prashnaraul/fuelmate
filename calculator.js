const data = JSON.parse(localStorage.getItem("nutritionUser"));
const results = document.getElementById("results");

let calories = 0;
let protein = 0;
let carbs = 0;
let fat = 0;
let score = 100;
let waterLiters = 0;

if (!data) {
  results.innerHTML = `
    <p>No data found. Please fill out the form first.</p>
    <button onclick="goBack()">Go to Form</button>
  `;
} else {
  const weight = Number(data.weight);
  const height = Number(data.height);
  const age = Number(data.age);
  const activity = Number(data.activity);

  const heightMeters = height / 100;
  const bmi = weight / (heightMeters * heightMeters);

  let bmr =
    data.gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  calories = Math.round(bmr * activity);

  let goalMessage = "";

  if (data.goal === "lose") {
    calories -= 300;
    goalMessage = "Your goal is weight loss, so this plan creates a small calorie deficit.";
  } else if (data.goal === "gain") {
    calories += 300;
    goalMessage = "Your goal is muscle gain, so this plan adds extra calories for recovery.";
  } else {
    goalMessage = "Your goal is maintenance, so this plan supports steady energy.";
  }

  protein = Math.round(weight * 1.8);
  fat = Math.round((calories * 0.25) / 9);
  carbs = Math.round((calories - (protein * 4 + fat * 9)) / 4);
  waterLiters = ((weight * 35) / 1000).toFixed(1);

  let bmiNote = "";

  if (bmi >= 25 && bmi < 30) {
    score -= 15;
    bmiNote = "⚠️ BMI suggests overweight range. Focus on balanced portions and steady movement.";
  } else if (bmi >= 30) {
    score -= 25;
    bmiNote = "⚠️ BMI suggests obesity range. Consider gradual changes and professional guidance if needed.";
  } else if (bmi < 18.5) {
    score -= 15;
    bmiNote = "⚠️ BMI suggests underweight range. Increasing calories and protein may help.";
  } else {
    bmiNote = "✅ BMI is within normal range based on this estimate.";
  }

  if (calories < 1400) score -= 25;
  if (calories > 2800) score -= 10;
  if (protein < weight * 1.2) score -= 20;
  if (fat < 30) score -= 10;
  if (carbs < 100) score -= 10;
  if (score < 0) score = 0;

  const scoreMessage =
    score >= 85 ? "Strong balance" :
    score >= 65 ? "Good start, but can improve" :
    "Needs attention";

  let riskText = "";

  if (calories < 1400) {
    riskText += "⚠️ Very low calories may reduce energy and focus.<br>";
  }

  if (protein < weight * 1.2) {
    riskText += "⚠️ Low protein may affect fullness and recovery.<br>";
  }

  if (bmi >= 25) {
    riskText += "⚠️ BMI suggests extra weight risk. Focus on portions, water, sleep, and steady movement.<br>";
  }

  if (riskText === "") {
    riskText = "✅ No major risk detected from this basic estimate.";
  }

  results.innerHTML = `
    <div class="score-box">
      <h2>⭐ Health Score: ${score}/100</h2>
      <p>${scoreMessage}</p>
      <p>This score considers calories, macros, and BMI estimate.</p>
    </div>

    <div class="result-box">
      <h2>🔥 ${calories} Calories/day</h2>
      <p>${goalMessage}</p>

      <p><strong>📏 BMI:</strong> ${bmi.toFixed(1)}</p>
      <p>${bmiNote}</p>

      <div class="macro-education">
        <div>
          <h3>💪 Protein: ${protein}g</h3>
          <p>Protein helps repair muscles and keeps you full. Sources: eggs, chicken, fish, tofu, beans, yogurt, lentils.</p>
        </div>

        <div>
          <h3>🍚 Carbs: ${carbs}g</h3>
          <p>Carbs are your main energy source. Sources: rice, roti, oats, potatoes, fruits, bread, noodles, tortillas.</p>
        </div>

        <div>
          <h3>🥑 Fat: ${fat}g</h3>
          <p>Fats support brain health and hormones. Sources: nuts, avocado, eggs, milk, cheese, seeds, healthy oils.</p>
        </div>
      </div>
    </div>

    <div class="risk-box">
      <h3>⚠️ Risk Insight</h3>
      <p>${riskText}</p>
    </div>

    <div class="water-box">
      <h3>💧 Water Goal</h3>
      <p id="waterGoal"></p>
    </div>

    <div class="culture-box">
      <h3>🌍 Culturally Adaptive Nutrition</h3>
      <p>
        FuelMate supports diverse food styles instead of forcing one perfect diet.
        Better nutrition is about improving balance within familiar eating habits.
      </p>
    </div>

    <p class="note">FuelMate is educational guidance, not medical diagnosis.</p>
  `;

  createChart();
  waterReminder();
}

function createChart() {
  const chartElement = document.getElementById("macroChart");
  if (!chartElement) return;

  new Chart(chartElement, {
    type: "doughnut",
    data: {
      labels: ["Protein", "Carbs", "Fat"],
      datasets: [{ data: [protein, carbs, fat] }]
    },
    options: {
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
}

function waterReminder() {
  const box = document.getElementById("waterGoal");
  const hour = new Date().getHours();
  if (!box) return;

  let reminder = "";

  if (hour < 12) {
    reminder = "Try to finish about 40% of your water goal before lunch.";
  } else if (hour < 18) {
    reminder = "Try to reach about 70% of your water goal by evening.";
  } else {
    reminder = "Finish slowly, but avoid drinking too much right before sleep.";
  }

  box.innerHTML = `
    Estimated goal: <strong>${waterLiters} liters/day</strong><br>
    ${reminder}
  `;
}

function mealReminder() {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const box = document.getElementById("mealReminder");
  if (!box) return;

  const currentTime = `${hour % 12 || 12}:${minute.toString().padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;

  if (hour >= 7 && hour < 10) {
    box.innerHTML = `<strong>Current time: ${currentTime}</strong><br>🌅 Breakfast window: 7:00 AM – 10:00 AM`;
  } else if (hour >= 12 && hour < 15) {
    box.innerHTML = `<strong>Current time: ${currentTime}</strong><br>🍛 Lunch window: 12:00 PM – 2:30 PM`;
  } else if (hour >= 18 && hour < 21) {
    box.innerHTML = `<strong>Current time: ${currentTime}</strong><br>🌙 Dinner window: 6:00 PM – 9:00 PM`;
  } else {
    box.innerHTML = `<strong>Current time: ${currentTime}</strong><br>🍌 Snack / hydration window`;
  }
}

function sleepReminder() {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const box = document.getElementById("sleepReminder");

  if (!box) return;

  const data = JSON.parse(localStorage.getItem("nutritionUser"));
  const age = Number(data.age);

  const currentTime = `${hour % 12 || 12}:${minute
    .toString()
    .padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;

  let sleepNeed = "";
  let sleepFact = "";

  if (age >= 18 && age <= 25) {
    sleepNeed = "7–9 hours";
    sleepFact = "Young adults need more sleep for brain function, memory, and recovery.";
  } else if (age >= 26 && age <= 64) {
    sleepNeed = "7–8 hours";
    sleepFact = "Adults need consistent sleep to maintain energy, focus, and metabolism.";
  } else {
    sleepNeed = "7–8 hours";
    sleepFact = "Sleep supports overall health, immunity, and mental clarity.";
  }

  if (hour >= 21 || hour < 5) {
    box.innerHTML = `
      <strong>Current time: ${currentTime}</strong><br>
      🌙 Ideal sleep window: 10:00 PM – 6:00 AM<br>
      🛌 Recommended for your age: <strong>${sleepNeed}</strong><br>
      💡 ${sleepFact}
    `;
  } else {
    box.innerHTML = `
      <strong>Current time: ${currentTime}</strong><br>
      😴 Recommended sleep: <strong>${sleepNeed}</strong><br>
      💡 ${sleepFact}<br>
      Try to maintain a consistent sleep schedule.
    `;
  }
}

function findFoodNearMe() {
  const choice = document.getElementById("eatOutChoice").value;
  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(choice)}`;
  window.open(mapsUrl, "_blank");
}

function goBack() {
  window.location.href = "form.html";
}

mealReminder();
sleepReminder();

setInterval(mealReminder, 60000);
setInterval(sleepReminder, 60000);
setInterval(waterReminder, 60000);
