const noteTitle = document.getElementById('noteTitle').value;
const noteContent = document.getElementById('noteContent').value;

const myNote = {
    noticeTitle: noteTitle,
    noticeBody: noteContent,
    lastUpdated: 'timestamp',
    id: ''
}

let savedNotes = []; //das macht ja LS für mich, das kann ich löschen

function renderSavedNotes() {
//für jeder item aus savedNotes eine Karte rendern
}

function renderNoteCard() {

}

function saveNoteInLS() {

}

function getNoteFromLS() {

}

function deleteNote() {
    //hier wird auch aus LS deleted, gehört ja zusammen
}

function editNote() {

}

function saveEditedNote() {

}

function getTimestamp() {

}

function validateNoteForm() {
    //gibt eine Toastmessage aus, falls ein required Field leer wird
}