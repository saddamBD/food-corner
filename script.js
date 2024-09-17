const mealsContainer = document.getElementById("meals-container");
const hamburgerBtn = document.getElementById("hamburger-btn");
const mobileMenu = document.getElementById("mobile-menu");
const homeButton = document.getElementById("homeButton");

// Toggle mobile menu visibility
hamburgerBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Function to fetch meals based on the category
async function fetchMeals(category) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`
    );
    const data = await response.json();
    displayMeals(data.meals); // Call function to display meals
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
}

// Function to display the fetched meals
function displayMeals(meals) {
  mealsContainer.innerHTML = ""; // Clear previous content
  meals.forEach((meal) => {
    // Create a card for each meal
    const mealCard = document.createElement("div");
    mealCard.classList.add("card", "bg-base-100", "shadow-xl");
    mealCard.innerHTML = `
              <figure><img src="${meal.strMealThumb}" alt="${
      meal.strMeal
    }" class="w-full h-40 object-cover"></figure>
              <div class="card-body">
                <h2 class="card-title">${meal.strMeal}</h2>
                <p>${meal.strInstructions.substring(0, 100)}...</p>
                <div class="card-actions justify-end">
                  <a href="${
                    meal.strYoutube
                  }" class="btn btn-primary" target="_blank">Watch Recipe</a>
                </div>
              </div>
            `;
    mealsContainer.appendChild(mealCard); // Add the card to the container
  });
}

// Event listeners for the category buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.textContent;
    fetchMeals(category); // Fetch and display meals for the selected category
  });
});
// Show default "Potato" data when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchMeals("Potato"); // Fetch and display meals for the default category 'Potato'
});

// Handle Carousel Navigation

document.querySelectorAll(".btn.btn-circle").forEach((navButton) => {
  navButton.addEventListener("click", () => {
    fetchMeals("Potato");
    // Re-fetch meals for the current category when carousel navigates
  });
});

//home button function

homeButton.addEventListener("click", () => {
  fetchMeals("Potato");
  console.log("clicked");
});
