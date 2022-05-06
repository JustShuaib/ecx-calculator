const outputDisplay = document.getElementById("output-display"),
  btns = document.querySelectorAll(".btn");

let currentOperation = "",
  resultIsDisplayed = false,
  result = "";

const themeOne = document.querySelector(".theme--one"),
  themeTwo = document.querySelector(".theme--two"),
  themeThree = document.querySelector(".theme--three");

btns.forEach((btn) => btn.addEventListener("click", performOperation));

/**
 * It takes the value of the button that was clicked, and if it's a number, it adds it to the
 * currentOperation string, if it's an operator, it adds it to the currentOperation string, if it's the
 * DEL button, it removes the last character from the currentOperation string, if it's the EQUALS
 * button, it evaluates the currentOperation string and displays the result, and if it's the RESET
 * button, it resets the currentOperation string.
 * @param e - The event object
 */
function performOperation(e) {
  if (e.target.value) {
    resultIsDisplayed = false;
    currentOperation += e.target.value;
  }
  // DELETE BUTTON
  if (e.target.textContent === "DEL") {
    resultIsDisplayed = false;
    currentOperation = currentOperation.slice(0, -1);
  }
  // EQUALS BUTTON
  if (e.target.textContent === "=") {
    resultIsDisplayed = true;
    try {
      currentOperation = result = String(
        eval(currentOperation.replace(/×/g, "*"))
      );
      if (result === "Infinity" || result === "NaN") {
        result = "Infinity";
        currentOperation = "";
      }
    } catch {
      result = "Error";
      currentOperation = "";
    }
    e.preventDefault();
  }
  // RESET BUTTON
  if (e.target.type === "reset") {
    resultIsDisplayed = false;
    currentOperation = "";
  }

  outputDisplay.value = resultIsDisplayed ? result : currentOperation;
  e.preventDefault();
}

themeOne.addEventListener("click", (e) => {
  setTheme("dark");
  e.preventDefault();
});

themeTwo.addEventListener("click", (e) => {
  setTheme("light");
  e.preventDefault();
});

themeThree.addEventListener("click", (e) => {
  setTheme("purple");
  e.preventDefault();
});

/* Setting the theme of the calculator. */
function setTheme(theme) {
  document.documentElement.className = theme;
  localStorage.setItem("theme", theme);
}

/* Checking if there is a theme in local storage and if there is, it sets the theme to that. */
document.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme");
  if (theme) document.documentElement.className = theme;
});
