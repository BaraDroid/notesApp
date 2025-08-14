let savedNotes = [];
const notesContainer = document.getElementById("savedNotesContentRef");

window.addEventListener("load", renderSavedNotes);

function saveNote() {
  getData();
  let sortedNotes = savedNotes.reverse();
  notesContainer.innerHTML = "";
  sortedNotes.forEach((note) => {
    getNoteCardTemplate(note);
  });
  savedNotes = sortedNotes.reverse();
  clearInputField();
  saveNotesInLS();
}

function renderSavedNotes() {
  if (getNotesFromLS() !== null) {
    savedNotes = getNotesFromLS();
    notesContainer.innerHTML = "";
    let sortedSavedNotes = savedNotes.reverse();
    sortedSavedNotes.forEach((note) => getNoteCardTemplate(note));
    savedNotes.reverse();
  }
}

function getData() {
  const noteTitle = document.getElementById("noteTitle").value;
  const noteContent = document.getElementById("noteContent").value;

  const myNote = {
    noteTitle: noteTitle,
    noteBody: noteContent,
    lastUpdated: new Date().toLocaleString(),
    id: "",
  };
  savedNotes.push(myNote);
}

function getNoteCardTemplate(oneNote) {
  const noteCard = document.createElement("div");
  noteCard.classList.add("note_card");
  const title = document.createElement("span");
  title.classList.add("note_title");
  title.innerText = oneNote.noteTitle;
  const noteContent = document.createElement("span");
  noteContent.classList.add("note_content");
  noteContent.innerText = oneNote.noteBody;
  const noteUpdate = document.createElement("span");
  noteUpdate.classList.add("created_at");
  noteUpdate.innerText = oneNote.lastUpdated;

  notesContainer.appendChild(noteCard);
  noteCard.appendChild(title);
  noteCard.appendChild(noteContent);
  noteCard.appendChild(noteUpdate);
}

function clearInputField() {
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteContent").value = "";
}

function saveNotesInLS() {
  let notesInLocalStorage = localStorage.setItem(
    "savedNotes",
    JSON.stringify(savedNotes)
  );
  return notesInLocalStorage;
}

function getNotesFromLS() {
  let savedNotes = JSON.parse(localStorage.getItem("savedNotes"));
  return savedNotes;
}

function deleteNote() {
  //hier wird auch aus LS deleted, gehört ja zusammen
}

function editNote(noteId) {
  const savedNote = {
    savedNoteTitle: "",
    savedNoteContent: "",
  };
}

function saveEditedNote() {}

function getTimestamp() {}

function validateNoteForm() {
  //gibt eine Toastmessage aus, falls ein required Field leer wird
}

function renderToastMessage() {}
