
localStorage.setItem("PrevSelect", "");

// Buttons and Answer Selectors
const q1a = document.getElementById("q1-a");
q1a.onclick = function() {select("q1-a")};

const q1b = document.getElementById("q1-b");
q1b.onclick = function() {select("q1-b")};

const q1c = document.getElementById("q1-c");
q1c.onclick = function() {select("q1-c")};

const q1d = document.getElementById("q1-d");
q1d.onclick = function() {select("q1-d")};

const q1e = document.getElementById("q1-e");
q1e.onclick = function() {select("q1-e")};


const submitButton = document.getElementById("submit-button");
submitButton.onclick = function() {submit()};


function select(selectedId) {
    let new_ans = selectedId;
    let prev_ans = localStorage.getItem("PrevSelect");

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
    selectedElement.style.border = "0.5dvh solid #FF7C51";
    selectedElement.style.backgroundColor = "#FFF8F6";
    selectedElement.style.filter = "drop-shadow(0 0.5dvh #E13700)";
    const pTag = selectedElement.querySelector("p");
    pTag.style.color = "#E13700";

    localStorage.setItem("answerPressed", new_ans);

    submitButton.style.border = "0.5dvh solid #FF7C51";
    submitButton.style.backgroundColor = "FFFFF";
    submitButton.style.filter = "drop-shadow(0 0.5dvh #E13700)";
    const parTag = submitButton.querySelector("p");
    parTag.style.color = "#E13700";

    // Update the previous selected element in localStorage
    localStorage.setItem("PrevSelect", new_ans);
}

function submit() {
    let ans = localStorage.getItem("answerPressed");

    if (ans === "q1-a") {
        window.location.replace("question_2.html");
    } else {
        window.location.replace("question_7.html");
    };
}