function openAddModal() {
    var modal = document.getElementById("addNoteModal");
    var closeSpan = document.getElementById("closeAdd");
    var cancelButton = document.getElementById("cancelAddNoteBtn");

    clearAddModal();
    // closeAdd (x)
    // cancelAddNoteBtn (Cancel)
    modal.style.display = "block";

    closeSpan.onclick = () => {
        modal.style.display = "none";
    }

    cancelButton.onclick = () => {
        modal.style.display = "none";
    }
}

function clearAddModal() {
    document.getElementById("addTitle").value = "";
    document.getElementById("addContent").value = "";
    document.getElementById("addError").innerHTML = "";
}

function saveNewNote() {
    const titleStr = document.getElementById("addTitle").value;
    const contentStr = document.getElementById("addContent").value;
    const noteData = { title: titleStr, content: contentStr};
    addNote(noteData)
    .then(response => {
        if (response.ok) {
            var modal = document.getElementById("addNoteModal");
            modal.style.display = "none";
            response.json().then(json => {
                var newNoteId = json["_id"];
                updateNotesTable(newNoteId);
            });
        } else {
            response.text().then(error => {
                document.getElementById("addError").innerHTML = error;
            })
        }
    })
    .catch(error => {
        console.log(error);
        document.getElementById("addError").innerHTML = error;
    })
}

function openEditModal(noteId) {
    var modal = document.getElementById("editNoteModal");
    var closeSpan = document.getElementById("closeEdit");
    var cancelButton = document.getElementById("cancelEditNoteBtn");

    clearAddModal();

    modal.style.display = "block";

    closeSpan.onclick = () => {
        modal.style.display = "none";
    }

    cancelButton.onclick = () => {
        modal.style.display = "none";
    }

    loadNoteData(noteId);
}

function loadNoteData(noteId) {
    var modal = document.getElementById("editNoteModal");
    var noteIdAttribute = document.createAttribute("noteid");
    noteIdAttribute.value = noteId;
    modal.setAttributeNode(noteIdAttribute);
    getNoteById(noteId).then(data => {
        document.getElementById("editTitle").value = data["title"];
        document.getElementById("editContent").value = data["content"];
    });
}

function saveEditNote() {
    var modal = document.getElementById("editNoteModal");
    const noteId = modal.getAttribute("noteid");
    const titleStr = document.getElementById("editTitle").value;
    const contentStr = document.getElementById("editContent").value;
    const noteData = {_id: noteId, title: titleStr, content: contentStr};
    updateNote(noteData).then(response => {
        if (response.ok) {
            var modal = document.getElementById("editNoteModal");
            modal.style.display = "none";
            updateNotesTable(noteId);
        } else {
            response.text().then(error => {
                document.getElementById("editError").innerHTML = error;
            })
        }
    })
    .catch(error => {
        document.getElementById("editError").innerHTML = error;
    }) 
}

