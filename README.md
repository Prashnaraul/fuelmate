
# FuelMate 🥗

FuelMate is a **web-based health decision support system** that helps users turn nutrition data into real daily actions.


## 🚨 Problem

Many people:
- Don’t understand how many calories they need  
- Don’t know what to eat even if they know nutrition basics  
- Follow unrealistic diets that don’t match their culture  
- Struggle with daily habits like hydration and sleep  

👉 There is a gap between **knowing health information and actually applying it**.


## 💡 Our Approach

FuelMate focuses on **actionable guidance instead of just numbers**.

We:
1. Collect user data (age, height, weight, goal, preferences)
2. Calculate calories and macronutrients
3. Translate that into:
   - Health score
   - Risk insights
   - Water goals
   - Sleep guidance
   - Meal timing
4. Provide **real-world meal suggestions**
5. Adapt recommendations based on **cultural food preferences**
6. Provide **recipe links** so users can immediately act on suggestions
7. Allow users to input food and get **nutrition insights (Food Analyzer)**


## 🏗 Architecture

FuelMate uses a simple frontend architecture:

- **HTML** → Structure and pages  
- **CSS** → UI and layout  
- **JavaScript** → Logic and calculations  

### Flow:
1. User enters data → stored in `localStorage`
2. Data processed in `calculator.js`
3. Results shown in dashboard (`result.html`)
4. Meal planning handled in `food.js`

👉 No backend is used in this MVP version.


## 📊 Data Sources

- Nutrition calculations use **standard BMR formulas**
- Food suggestions are **rule-based**
- Food analyzer uses **keyword-based logic**
- Recipe links are generated using **YouTube search queries**

👉 No external API is used to ensure stability during demo.

## ⚠️ Limitations

- No backend database (uses localStorage only)
- Food analyzer is rule-based (not AI/API-powered)
- Meal suggestions are semi-personalized
- No real-time restaurant API integration
- Limited dynamic personalization


## 🚀 Features

- ⭐ Health Score  
- 🔥 Calories & Macros Calculation  
- ⚠️ Risk Insight  
- 💧 Water Goal  
- 😴 Sleep Guidance  
- ⏰ Meal Timing  
- 🌍 Cultural Meal Planning (multiple food styles)  
- 🍽 Breakfast / Lunch / Dinner / Snack suggestions  
- ▶ Recipe links for each meal  
- 🍔 Eating-out guidance with cuisine-based search  
- 🔎 Food Intake Analyzer  


## 🚀 Future Improvements

- Integrate nutrition APIs (e.g., USDA FoodData Central)
- Add backend database for user profiles
- AI-based food recognition and recommendations
- Real-time location-based restaurant suggestions
- Weekly personalized meal plans
demo link: https://1drv.ms/v/c/2248fa6ff7c9e9b8/IQD7rceyEXaiTKATwfNXduLFAX0IDv1AKFnFb4PP_kk-am8?e=0GviZP

## 🛠 Setup Instructions

1. Clone the repository:
   ```bash
   git clone <your-repo-link>
