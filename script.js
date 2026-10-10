
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const fields = ["name", "email", "subject", "message"];

function showError(id, message) {
    document.getElementById(id + "Error").textContent = message;
    document.getElementById(id).classList.toggle("invalid", !!message);
}

// Contact form validation
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formMessage.textContent = "";
    formMessage.className = "form-message";

    let valid = true;

    fields.forEach(function (id) {
        const input = document.getElementById(id);
        const value = input.value.trim();
        let error = "";

        if (!value) {
            error = "This field is required.";
        } else if (id === "email" &&
                   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = "Please enter a valid email address.";
        }

        showError(id, error);

        if (error) valid = false;
    });

    if (!valid) {
        formMessage.textContent = "Please correct the highlighted fields.";
        formMessage.classList.add("failure");
        return;
    }

    formMessage.textContent =
        "✓ Validation successful! This demo does not send your message.";
    formMessage.classList.add("success");

    contactForm.reset();

    fields.forEach(function (id) {
        showError(id, "");
    });
});

// Clear field errors while the user edits
fields.forEach(function (id) {
    const input = document.getElementById(id);

    input.addEventListener("input", function () {
        showError(id, "");
    });

    input.addEventListener("change", function () {
        showError(id, "");
    });
});

// To-do list
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const emptyState = document.getElementById("emptyState");
const clearCompleted = document.getElementById("clearCompleted");

let tasks = [];
let nextId = 1;

function updateTasks() {
    const remaining = tasks.filter(task => !task.completed).length;
    const total = tasks.length;

    taskCounter.textContent =
        `${remaining} ${remaining === 1 ? "task" : "tasks"} remaining`;

    emptyState.hidden = total > 0;
    clearCompleted.hidden = !tasks.some(task => task.completed);
}

function renderTasks() {
    taskList.replaceChildren();

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) li.classList.add("completed");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-check";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", "Mark task complete");

        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            renderTasks();
        });

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;

        const completeButton = document.createElement("button");
        completeButton.type = "button";
        completeButton.className = "task-action complete-btn";
        completeButton.textContent =
            task.completed ? "✓ Completed" : "✓ Complete";

        completeButton.addEventListener("click", function () {
            task.completed = !task.completed;
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "task-action delete-btn";
        deleteButton.textContent = "✕";
        deleteButton.setAttribute("aria-label", "Delete task");

        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter(item => item.id !== task.id);
            renderTasks();
        });

        li.append(checkbox, text, completeButton, deleteButton);
        taskList.appendChild(li);
    });

    updateTasks();
}

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({
        id: nextId++,
        text: text,
        completed: false
    });

    taskInput.value = "";
    renderTasks();
    taskInput.focus();
});

clearCompleted.addEventListener("click", function () {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
});

// Light and dark mode
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {
    const dark = document.body.classList.toggle("dark");

    themeToggle.textContent = dark ? "☀" : "☾";
    themeToggle.setAttribute(
        "aria-label",
        dark ? "Switch to light theme" : "Switch to dark theme"
    );
    themeToggle.title = dark ? "Light mode" : "Dark mode";
});

// Initial display
renderTasks();