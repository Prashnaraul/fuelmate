let foodChartInstance = null;

function recipeLink(searchTerm) {
  return `https://www.youtube.com/results?search_query=${searchTerm.replaceAll(" ", "+")}`;
}

function createMealCard(title, meals) {
  let items = "";

  meals.forEach(meal => {
    items += `
      <li>
        <strong>${meal.name}</strong><br>
        <span>${meal.note}</span><br>
        <a href="${recipeLink(meal.search)}" target="_blank">▶ Watch Recipe</a>
      </li>
    `;
  });

  return `
    <div class="meal-column">
      <h3>${title}</h3>
      <ul>${items}</ul>
    </div>
  `;
}

function showMealPlan() {
  const region = document.getElementById("region").value;
  const goal = document.getElementById("goal").value;
  const box = document.getElementById("mealPlan");

  box.innerHTML = `
    <div class="loading-box">
      Generating personalized meal ideas...
    </div>
  `;

  const plans = {
    southasian: {
      breakfast: [
        { name: "Flatbread + yogurt", note: "Balanced carbs and protein.", search: "roti yogurt breakfast" },
        { name: "Oats + milk + fruit", note: "Simple, light, and filling.", search: "oats milk fruit breakfast" }
      ],
      lunch: [
        { name: "Rice + lentil curry + vegetables", note: "Carbs, protein, and fiber.", search: "rice lentil curry vegetables" },
        { name: "Flatbread + chickpea curry", note: "Strong vegetarian protein option.", search: "chickpea curry roti" }
      ],
      dinner: [
        { name: "Rice + vegetable curry + yogurt", note: "Balanced and not too heavy.", search: "rice vegetable curry yogurt" },
        { name: "Flatbread + paneer or chicken curry", note: "Protein-focused dinner.", search: "paneer curry roti chicken curry" }
      ],
      snack: [
        { name: "Roasted chickpeas", note: "High-protein, budget-friendly snack.", search: "roasted chickpeas snack" },
        { name: "Fruit + yogurt", note: "Light and refreshing.", search: "fruit yogurt snack" }
      ]
    },

    eastasian: {
      breakfast: [
        { name: "Congee + egg", note: "Warm, light, and easy to digest.", search: "egg congee recipe" },
        { name: "Rice + egg + vegetables", note: "Simple balanced breakfast.", search: "rice egg vegetables breakfast" }
      ],
      lunch: [
        { name: "Rice bowl + tofu/chicken + vegetables", note: "Balanced and customizable.", search: "rice bowl tofu chicken vegetables" },
        { name: "Bibimbap-style bowl", note: "Rice, vegetables, and protein.", search: "bibimbap bowl recipe" }
      ],
      dinner: [
        { name: "Vegetable noodle soup", note: "Warm and lighter for dinner.", search: "vegetable noodle soup recipe" },
        { name: "Tofu stir-fry + rice", note: "Protein and vegetables together.", search: "tofu stir fry rice recipe" }
      ],
      snack: [
        { name: "Boiled egg + fruit", note: "Light protein snack.", search: "boiled egg fruit snack" },
        { name: "Yogurt + berries", note: "Quick and refreshing.", search: "yogurt berries snack" }
      ]
    },

    latin: {
      breakfast: [
        { name: "Eggs + beans + tortilla", note: "Protein, fiber, and carbs.", search: "eggs beans tortilla breakfast" },
        { name: "Oatmeal + banana + milk", note: "Affordable and steady energy.", search: "oatmeal banana milk recipe" }
      ],
      lunch: [
        { name: "Rice + beans + grilled chicken", note: "Balanced and filling.", search: "rice beans grilled chicken recipe" },
        { name: "Chicken taco bowl", note: "Easy to control portions.", search: "healthy chicken taco bowl recipe" }
      ],
      dinner: [
        { name: "Fajita bowl", note: "Protein + vegetables + controlled carbs.", search: "healthy fajita bowl recipe" },
        { name: "Bean soup + whole grain tortilla", note: "Fiber-rich and budget-friendly.", search: "bean soup tortilla recipe" }
      ],
      snack: [
        { name: "Fruit + yogurt", note: "Light and refreshing.", search: "fruit yogurt snack" },
        { name: "Guacamole + vegetables", note: "Healthy fats with fiber.", search: "guacamole vegetables snack" }
      ]
    },

    middleeastern: {
      breakfast: [
        { name: "Eggs + pita + cucumber/tomato", note: "Simple protein and fresh vegetables.", search: "eggs pita cucumber tomato breakfast" },
        { name: "Greek yogurt + fruit + nuts", note: "Protein-rich and quick.", search: "greek yogurt fruit nuts recipe" }
      ],
      lunch: [
        { name: "Chicken shawarma bowl", note: "Protein, rice, vegetables, and sauce control.", search: "healthy chicken shawarma bowl" },
        { name: "Falafel bowl + salad", note: "Plant-based option with fiber.", search: "falafel bowl salad recipe" }
      ],
      dinner: [
        { name: "Lentil soup + pita + salad", note: "Warm, filling, and balanced.", search: "lentil soup pita salad recipe" },
        { name: "Grilled chicken + rice + salad", note: "Simple balanced dinner.", search: "middle eastern grilled chicken rice salad" }
      ],
      snack: [
        { name: "Hummus + carrots/pita", note: "Fiber and healthy fats.", search: "hummus carrots pita snack" },
        { name: "Dates + nuts", note: "Quick energy snack.", search: "dates nuts snack" }
      ]
    },

    africancaribbean: {
      breakfast: [
        { name: "Oats + peanut butter + banana", note: "Budget-friendly and filling.", search: "oats peanut butter banana recipe" },
        { name: "Beans + eggs", note: "High-protein breakfast.", search: "beans and eggs breakfast recipe" }
      ],
      lunch: [
        { name: "Rice + beans + chicken", note: "Balanced and filling.", search: "rice beans chicken recipe" },
        { name: "Jollof-style rice + protein", note: "Add chicken, fish, or beans.", search: "jollof rice chicken recipe" }
      ],
      dinner: [
        { name: "Greens + stew + staple carb", note: "Vegetables, protein, and energy.", search: "greens stew healthy recipe" },
        { name: "Vegetable stew + fish/chicken", note: "Protein and micronutrients.", search: "vegetable stew fish chicken recipe" }
      ],
      snack: [
        { name: "Fruit + peanuts", note: "Quick energy and healthy fats.", search: "fruit peanuts snack" },
        { name: "Yogurt + banana", note: "Light and easy.", search: "yogurt banana snack" }
      ]
    },

    western: {
      breakfast: [
        { name: "Eggs + toast + fruit", note: "Protein, carbs, and fiber.", search: "eggs toast fruit breakfast" },
        { name: "Greek yogurt + granola + berries", note: "Protein-rich and quick.", search: "greek yogurt granola berries recipe" }
      ],
      lunch: [
        { name: "Chicken rice bowl", note: "Protein, carbs, and vegetables.", search: "healthy chicken rice bowl recipe" },
        { name: "Turkey sandwich + fruit", note: "Portable and student-friendly.", search: "healthy turkey sandwich fruit" }
      ],
      dinner: [
        { name: "Chicken + potatoes + vegetables", note: "Balanced dinner plate.", search: "chicken potatoes vegetables recipe" },
        { name: "Bean chili + rice", note: "Budget-friendly and filling.", search: "bean chili rice recipe" }
      ],
      snack: [
        { name: "Peanut butter toast", note: "Quick calories and healthy fats.", search: "peanut butter toast snack" },
        { name: "Apple + yogurt", note: "Light, simple snack.", search: "apple yogurt snack" }
      ]
    }
  };

  const plan = plans[region];

  let goalTip = "";

  if (goal === "cut") {
    goalTip = "For cutting: reduce calorie-dense portions, keep protein strong, and add vegetables.";
  } else if (goal === "gain") {
    goalTip = "For muscle gain: increase protein and add slightly larger carb portions around meals.";
  } else {
    goalTip = "For maintenance: keep meals balanced and consistent throughout the day.";
  }

  setTimeout(() => {
    box.innerHTML = `
      <div class="goal-tip">
        <strong>Goal Tip:</strong> ${goalTip}
      </div>

      <div class="meal-grid">
        ${createMealCard("🌅 Breakfast", plan.breakfast)}
        ${createMealCard("🍛 Lunch", plan.lunch)}
        ${createMealCard("🌙 Dinner", plan.dinner)}
        ${createMealCard("🍌 Snack", plan.snack)}
      </div>
    `;
  }, 1200);
}

