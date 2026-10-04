function addRow() {
    const table = document.getElementById("table");

    const row = document.createElement("div");
    row.className = "row";

    row.innerHTML = `
        <div class="color-picker">
            <button class="circle" type="button" aria-label="Change color"></button>

            <div class="color-menu">
                <button class="color-option" data-color="#272840">
                    <span class="color-dot" style="background: #272840;"></span>
                    <span>Unfinished</span>
                </button>

                <button class="color-option" data-color="#4caf50">
                    <span class="color-dot" style="background: #4caf50;"></span>
                    <span>Independent</span>
                </button>

                <button class="color-option" data-color="#ff9800">
                    <span class="color-dot" style="background: #ff9800;"></span>
                    <span>Hints</span>
                </button>

                <button class="color-option" data-color="#f32121">
                    <span class="color-dot" style="background: #f32121;"></span>
                    <span>Solution</span>
                </button>
            </div>
        </div>

        <a class="digit-text link" href="#">12345678901</a>
        <span class="digit-text">123</span>
        <span class="digit-text">12345678901234567890</span>
        <span class="digit-text">1234567890123456789012345678901234567890</span>
    `;

    table.appendChild(row);

    setupColorPicker(row);
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