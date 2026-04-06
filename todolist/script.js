// Auth Check
const currentUserId = sessionStorage.getItem('currentUserId');
if (!currentUserId) {
    window.location.href = 'login.html';
}

// User-scoped data
const storageKey = `tasks_${currentUserId}`;
let tasks = JSON.parse(localStorage.getItem(storageKey)) || [];

// Username Display
const userNameDisplay = document.getElementById('userNameDisplay');
if (userNameDisplay) userNameDisplay.textContent = `(@${currentUserId})`;

// Theme Logic
const themeKey = `theme_${currentUserId}`;
let isLightTheme = localStorage.getItem(themeKey) === 'light';
if (isLightTheme) document.body.classList.add('light-theme');

const themeToggleBtn = document.getElementById('themeToggle');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        isLightTheme = !isLightTheme;
        if (isLightTheme) {
            document.body.classList.add('light-theme');
            localStorage.setItem(themeKey, 'light');
        } else {
            document.body.classList.remove('light-theme');
            localStorage.setItem(themeKey, 'dark');
        }
    });
}

function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUserId');
    window.location.href = 'login.html';
}

const input = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const table = document.getElementById("taskTable");
const addBtn = document.getElementById("addBtn");

// ---------- RENDER ----------

function renderTasks() {
  table.innerHTML = "";

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>

      <td>${task.text}</td>

      <td class="status">
        <input type="checkbox" ${task.status === "Done" ? "checked" : ""}>
        <span class="${task.status === "Done" ? "done" : "pending"}">
          ${task.status}
        </span>
      </td>

      <td>
        <select class="prioritySelect">
          <option value="Low" ${task.priority === "Low" ? "selected" : ""}>Low</option>
          <option value="Medium" ${task.priority === "Medium" ? "selected" : ""}>Medium</option>
          <option value="High" ${task.priority === "High" ? "selected" : ""}>High</option>
        </select>
      </td>

      <td>
        <button class="deleteBtn">❌</button>
      </td>
    `;

    // ✅ Checkbox event
    const checkbox = row.querySelector("input");
    checkbox.addEventListener("change", () => {
      tasks[index].status =
        tasks[index].status === "Pending" ? "Done" : "Pending";
      renderTasks();
    });

    // ✅ Priority change event
    const prioritySelect = row.querySelector(".prioritySelect");
    prioritySelect.addEventListener("change", (e) => {
      tasks[index].priority = e.target.value;
      localStorage.setItem(storageKey, JSON.stringify(tasks));
    });

    // ✅ Delete event
    const deleteBtn = row.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    table.appendChild(row);
  });

  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

// ---------- ADD ----------
addBtn.onclick = () => {
  const text = input.value.trim();

  if (text === "") return;

  tasks.push({
    text,
    status: "Pending",
    priority: "Medium" // default
  });

  input.value = "";
  renderTasks();
};

// ---------- TOGGLE STATUS ----------
function toggleStatus(index) {
  tasks[index].status =
    tasks[index].status === "Pending" ? "Done" : "Pending";

  renderTasks();
}

// ---------- DELETE ----------
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// ---------- INIT ----------
renderTasks();