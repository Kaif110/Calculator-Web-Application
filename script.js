const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText;

    if (value === "C") {
      expression = "";
      display.value = "";
    } else if (value === "DEL") {
      expression = expression.slice(0, -1);
      display.value = expression;
    } else if (value === "=") {
      try {
        let finalExpression = expression.replace(/%/g, "/100");

        let result = eval(finalExpression);

        if (result === Infinity || result === -Infinity || isNaN(result)) {
          display.value = "Error";
          expression = "";
        } else {
          display.value = result;
          expression = result.toString();
        }
      } catch (error) {
        display.value = "Error";
        expression = "";
      }
    } else {
      expression += value;
      display.value = expression;
    }
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  const allowedKeys = "0123456789+-*/.%";

  if (allowedKeys.includes(key)) {
    expression += key;
    display.value = expression;
  } else if (key === "Enter") {
    try {
      let finalExpression = expression.replace(/%/g, "/100");

      let result = eval(finalExpression);

      if (result === Infinity || result === -Infinity || isNaN(result)) {
        display.value = "Error";
        expression = "";
      } else {
        display.value = result;
        expression = result.toString();
      }
    } catch (error) {
      display.value = "Error";
      expression = "";
    }
  } else if (key === "Backspace") {
    expression = expression.slice(0, -1);
    display.value = expression;
  } else if (key === "Escape") {
    expression = "";
    display.value = "";
  }
});
