const quotes = [
  "The quick brown fox jumps over the lazy dog",
  "Programming is fun when you practice daily",
  "Typing speed test helps improve productivity",
  "JavaScript makes websites interactive and dynamic"
];

let startTime, timerInterval;
const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const startBtn = document.getElementById("startBtn");
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");

// Function to start test
startBtn.addEventListener("click", () => {
  let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.innerText = randomQuote;
  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();
  resultEl.innerText = "";
  
  // Reset timer
  clearInterval(timerInterval);
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 1000);
});

// Function to update timer
function updateTimer() {
  let currentTime = new Date().getTime();
  let elapsedTime = Math.floor((currentTime - startTime) / 1000);
  timerEl.innerText = `Time: ${elapsedTime}s`;
}

// Detect when typing is finished
inputEl.addEventListener("input", () => {
  let typedText = inputEl.value;

  // When text matches (completed typing)
  if (typedText.length >= quoteEl.innerText.length) {
    clearInterval(timerInterval);
    let endTime = new Date().getTime();
    let timeTaken = Math.floor((endTime - startTime) / 1000);

    // Calculate words per minute
    let wordCount = quoteEl.innerText.split(" ").length;
    let wpm = Math.round((wordCount / timeTaken) * 60);

    // Score calculation
    let quoteWords = quoteEl.innerText.split(" ");
    let typedWords = typedText.split(" ");
    let correctCount = 0;

    for (let i = 0; i < quoteWords.length; i++) {
      if (typedWords[i] === quoteWords[i]) {
        correctCount++;
      }
    }

    let accuracy = Math.round((correctCount / quoteWords.length) * 100);
    let score = accuracy; // Score = accuracy percentage

    resultEl.innerText = `✅ Completed in ${timeTaken}s | Speed: ${wpm} WPM | Accuracy: ${accuracy}% | Score: ${score}/100`;

    inputEl.disabled = true;
  }
});
