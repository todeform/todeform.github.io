function addRow() {
    const table = document.getElementById("table");

    const row = document.createElement("div");
    row.className = "row";

    row.innerHTML = `
        <div class="color-picker">
            <button class="circle" type="button" aria-label="Change color"></button>

            <div class="color-menu">
                <button class="color-option" data-color="#4caf50">
                    <span class="color-dot" style="background: #4caf50;"></span>
                    <span>Green</span>
                </button>

                <button class="color-option" data-color="#e53935">
                    <span class="color-dot" style="background: #e53935;"></span>
                    <span>Red</span>
                </button>

                <button class="color-option" data-color="#2196f3">
                    <span class="color-dot" style="background: #2196f3;"></span>
                    <span>Blue</span>
                </button>

                <button class="color-option" data-color="#ff9800">
                    <span class="color-dot" style="background: #ff9800;"></span>
                    <span>Orange</span>
                </button>

                <button class="color-option" data-color="#9c27b0">
                    <span class="color-dot" style="background: #9c27b0;"></span>
                    <span>Purple</span>
                </button>

                <button class="color-option" data-color="#f1f0ff">
                    <span class="color-dot" style="background: #f1f0ff;"></span>
                    <span>White</span>
                </button>
            </div>
        </div>

        <!-- Column 2 -->
        <div class="column-wrapper">
            <a class="digit-text link" href="#">12345678901</a>

            <div class="edit-menu link-editor">
                <input class="link-text-input" type="text" placeholder="Text to display">
                <input class="link-url-input" type="text" placeholder="Link">
            </div>
        </div>

        <!-- Column 3 -->
        <div class="column-wrapper">
            <span class="digit-text number-text">123</span>

            <div class="edit-menu number-editor">
                <button class="set-zero">Set to 0</button>
                <input class="number-input" type="text" inputmode="numeric" placeholder="Add number">
            </div>
        </div>

        <!-- Column 4 -->
        <div class="column-wrapper">
            <span class="digit-text checklist-text">
                12345678901234567890
            </span>

            <div class="edit-menu checklist-editor">
                <div class="checklist">
                    <label>
                        <input type="checkbox" value="Easy">
                        Easy
                    </label>

                    <label>
                        <input type="checkbox" value="Medium">
                        Medium
                    </label>

                    <label>
                        <input type="checkbox" value="Hard">
                        Hard
                    </label>

                    <label>
                        <input type="checkbox" value="Gold">
                        Gold
                    </label>
                </div>
            </div>
        </div>

        <!-- Column 5 -->
        <div class="column-wrapper">
            <span class="digit-text bullet-text">
                1234567890123456789012345678901234567890
            </span>

            <div class="edit-menu bullet-editor">
                <input class="bullet-input" type="text" placeholder="Add a bullet">
            </div>
        </div>

        <!-- Edit button -->
        <button class="edit-button" type="button">
            <img src="images/edit.png" alt="Edit">
        </button>
    `;

    table.appendChild(row);

    setupColorPicker(row);
    setupRowEditor(row);
}

function removeRow() {
    const table = document.getElementById("table");

    if (table.lastElementChild) {
        table.removeChild(table.lastElementChild);
    }
}

function setupColorPicker(row) {
    const picker = row.querySelector(".color-picker");
    const circle = row.querySelector(".circle");
    const menu = row.querySelector(".color-menu");
    const options = row.querySelectorAll(".color-option");

    circle.addEventListener("click", () => {
        menu.classList.toggle("show");
    });

    options.forEach(option => {
        option.addEventListener("click", () => {
            circle.style.backgroundColor = option.dataset.color;
            menu.classList.remove("show");
        });
    });
}

document.addEventListener("click", (event) => {
    document.querySelectorAll(".color-menu.show").forEach(menu => {
        const picker = menu.closest(".color-picker");

        if (!picker.contains(event.target)) {
            menu.classList.remove("show");
        }
    });
});

