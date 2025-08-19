let savedNotes = [];
const notesContainer = document.getElementById("savedNotesContentRef");
const titleInputField = document.getElementById("noteTitle");
const contentInputField = document.getElementById("noteContent");
const alertMessage = document.getElementById("alert");

const newNoteBtnEl = document.querySelector(".add_new");
const saveNoteBtnEl = document.querySelector("#saveBtn");
const deleteNoteBtnEl = document.querySelector("#deleteBtn");
const dismissAlertBtnEl = document.querySelector(".dismiss_btn");

window.addEventListener("load", renderSavedNotes);
newNoteBtnEl.addEventListener("click", createNewNote);
saveNoteBtnEl.addEventListener("click", saveNote);
deleteNoteBtnEl.addEventListener("click", deleteNote);
dismissAlertBtnEl.addEventListener("click", dismissAlert);

function createNewNote() {
  document
    .querySelectorAll(".note_card")
    .forEach((card) => card.classList.remove("note_selected"));
  getData();
  renderSavedNotes();
  clearInputField();
  saveNotesInLS();
}

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

function getData() {
  const noteTitle = titleInputField.value;
  const noteContent = contentInputField.value;
  if (noteTitle === "" || noteContent === "") {
    renderToastMessage();
    return;
  }
  const myNote = {
    noteTitle: noteTitle,
    noteBody: noteContent,
    lastUpdated: new Date().toLocaleString(),
    id: Math.random(),
  };
  savedNotes.push(myNote);
}

function editNote(noteToEdit, clickedCard) {
  document
    .querySelectorAll(".note_card")
    .forEach((card) => card.classList.remove("note_selected"));
  clickedCard.classList.add("note_selected");
  if (
    titleInputField.value === noteToEdit.noteTitle &&
    contentInputField.value === noteToEdit.noteBody
  ) {
    noteToEdit.lastUpdated = noteToEdit.lastUpdate;
  } else {
    titleInputField.value = noteToEdit.noteTitle;
    contentInputField.value = noteToEdit.noteBody;
    noteToEdit.lastUpdated = new Date().toLocaleString();
  }
  console.log("noteToEdit ID", noteToEdit.id);
  let newArray = savedNotes.filter((note) => note.id !== noteToEdit.id);
  savedNotes = newArray;
}

function deleteNote() {
  const noteToDelete = document.querySelector(".note_selected");
  noteToDelete.remove();
  const noteToDeleteTitle = titleInputField.value;
  updateLS(noteToDeleteTitle);
  console.log(noteToDeleteTitle);
  clearInputField();
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

function getNoteCardTemplate(oneNote) {
  const noteCard = document.createElement("div");
  noteCard.classList.add("note_card");
  noteCard.addEventListener("click", () => {
    editNote(oneNote, noteCard);
  });
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

function updateLS(title) {
  let updatedArray = savedNotes.filter((note) => note.noteTitle !== title);
  savedNotes = updatedArray;
  saveNotesInLS();
}

function renderToastMessage() {
  alertMessage.classList.remove("hidden");
  setTimeout(() => {
    dismissAlert();
  }, 3000);
}

function dismissAlert() {
  alertMessage.classList.add("hidden");
}
