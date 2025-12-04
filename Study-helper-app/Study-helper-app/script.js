// Flashcards
let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

function addFlashcard() {
  const term = document.getElementById("term").value;
  const definition = document.getElementById("definition").value;

  if (term && definition) {
    flashcards.push({ term, definition, mastered: false });
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
    updateProgress();
    alert("Flashcard added!");
  }
}

function showFlashcard() {
  if (flashcards.length === 0) {
    alert("No flashcards yet!");
    return;
  }
  const random = flashcards[Math.floor(Math.random() * flashcards.length)];
  const colors = ["#FF5733", "#33B5FF", "#9C33FF", "#33FF57", "#FFC300"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const card = document.getElementById("flashcard");
  card.style.background = randomColor;
  card.innerHTML = `<strong>${random.term}</strong><br>${random.definition}`;
}

function updateProgress() {
  const mastered = flashcards.filter(c => c.mastered).length;
  document.getElementById("progress").innerText =
    `Progress: ${mastered}/${flashcards.length} mastered`;
}

// Timer
let timerInterval;
function startTimer(minutes) {
  clearInterval(timerInterval);
  let time = minutes * 60;
  timerInterval = setInterval(() => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    document.getElementById("timer").innerText = `${min}:${sec < 10 ? "0" : ""}${sec}`;
    if (time-- <= 0) {
      clearInterval(timerInterval);
      alert("Time's up!");
    }
  }, 1000);
}

// Notes
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNote() {
  const note = document.getElementById("noteInput").value;
  if (note) {
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
  }
}

function renderNotes() {
  const list = document.getElementById("notesList");
  if (!list) return;
  list.innerHTML = "";
  notes.forEach(n => {
    const li = document.createElement("li");
    li.textContent = n;
    list.appendChild(li);
  });
}

function searchNotes() {
  const query = document.getElementById("searchNote").value.toLowerCase();
  const list = document.getElementById("notesList");
  list.innerHTML = "";
  notes.filter(n => n.toLowerCase().includes(query)).forEach(n => {
    const li = document.createElement("li");
    li.textContent = n;
    list.appendChild(li);
  });
}

renderNotes();

// Quotes
function getQuote() {
  fetch("https://api.quotable.io/random")
    .then(res => res.json())
    .then(data => {
      document.getElementById("quote").innerText = `"${data.content}" — ${data.author}`;
    })
    .catch(() => {
      document.getElementById("quote").innerText = "Stay motivated!";
    });
}