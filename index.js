let themeButton = document.getElementById("theme-button")

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode")
}

themeButton.addEventListener("click", toggleDarkMode)

let aboutButton = document.getElementById("header-button")
const moveToAbout = () => {
  window.location.href = "#aboutSec"
}
aboutButton.addEventListener("click", moveToAbout)

const validateForm = (event) => {
  let containsErrors = false;

  var emailInputs = document.getElementById("email-style").elements;
  // TODO: Loop through all inputs
  for (let i = 0; i < emailInputs.length; i++) {

    if (emailInputs[i].value.length < 1) {
      containsErrors = true;
      emailInputs[i].classList.add('error')
    }
    else {
      emailInputs[i].classList.remove('error')
    }
  }

  const email = document.getElementById("email")
  if (!email.value.includes('.com') || !email.value.includes('@')) {
    containsErrors = true;
    email.classList.add('error')
  }
  else {
    email.classList.remove('error')
  }

  // TODO: Validate the value of each input
  if (containsErrors === false) {
    console.log("success")
    for (let i = 0; i < emailInputs.length; i++) {
      emailInputs[i].value = "";
    }
    containsErrors = false
    event.target.submit()
  }

}

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease',
}

let revealableContainers = document.querySelectorAll(".revealable");

const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active')
    } else {
      revealableContainers[i].classList.remove('active')
    }
  }
}

window.addEventListener('scroll', reveal)

const motionButton = document.getElementById("motion-button")

const reduceMotion = () => {
  animation.transition = "none";
  animation.revealDistance = 0;
  animation.opacity = 1;

  for (let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.transition = animation.transition;
    revealableContainers[i].classList.add('active');
  }
}

motionButton.addEventListener('click', reduceMotion)

const videoContainers = [...document.querySelectorAll('.video-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

videoContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})


const prevSwitch = document.getElementById("prev-switch");
const nextSwitch = document.getElementById("next-switch");
const switchPoints = document.getElementById("switch-points")

const prevGoal = document.getElementById("prev-goal");
const nextGoal = document.getElementById("next-goal");
const goalPoints = document.getElementById("goal-points")

const prevPass = document.getElementById("prev-pass");
const nextPass = document.getElementById("next-pass");
const passPoints = document.getElementById("pass-points")

const displayScore = document.getElementById("score-var")
const checkbox = document.getElementById("skills")

const addScore = (points) => {
  points.value = parseInt(points.value) + 1
  updateScore()
}
const minusScore = (points) => {
  let newValue = parseInt(points.value) - 1
  if (newValue >= 0) {
    points.value = newValue
  }
  updateScore()
}

const updateScore = () => {

  let switchNum = switchPoints.value === "" ? 0 : parseInt(switchPoints.value)
  let goalNum = goalPoints.value === "" ? 0 : parseInt(goalPoints.value)
  let passNum = passPoints.value === "" ? 0 : parseInt(passPoints.value)

  let displayNum = 0

  if (checkbox.checked) {
    displayNum += switchNum

    if (switchNum === 0) {
      displayNum += goalNum
    }
    else if (switchNum === 1) {
      displayNum += goalNum * 4
    }
    else if (switchNum === 2) {
      displayNum += goalNum * 8
    }
    else if (switchNum === 3) {
      displayNum += goalNum * 10
    }
    else {
      displayNum += goalNum * 12
    }
  }
  else {
    displayNum += goalNum + switchNum;

    let modifiedPass = passNum
    if (goalNum < passNum) {
      modifiedPass = goalNum
    }
    if (switchNum === 0) {
      if (passNum <= 4) {
        displayNum += passNum
      }
      else {
        displayNum += 4
      }
    }
    else if (switchNum === 1) {
      displayNum += modifiedPass * 4
    }
    else if (switchNum === 2) {
      displayNum += modifiedPass * 8
    }
    else if (switchNum === 3) {
      displayNum += modifiedPass * 10
    }
    else {
      displayNum += modifiedPass * 12
    }
  }

  displayScore.textContent = displayNum
}

prevSwitch.addEventListener("click", () => minusScore(switchPoints))
nextSwitch.addEventListener("click", () => {
  if (parseInt(switchPoints.value) < 4) {
    addScore(switchPoints)
  }
})
prevGoal.addEventListener("click", () => minusScore(goalPoints))
nextGoal.addEventListener("click", () => addScore(goalPoints))
prevPass.addEventListener("click", () => {
  if (!checkbox.checked) {
    minusScore(passPoints)
  }
})
nextPass.addEventListener("click", () => {
  if (!checkbox.checked) {
    addScore(passPoints)
  }
})

switchPoints.addEventListener("input", updateScore)
goalPoints.addEventListener("input", updateScore)
passPoints.addEventListener("input", updateScore)
checkbox.addEventListener("input", updateScore)

const resetButton = document.getElementById("reset-score")

const resetScore = () => {
  switchPoints.value = 0
  goalPoints.value = 0
  passPoints.value = 0
  updateScore()
}
resetButton.addEventListener("click", resetScore)