function analyzeFood() {
  const input = document.getElementById("foodInput").value.toLowerCase().trim();
  const box = document.getElementById("foodAnalysis");
  const chartCanvas = document.getElementById("foodChart");

  const foodDB = {
    fish: { calories: 206, protein: 22, carbs: 0, fat: 12, fiber: 0, benefit: "Fish supports muscle repair, fullness, and brain health." },
    chicken: { calories: 239, protein: 27, carbs: 0, fat: 14, fiber: 0, benefit: "Chicken is useful for high-protein meals and recovery." },
    egg: { calories: 78, protein: 6, carbs: 1, fat: 5, fiber: 0, benefit: "Eggs provide protein and healthy fats for breakfast or recovery." },
    rice: { calories: 130, protein: 3, carbs: 28, fat: 0, fiber: 0.4, benefit: "Rice gives quick energy and works best with protein and vegetables." },
    lentils: { calories: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 8, benefit: "Lentils provide protein, carbs, and fiber for fullness." },
    beans: { calories: 127, protein: 9, carbs: 23, fat: 0.5, fiber: 6, benefit: "Beans support protein, fiber, and steady energy." },
    yogurt: { calories: 59, protein: 10, carbs: 3.6, fat: 0.4, fiber: 0, benefit: "Yogurt supports protein intake and digestion." },
    banana: { calories: 89, protein: 1, carbs: 23, fat: 0.3, fiber: 2.6, benefit: "Bananas provide quick energy and are useful as a snack." },
    pizza: { calories: 285, protein: 12, carbs: 36, fat: 10, fiber: 2.5, benefit: "Pizza gives energy and some protein, but portion control matters." },
    burger: { calories: 295, protein: 17, carbs: 30, fat: 14, fiber: 1.5, benefit: "A burger can provide protein, but balance it with vegetables and water." },
    oats: { calories: 389, protein: 17, carbs: 66, fat: 7, fiber: 10, benefit: "Oats provide long-lasting energy and fiber." }
  };

  let selectedFood = null;
  let selectedName = "";

  for (let food in foodDB) {
    if (input.includes(food)) {
      selectedFood = foodDB[food];
      selectedName = food;
      break;
    }
  }

  if (!selectedFood) {
    box.innerHTML = `
      <div class="analysis-result">
        <h3>Food Insight</h3>
        <p>
          FuelMate does not have detailed data for this food yet.
          Try: fish, chicken, egg, rice, lentils, beans, yogurt, banana, oats, pizza, or burger.
        </p>
      </div>
    `;

    if (foodChartInstance) foodChartInstance.destroy();
    return;
  }

  box.innerHTML = `
    <div class="analysis-result">
      <h3>Nutrition Breakdown: ${selectedName}</h3>
      <p>🔥 <strong>Calories:</strong> ${selectedFood.calories}</p>
      <p>💪 <strong>Protein:</strong> ${selectedFood.protein}g</p>
      <p>🍚 <strong>Carbs:</strong> ${selectedFood.carbs}g</p>
      <p>🥑 <strong>Fat:</strong> ${selectedFood.fat}g</p>
      <p>🌾 <strong>Fiber:</strong> ${selectedFood.fiber}g</p>

      <h3>How this food helps you</h3>
      <p>${selectedFood.benefit}</p>

      <p class="note">Approximate values for educational demo purposes.</p>
    </div>
  `;

  if (foodChartInstance) foodChartInstance.destroy();

  foodChartInstance = new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: ["Calories", "Protein", "Carbs", "Fat", "Fiber"],
      datasets: [
        {
          label: "Nutrition Breakdown",
          data: [
            selectedFood.calories,
            selectedFood.protein,
            selectedFood.carbs,
            selectedFood.fat,
            selectedFood.fiber
          ]
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}
