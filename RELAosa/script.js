// Konfiguration för varje steg: Bakgrundsbild + 4 svarsbilder
const quizSteps = [
  {
    background: "img/bg1.jpg",
    options: [
      { name: "Svar 1", img: "img/alt1.png" },
      { name: "Svar 2", img: "img/alt2.png" },
      { name: "Svar 3", img: "img/alt3.png" },
      { name: "Svar 4", img: "img/alt4.png" }
    ]
  },
  {
    background: "img/bg2.jpg",
    options: [
      { name: "Svar 1", img: "img/alt5.png" },
      { name: "Svar 2", img: "img/alt6.png" },
      { name: "Svar 3", img: "img/alt7.png" },
      { name: "Svar 4", img: "img/alt8.png" }
    ]
  },
  {
    background: "img/bg3.jpg",
    options: [
      { name: "Svar 1", img: "img/alt9.png" },
      { name: "Svar 2", img: "img/alt10.png" },
      { name: "Svar 3", img: "img/alt11.png" },
      { name: "Svar 4", img: "img/alt12.png" }
    ]
  }
];

// Den sista bakgrundsbilden (bg4) och mållänken
const finalBackground = "img/bg4.jpg";
const targetUrl = "https://downloadrela.netlify.app";

let currentStepIndex = 0;

// Element (hämtas när DOM är redo)
const pageBody = document.getElementById("page-body");
const optionsContainer = document.getElementById("options-container");
const quizView = document.getElementById("quiz-view");
const resultView = document.getElementById("result-view");

// Förladda alla bakgrunder och svarsbilder direkt så de finns i cachen
function preloadImages() {
  const imagesToLoad = [finalBackground];
  
  quizSteps.forEach(step => {
    imagesToLoad.push(step.background);
    step.options.forEach(option => {
      imagesToLoad.push(option.img);
    });
  });

  imagesToLoad.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Funktion som skickar användaren till länken när man klickar på bakgrunden
function handleBackgroundClick(e) {
  if (e.target.id === "restart-btn") return;
  window.open(targetUrl, "_blank");
}

function loadStep() {
  const bgImageElement = document.getElementById("bg-image");
  const currentStep = quizSteps[currentStepIndex];
  
  if (bgImageElement) {
    bgImageElement.src = currentStep.background;
  }

  // Ta bort klick-händelsen på bakgrunden om den var aktiv tidigare
  pageBody.classList.remove("clickable-bg");
  pageBody.removeEventListener("click", handleBackgroundClick);

  // Rensa och ladda de 4 svarsbilderna
  optionsContainer.innerHTML = "";
  
  currentStep.options.forEach((option) => {
    const imgElement = document.createElement("img");
    imgElement.src = option.img;
    imgElement.alt = option.name;
    imgElement.classList.add("image-option");

    // Använd pointerdown för direkt respons
    imgElement.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      
      imgElement.style.transform = "scale(0.92)";
      imgElement.style.filter = "brightness(1.1)";
      imgElement.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.5)";

      setTimeout(() => {
        selectOption(option.name);
      }, 150);
    });

    optionsContainer.appendChild(imgElement);
  });
}

function selectOption(selectedName) {
  currentStepIndex++;

  if (currentStepIndex < quizSteps.length) {
    loadStep();
  } else {
    showResults();
  }
}

function showResults() {
  const bgImageElement = document.getElementById("bg-image");
  
  quizView.classList.add("hidden");
  resultView.classList.remove("hidden");
  
  if (bgImageElement) {
    bgImageElement.src = finalBackground;
  }
  
  setTimeout(() => {
    pageBody.classList.add("clickable-bg");
    pageBody.addEventListener("click", handleBackgroundClick);
  }, 100);
}

function restartQuiz(e) {
  if (e) e.stopPropagation();

  currentStepIndex = 0;
  resultView.classList.add("hidden");
  quizView.classList.remove("hidden");
  loadStep();
}

// Kör förladdningen och starta första steget
preloadImages();
loadStep();