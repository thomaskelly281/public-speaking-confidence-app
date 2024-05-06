
localStorage.setItem("Prev", "");

const q3a = document.getElementById("q3-a");
q3a.onclick = function() {select("q3-a")};

const q3b = document.getElementById("q3-b");
q3b.onclick = function() {select("q3-b")};

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

    // Check for Question 2 (a or b). 
    // b is correct.
    if (ans === "q3-b") {
        // Correct
        correct = document.getElementById("exclamations_q3_correct");
        correct.style.display = "block";

        nextButton.style.display = "block";
        submitButton.style.display = "none";
        return
    } else if (ans === "q3-a") {
        //Incorrect
        incorrect = document.getElementById("exclamations_q3_incorrect");
        incorrect.style.display = "block";

        nextButton.style.display = "block";
        submitButton.style.display = "none";
    };
}