function setupRowEditor(row) {
    const editButton = row.querySelector(".edit-button");

    const link = row.querySelector(".link");
    const numberText = row.querySelector(".number-text");
    const checklistText = row.querySelector(".checklist-text");
    const bulletText = row.querySelector(".bullet-text");

    const linkEditor = row.querySelector(".link-editor");
    const numberEditor = row.querySelector(".number-editor");
    const checklistEditor = row.querySelector(".checklist-editor");
    const bulletEditor = row.querySelector(".bullet-editor");

    const linkTextInput = row.querySelector(".link-text-input");
    const linkUrlInput = row.querySelector(".link-url-input");

    const numberInput = row.querySelector(".number-input");
    const setZeroButton = row.querySelector(".set-zero");

    const checklist = row.querySelectorAll(
        ".checklist input[type='checkbox']"
    );

    const bulletInput = row.querySelector(".bullet-input");


    function closeEditors() {
        linkEditor.classList.remove("show");
        numberEditor.classList.remove("show");
        checklistEditor.classList.remove("show");
        bulletEditor.classList.remove("show");
    }


    function startEditing() {
        // Stop any other row from editing
        document.querySelectorAll(".edit-button.editing").forEach(otherButton => {
            if (otherButton !== editButton) {
                otherButton.classList.remove("editing");

                otherButton.innerHTML = `
                    <img src="images/edit.png" alt="Edit">
                `;

                const otherRow = otherButton.closest(".row");

                if (otherRow) {
                    otherRow.querySelectorAll(".edit-menu").forEach(menu => {
                        menu.classList.remove("show");
                    });
                }
            }
        });

        editButton.classList.add("editing");

        editButton.innerHTML = `
            <img src="images/checkmark.png" alt="Done">
        `;

        editButton.setAttribute("aria-label", "Finish editing");
    }


    function stopEditing() {
        closeEditors();

        editButton.classList.remove("editing");

        editButton.innerHTML = `
            <img src="images/edit.png" alt="Edit">
        `;

        editButton.setAttribute("aria-label", "Edit");
    }


    editButton.addEventListener("click", event => {
        event.stopPropagation();

        if (editButton.classList.contains("editing")) {
            stopEditing();
        } else {
            startEditing();
        }
    });


    /* =========================
       COLUMN 2 — LINK
       ========================= */

    link.addEventListener("click", event => {
        if (!editButton.classList.contains("editing")) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        closeEditors();

        linkTextInput.value = link.textContent;
        linkUrlInput.value = link.getAttribute("href") || "";

        linkEditor.classList.add("show");

        linkTextInput.focus();
    });


    function saveLink() {
        const displayText = linkTextInput.value.trim();
        const url = linkUrlInput.value.trim();

        if (displayText === "") {
            return;
        }

        link.textContent = displayText;

        if (url === "") {
            // No link → plain text
            link.removeAttribute("href");
            link.style.cursor = "default";
        } else {
            // Has a link
            link.setAttribute("href", url);
            link.style.cursor = "pointer";
        }

        linkEditor.classList.remove("show");
    }


    linkEditor.addEventListener("click", event => {
        event.stopPropagation();
    });

    linkTextInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            saveLink();
        }
    });

    linkUrlInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            saveLink();
        }
    });


    /* =========================
       COLUMN 3 — NUMBER
       ========================= */

    numberText.addEventListener("click", event => {
        if (!editButton.classList.contains("editing")) {
            return;
        }

        event.stopPropagation();

        closeEditors();

        numberInput.value = "";
        numberEditor.classList.add("show");

        numberInput.focus();
    });


    setZeroButton.addEventListener("click", event => {
        event.stopPropagation();

        numberText.textContent = "0";
        numberEditor.classList.remove("show");
    });


    numberInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            addNumber();
        }
    });


    function addNumber() {
        const amount = numberInput.value;

        if (!/^\d+$/.test(amount)) {
            return;
        }

        const current = parseInt(numberText.textContent) || 0;
        const added = parseInt(amount);

        numberText.textContent = current + added;

        numberInput.value = "";
        numberEditor.classList.remove("show");
    }


    /* =========================
       COLUMN 4 — CHECKLIST
       ========================= */

    checklistText.addEventListener("click", event => {
        if (!editButton.classList.contains("editing")) {
            return;
        }

        event.stopPropagation();

        closeEditors();

        const currentItems = checklistText.textContent
            .split(",")
            .map(item => item.trim())
            .filter(item => item !== "");

        checklist.forEach(box => {
            box.checked = currentItems.includes(box.value);
        });

        checklistEditor.classList.add("show");
    });


    checklist.forEach(box => {
        box.addEventListener("change", () => {
            const selected = Array.from(checklist)
                .filter(box => box.checked)
                .map(box => box.value);

            checklistText.textContent = selected.join(", ");
        });
    });


    checklistEditor.addEventListener("click", event => {
        event.stopPropagation();
    });


    /* =========================
       COLUMN 5 — BULLETS
       ========================= */

    bulletText.addEventListener("click", event => {
        if (!editButton.classList.contains("editing")) {
            return;
        }

        event.stopPropagation();

        closeEditors();

        bulletInput.value = "";
        bulletEditor.classList.add("show");

        bulletInput.focus();
    });


    bulletInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            addBullet();
        }
    });


    function addBullet() {
        const text = bulletInput.value.trim();

        if (text === "") {
            return;
        }

        if (bulletText.textContent.trim() === "") {
            bulletText.textContent = "-- " + text;
        } else {
            bulletText.textContent += "\n-- " + text;
        }

        bulletInput.value = "";
        bulletEditor.classList.remove("show");
    }


    bulletEditor.addEventListener("click", event => {
        event.stopPropagation();
    });


    /* =========================
       CLICK OUTSIDE
       ========================= */

    document.addEventListener("click", event => {
        if (!row.contains(event.target)) {
            return;
        }

        if (
            !linkEditor.contains(event.target) &&
            !numberEditor.contains(event.target) &&
            !checklistEditor.contains(event.target) &&
            !bulletEditor.contains(event.target)
        ) {
            closeEditors();
        }
    });
}