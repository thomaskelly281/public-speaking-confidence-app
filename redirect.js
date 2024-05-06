
const protoButton = document.getElementById("prototype_button");
protoButton.onclick = function() {prototype()};

const caseStudyButton = document.getElementById("case_study_button");
caseStudyButton.onclick = function() {prototype()};

function prototype () {
window.open('https://recite.space/Prototype/Main/index.html', '_blank') || window.location.replace("Prototype/Main/index.html");
}

function caseStudy () {
    // window.location.href = "";
    alert("Case Study coming soon");
}