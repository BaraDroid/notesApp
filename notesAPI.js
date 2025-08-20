function renderSavedNotes() {
  if (getNotesFromLocalStorage() !== null) {
    savedNotes = getNotesFromLocalStorage();
    notesContainer.innerHTML = "";
    let sortedSavedNotes = savedNotes.reverse();
    sortedSavedNotes.forEach((note) => renderNoteCardTemplate(note));
    savedNotes.reverse();
  }
}

function deleteNote() {
  const noteToDelete = document.querySelector(".note_selected");
  noteToDelete.remove();
  const noteToDeleteTitle = titleInputField.value;
  updateLocalStorage(noteToDeleteTitle);
  clearInputField();
}

function saveNotesInLocalStorage() {
  const notesInLocalStorage = localStorage.setItem(
    "savedNotes",
    JSON.stringify(savedNotes)
  );
  return notesInLocalStorage;
}

function getNotesFromLocalStorage() {
  const savedNotes = JSON.parse(localStorage.getItem("savedNotes"));
  return savedNotes;
}

function updateLocalStorage(title) {
  const updatedArray = savedNotes.filter((note) => note.noteTitle !== title);
  savedNotes = updatedArray;
  saveNotesInLocalStorage();
}