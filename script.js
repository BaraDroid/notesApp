let savedNotes = [];

window.addEventListener('load', renderSavedNotes);

function saveNote() {
    renderNoteCard(getData());
    clearInputField();
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
  return myNote;
}

function renderSavedNotes() {
  let currentSavedNotes = getNotesFromLS();
  currentSavedNotes.forEach(note => renderNoteCard(note));
}

function renderNoteCard(oneNote) {
    const notesContainer = document.getElementById("savedNotes");
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

    saveNoteInLS(oneNote);
}

function clearInputField() {
    document.getElementById("noteTitle").value = '';
    document.getElementById("noteContent").value = '';
}

function saveNoteInLS(note) {
    savedNotes.push(note);
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
}

function getNotesFromLS() {
    let savedNotes = JSON.parse(localStorage.getItem('savedNotes'));
    return savedNotes;
}

function deleteNote() {
  //hier wird auch aus LS deleted, gehört ja zusammen
}

function editNote(noteId) {
    const savedNote = {
        savedNoteTitle: '',
        savedNoteContent: ''
    }
    
}

function saveEditedNote() {}

function getTimestamp() {}

function validateNoteForm() {
  //gibt eine Toastmessage aus, falls ein required Field leer wird
}

function renderToastMessage() {}
