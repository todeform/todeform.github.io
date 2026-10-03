const table = document.getElementById("table");

for (let row = 0; row < 10; row++) {

    const tr = document.createElement("tr");

    for (let col = 0; col < 5; col++) {

        const td = document.createElement("td");
        const textarea = document.createElement("textarea");

        textarea.spellcheck = false;

        textarea.addEventListener("input", () => {
            textarea.style.height = "30px";
            textarea.style.height = textarea.scrollHeight + "px";
        });

        td.appendChild(textarea);
        tr.appendChild(td);
    }

    table.appendChild(tr);
}