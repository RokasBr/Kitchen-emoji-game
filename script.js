"use strict";
var _a;
const DISHES = [
    { dish: "Toast 🍞", ingredients: ["🍞", "🧈"] },
    { dish: "Salad 🥗", ingredients: ["🥬", "🥕", "🥒"] },
    { dish: "Hot Dog 🌭", ingredients: ["🍞", "🧅"] },
    { dish: "Pizza 🍕", ingredients: ["🍞", "🍅", "🧀"] },
    { dish: "Pasta 🍝", ingredients: ["🍅", "🧀", "🌿"] },
    { dish: "Burger 🍔", ingredients: ["🥩", "🍞", "🧀", "🍅", "🥬"] },
    { dish: "Taco 🌮", ingredients: ["🥩", "🧀", "🥬", "🍅"] },
    { dish: "Sushi 🍣", ingredients: ["🍚", "🐟", "🥢", "🥑", "🍋"] },
    { dish: "Ramen 🍜", ingredients: ["🥩", "🥚", "🌿", "🧄", "🧅"] },
    { dish: "Feast 🍽️", ingredients: ["🍗", "🍖", "🍞", "🍷", "🥗", "🧁", "🍇"] }
];
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const currentDishElement = document.getElementById("current-dish");
const dishIngredientsElement = document.getElementById("dish-ingredients");
const prepArea = document.getElementById("prep-area");
const ingredientsTray = document.getElementById("ingredients");
const startButton = document.getElementById("start-game");
let score = 0;
let timeRemaining = 60;
let currentDish = null;
let gameInterval;
const feedbackElement = document.createElement("div");
feedbackElement.classList.add("feedback");
prepArea.insertAdjacentElement("afterend", feedbackElement);
function getRandomDish() {
    return DISHES[Math.floor(Math.random() * DISHES.length)];
}
function updateCurrentDish(dish) {
    currentDish = dish;
    currentDishElement.textContent = dish.dish;
    dishIngredientsElement.textContent = `Ingredients: ${dish.ingredients.join(", ")}`;
}
function generateIngredientTray(dish) {
    const allIngredients = DISHES.reduce((acc, d) => acc.concat(d.ingredients), []);
    const uniqueIngredients = Array.from(new Set(allIngredients));
    const shuffled = uniqueIngredients.sort(() => Math.random() - 0.5);
    ingredientsTray.innerHTML = "";
    shuffled.forEach(ingredient => {
        const ingredientEl = document.createElement("div");
        ingredientEl.textContent = ingredient;
        ingredientEl.classList.add("ingredient");
        ingredientEl.addEventListener("click", () => addIngredient(ingredient));
        ingredientsTray.appendChild(ingredientEl);
    });
}
function addIngredient(ingredient) {
    const ingredientEl = document.createElement("span");
    ingredientEl.textContent = ingredient;
    ingredientEl.classList.add("ingredient");
    ingredientEl.addEventListener("click", () => removeIngredient(ingredientEl));
    prepArea.appendChild(ingredientEl);
}
function removeIngredient(ingredientEl) {
    prepArea.removeChild(ingredientEl);
}
function checkDish() {
    if (!currentDish)
        return;
    const selectedIngredients = Array.from(prepArea.children).map(child => child.textContent || "");
    if (arraysEqual(selectedIngredients.sort(), currentDish.ingredients.sort())) {
        feedbackElement.textContent = "Correct! Well done!";
        feedbackElement.className = "feedback correct";
        score += 10;
        scoreElement.textContent = `Score: ${score}`;
        nextOrder();
    }
    else {
        feedbackElement.textContent = "Incorrect! Try again.";
        feedbackElement.className = "feedback incorrect";
    }
}
function arraysEqual(a, b) {
    return a.length === b.length && a.every((value, index) => value === b[index]);
}
function startGame() {
    score = 0;
    timeRemaining = 60;
    scoreElement.textContent = "Score: 0";
    timerElement.textContent = "Time: 60s";
    nextOrder();
    gameInterval = window.setInterval(() => {
        timeRemaining--;
        timerElement.textContent = `Time: ${timeRemaining}s`;
        if (timeRemaining <= 0) {
            clearInterval(gameInterval);
            alert(`Game Over! Final Score: ${score}`);
        }
    }, 1000);
}
function nextOrder() {
    prepArea.innerHTML = "";
    const dish = getRandomDish();
    updateCurrentDish(dish);
    generateIngredientTray(dish);
}
startButton.addEventListener("click", startGame);
(_a = document.getElementById("check-dish")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", checkDish);
