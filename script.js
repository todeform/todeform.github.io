const notes = document.getElementById("notes");

// Load saved text
notes.value = localStorage.getItem("myNotes") || "";

// Save text whenever it changes
notes.addEventListener("input", () => {
    localStorage.setItem("myNotes", notes.value);
});
