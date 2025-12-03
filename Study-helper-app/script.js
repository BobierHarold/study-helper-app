// Register Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registered"))
    .catch(err => console.error("Service Worker failed:", err));
}

// Flashcards
let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

function addFlashcard() {
  const term = document.getElementById("term").value;
  const definition = document.getElementById("definition").value;
  flashcards.push({ term, definition });
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
  alert("Flashcard added!");
}

function showFlashcard() {
  if (flashcards.length === 0) {
    document.getElementById("flashcard").innerText = "No flashcards yet!";
    return;
  }
  const card = flashcards[Math.floor(Math.random() * flashcards.length)];
  document.getElementById("flashcard").innerHTML = `<b>${card.term}</b>: ${card.definition}`;
}

// Timer
let timerInterval;
function startTimer(minutes) {
  clearInterval(timerInterval);
  let time = minutes * 60;
  timerInterval = setInterval(() => {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    document.getElementById("timer").innerText = `${min}:${sec < 10 ? "0" : ""}${sec}`;
    if (time <= 0) {
    clearInterval(timerInterval);
    alert("Time's up!");
    }
    time--;
}, 1000);
}

// Notes
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNote() {
const note = document.getElementById("noteInput").value;
notes.push(note);
localStorage.setItem("notes", JSON.stringify(notes));
displayNotes();
}

function displayNotes() {
document.getElementById("notes").innerHTML = notes.map(n => `<p>${n}</p>`).join("");
}
displayNotes();

// Daily Quote
async function getQuote() {
const response = await fetch("https://api.quotable.io/random");
const data = await response.json();
document.getElementById("quote").innerText = `"${data.content}" — ${data.author}`;
}