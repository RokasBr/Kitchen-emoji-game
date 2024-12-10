type Dish = {
    dish: string;
    ingredients: string[];
};

const DISHES: Dish[] = [
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

const timerElement = document.getElementById("timer") as HTMLElement;
const scoreElement = document.getElementById("score") as HTMLElement;
const currentDishElement = document.getElementById("current-dish") as HTMLElement;
const dishIngredientsElement = document.getElementById("dish-ingredients") as HTMLElement;
const prepArea = document.getElementById("prep-area") as HTMLElement;
const ingredientsTray = document.getElementById("ingredients") as HTMLElement;
const startButton = document.getElementById("start-game") as HTMLElement;

let score = 0;
let timeRemaining = 60;
let currentDish: Dish | null = null;
let gameInterval: number | undefined;

const feedbackElement = document.createElement("div");
feedbackElement.classList.add("feedback");
prepArea.insertAdjacentElement("afterend", feedbackElement);

function getRandomDish(): Dish {
    return DISHES[Math.floor(Math.random() * DISHES.length)];
}

function updateCurrentDish(dish: Dish) {
    currentDish = dish;
    currentDishElement.textContent = dish.dish;
    dishIngredientsElement.textContent = `Ingredients: ${dish.ingredients.join(", ")}`;
}

function generateIngredientTray(dish: Dish) {
    const allIngredients = DISHES.reduce<string[]>(
        (acc, d) => acc.concat(d.ingredients),
        []
    );
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

function addIngredient(ingredient: string) {
    const ingredientEl = document.createElement("span");
    ingredientEl.textContent = ingredient;
    ingredientEl.classList.add("ingredient");
    ingredientEl.addEventListener("click", () => removeIngredient(ingredientEl));
    prepArea.appendChild(ingredientEl);
}

function removeIngredient(ingredientEl: HTMLElement) {
    prepArea.removeChild(ingredientEl);
}

function checkDish() {
    if (!currentDish) return;

    const selectedIngredients = Array.from(prepArea.children).map(
        child => (child as HTMLElement).textContent || ""
    );

    if (arraysEqual(selectedIngredients.sort(), currentDish.ingredients.sort())) {
        feedbackElement.textContent = "Correct! Well done!";
        feedbackElement.className = "feedback correct";
        score += 10;
        scoreElement.textContent = `Score: ${score}`;
        nextOrder();
    } else {
        feedbackElement.textContent = "Incorrect! Try again.";
        feedbackElement.className = "feedback incorrect";
    }
}

function arraysEqual(a: string[], b: string[]): boolean {
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
document.getElementById("check-dish")?.addEventListener("click", checkDish);
