
localStorage.setItem("Prev", "");

// Buttons and Answer Selectors
const q1a = document.getElementById("q1-a");
q1a.onclick = function() {select("q1-a")};

const q1b = document.getElementById("q1-b");
q1b.onclick = function() {select("q1-b")};


const submitButton = document.getElementById("submit-button");
submitButton.onclick = function() {submit()};

const nextButton = document.getElementById("nextButton");


function select(selectedId) {
    let new_ans = selectedId;
    let prev_ans = localStorage.getItem("Prev");

    if (new_ans === prev_ans) {
        return; // Exit if the same element is clicked again
    }

    let selectedElement = document.getElementById(new_ans);
    let prev_select = document.getElementById(prev_ans);

    // Reset previous element styles if there was one
    if (prev_select) {
        prev_select.style.border = "0.5dvh solid #8b8b8b";
        prev_select.style.backgroundColor = "#ffffff";
        prev_select.style.filter = "drop-shadow(0 0.5dvh #616161)";
        const paraTag = prev_select.querySelector("p");
        paraTag.style.color = "#808080";
    }

    // Apply new styles to the selected element
    selectedElement.style.border = "0.5dvh solid #B297FF";
    selectedElement.style.backgroundColor = "F3F0F9";
    selectedElement.style.filter = "drop-shadow(0 0.5dvh #825CEF)";
    const pTag = selectedElement.querySelector("p");
    pTag.style.color = "#700EF0";

    localStorage.setItem("answer", new_ans);

    submitButton.style.border = "0.5dvh solid #B297FF";
    submitButton.style.backgroundColor = "F3F0F9";
    submitButton.style.filter = "drop-shadow(0 0.5dvh #825CEF)";
    const parTag = submitButton.querySelector("p");
    parTag.style.color = "#700EF0";

    // Update the previous selected element in localStorage
    localStorage.setItem("Prev", new_ans);
}

function submit() {
    let ans = localStorage.getItem("answer");
    let correct;
    let incorrect;

    // Check for Question 1 (a or b). 
    // a is correct.
    if (ans === "q1-a") {
        // Correct
        correct = document.getElementById("bb_q1_correct");
        correct.style.display = "block";

        nextButton.style.display = "block";
        submitButton.style.display = "none";
        return
    } else if (ans === "q1-b") {
        //Incorrect
        incorrect = document.getElementById("bb_q1_incorrect");
        incorrect.style.display = "block";

        nextButton.style.display = "block";
        submitButton.style.display = "none";
    };
}

