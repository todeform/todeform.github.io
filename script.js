const notes = document.getElementById("notes");

// Load previously saved text
notes.value = localStorage.getItem("myNotes") || "";

// Save whenever the text changes
notes.addEventListener("input", () => {
    localStorage.setItem("myNotes", notes.value);
});
