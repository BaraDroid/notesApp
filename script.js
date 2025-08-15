let savedNotes = [];
const notesContainer = document.getElementById("savedNotesContentRef");
const titleInputField = document.getElementById("noteTitle");
const contentInputField = document.getElementById("noteContent");

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
  const noteTitle = titleInputField.value;
  const noteContent = contentInputField.value;

  const myNote = {
    noteTitle: noteTitle,
    noteBody: noteContent,
    lastUpdated: new Date().toLocaleString(),
    id: Math.random(),
  };
  savedNotes.push(myNote);
}

function getNoteCardTemplate(oneNote) {
  const noteCard = document.createElement("div");
  noteCard.classList.add("note_card");
  noteCard.addEventListener('click', () => {editNote(oneNote, noteCard)});
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
  titleInputField.value = "";
  contentInputField.value = "";
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

function editNote(noteToEdit, clickedCard) {
    clickedCard.classList.add("note_selected");
    titleInputField.value = noteToEdit.noteTitle;
    contentInputField.value = noteToEdit.noteBody;
    noteToEdit.lastUpdated = new Date().toLocaleString(); 
    let newArray = savedNotes.filter(note => note.id !== noteToEdit.id);
    savedNotes = newArray;
}

function validateNoteForm() {
  //gibt eine Toastmessage aus, falls ein required Field leer wird
}

function renderToastMessage() {}
