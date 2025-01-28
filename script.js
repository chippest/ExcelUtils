document.getElementById("copyButton").addEventListener("click", function () {
  // Get all input fields
  const inputFields = document.querySelectorAll(".input-field");

  // Get the current date in yyyy-mm-dd format
  const currentDate = new Date().toISOString().split("T")[0];

  // Get the selected province
  const selectedProvince =
    document.querySelector(".province-button.selected").dataset.province || "";

  // Get the value of the new input field
  const newInputValue = document.querySelector(".new-input-field").value.trim();

  // Collect values from inputs and format as a single row of TSV
  const row = [
    currentDate,
    ...Array.from(inputFields)
      .slice(0, 5)
      .map((input) => (input.value || "").trim()),
    "",
    selectedProvince.trim(),
    "",
    "", // 4 empty cells after Address
    (inputFields[5].value || "").trim(),
    "",
    "", // 2 empty cells after Credit Score
    (inputFields[6].value || "").trim(),
    "",
    "", // 2 empty cells after Amount Loan
    (inputFields[7].value || "").trim(),
    newInputValue, // Last cell for the new input field
  ].join("\t");

  // Copy to clipboard
  navigator.clipboard.writeText(row).catch((err) => {
    console.error("Error copying to clipboard: ", err);
  });
});

// Format cell field to only accept numbers 0-9
document.querySelectorAll(".cell-field").forEach((input) => {
  input.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });
});

// Format name fields to capitalize the first letter of every word
document.querySelectorAll(".name-field").forEach((input) => {
  input.addEventListener("input", function () {
    this.value = this.value.replace(/\b\w/g, (char) => char.toUpperCase());
  });
});

// Handle draggable cube
const cube = document.querySelector(".draggable-cube");
let isDragging = false;
let offsetX, offsetY;

cube.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - cube.getBoundingClientRect().left;
  offsetY = e.clientY - cube.getBoundingClientRect().top;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    cube.style.left = `${e.clientX - offsetX}px`;
    cube.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Paste clipboard content into input fields
document.querySelectorAll(".paste-button").forEach((button, index) => {
  button.addEventListener("click", () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        if (index < document.querySelectorAll(".input-field").length) {
          document.querySelectorAll(".input-field")[index].value = text;
        } else {
          document.querySelector(".new-input-field").value = text;
        }
      })
      .catch((err) => {
        console.error("Error reading clipboard: ", err);
      });
  });
});

// Reset all input fields except the new input field
document.querySelector(".reset-button").addEventListener("click", () => {
  document.querySelectorAll(".input-field").forEach((input) => {
    input.value = "";
  });
  document.querySelector(".input-field[value='None']").value = "None";
  document.querySelector("textarea").value = ""; // Clear the textarea
});

// Close the app
document.querySelector(".close-button").addEventListener("click", () => {
  window.close();
});

// Handle province button selection
document.querySelectorAll(".province-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".province-button").forEach((btn) => {
      btn.classList.remove("selected");
    });
    button.classList.add("selected");
    button.dataset.selected = true;
  });
});

// Handle opacity slider
document.getElementById("myRange").addEventListener("input", function () {
  document.body.style.opacity = this.value / 100;
});
