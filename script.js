let savedNotes = [];
const notesContainer = document.getElementById("savedNotesContentRef");
const titleInputField = document.getElementById("noteTitle");
const contentInputField = document.getElementById("noteContent");
const alertMessage = document.getElementById("alert");

const newNoteBtnEl = document.querySelector(".add_new");
const saveNoteBtnEl = document.querySelector("#saveBtn");
const deleteNoteBtnEl = document.querySelector("#deleteBtn");
const dismissAlertBtnEl = document.querySelector(".dismiss_btn");

renderSavedNotes();
newNoteBtnEl.addEventListener("click", createNewNote);
saveNoteBtnEl.addEventListener("click", saveNote);
deleteNoteBtnEl.addEventListener("click", deleteNote);
dismissAlertBtnEl.addEventListener("click", dismissAlert);

function createNewNote() {
  document
    .querySelectorAll(".note_card")
    .forEach((card) => card.classList.remove("note_selected"));
  const noteTitle = titleInputField.value;
  const noteContent = contentInputField.value;  
  addNewNoteToList(noteTitle, noteContent);
  renderSavedNotes();
  clearInputField();
  saveNotesInLocalStorage();
}

function addNewNoteToList(title, content) {
    const myNote = {
    noteTitle: title,
    noteBody: content,
    lastUpdated: new Date().toLocaleString(),
    id: getCryptedId(),
  };
  savedNotes.push(myNote);
}

function saveNote() {
  const noteTitle = titleInputField.value;
  const noteContent = contentInputField.value;  
  if (noteTitle === "" || noteContent === "") {
    renderToastMessage();
    return;
  }
  addNewNoteToList(noteTitle, noteContent);
  let sortedNotes = savedNotes.reverse();
  notesContainer.innerHTML = "";
  sortedNotes.forEach((note) => {
    renderNoteCardTemplate(note);
  });
  savedNotes = sortedNotes.reverse();
  clearInputField();
  saveNotesInLocalStorage();
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
  let newArray = savedNotes.filter((note) => note.id !== noteToEdit.id);
  savedNotes = newArray;
}

function renderNoteCardTemplate(oneNote) {
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
  noteContent.innerText = changeFormat(oneNote.noteBody);
  const noteUpdate = document.createElement("span");
  noteUpdate.classList.add("created_at");
  noteUpdate.innerText = oneNote.lastUpdated;

  notesContainer.appendChild(noteCard);
  noteCard.appendChild(title);
  noteCard.appendChild(noteContent);
  noteCard.appendChild(noteUpdate);
}

function changeFormat(content) {
  const formattedContent = content.replace(/\n/g, ' ');
  return formattedContent;
}

function clearInputField() {
  titleInputField.value = "";
  contentInputField.value = "";
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

function getCryptedId() {
  const idArray = new Uint8Array(2);
  crypto.getRandomValues(idArray);
  const secretID = Array.from(idArray, (num) => num.toString(16).padStart(2, '0')).join('');
  return secretID;
}