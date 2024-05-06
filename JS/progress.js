

// If bounding box === done img=home2
// journey_cta href = fluid arm movement

let progress = localStorage.getItem("journeyProgress")
let homeImg = document.getElementById("home_background_img");
let journeyCta = document.getElementById("journey_cta");
let resetProgressButton = document.getElementById("resetProgress");
resetProgressButton.onclick = function() {resetProgress()};

if (progress === "compound_movement"){
    homeImg.src="../Images/home_background_5.png"
journeyCta.href="#"
}else if (progress === "exclamations") {
    homeImg.src="../Images/home_background_4.png"
    journeyCta.href="../Arm_Movement/Compound_Movement/compund_movement_intro.html"
}
else if (progress === "fluid_arm_movement") {
    homeImg.src="../Images/home_background_3.png"
    journeyCta.href="../Arm_Movement/Exclamations/exclamations_intro.html"
} else if (progress === "bounding_box"){
    homeImg.src="../Images/home_background_2.png"
    journeyCta.href="../Arm_Movement/Fluid_Arm_Movement/fluid_arm_movement_intro.html"
} else {
    homeImg.src="../Images/home_background_img.png"
    journeyCta.href="../Arm_Movement/Transitions/transition_1.html"
}

function resetProgress() {
    homeImg.src="../Images/home_background_img.png"
    journeyCta.href="../Arm_Movement/Transitions/transition_1.html"
    localStorage.setItem("journeyProgress", "");
}

