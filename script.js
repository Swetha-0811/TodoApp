// Login validation
function validateLogin(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    if (!name || !contact || !password || !confirm) {
        alert("Please fill in all fields!");
        return false;
    }

    if (password !== confirm) {
        alert("Passwords do not match!");
        return false;
    }

    localStorage.setItem("user", JSON.stringify({ name, contact }));
    window.location.href = "todo.html";
    return true;
}

// Add new task
function addTodo() {
    let input = document.getElementById('todo-input');
    let todoText = input.value.trim().replace(/\n/g, ' '); // ✅ Remove newlines

    if (todoText === "") {
        alert("Please enter a task!");
        return;
    }

    createTodoElement(todoText, false);
    saveTodoToStorage(todoText, false);
    input.value = "";
}

// Create a task element
function createTodoElement(text, completed) {
    const list = document.getElementById('todo-list');

    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;

    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = text; // ✅ This ensures it appears as one line

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'Delete';

    checkbox.addEventListener('change', updateLocalStorage);
    delBtn.addEventListener('click', () => {
        list.removeChild(li);
        updateLocalStorage();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
}


// Save all tasks
function updateLocalStorage() {
    const todos = [];
    const items = document.querySelectorAll('#todo-list li');
    items.forEach(item => {
        const text = item.querySelector('.text').textContent;
        const checked = item.querySelector('input[type="checkbox"]').checked;
        todos.push({ text, completed: checked });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Save new task
function saveTodoToStorage(text, completed) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push({ text, completed });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Load tasks from storage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => {
        createTodoElement(todo.text, todo.completed);
    });
}

// Run when on todo.html
if (window.location.pathname.includes("todo.html")) {
    document.addEventListener("DOMContentLoaded", loadTodos);
}


function showUserName() {
    const user = JSON.parse(localStorage.getItem("user"));
    const nameBox = document.getElementById("username");
    if (user && user.name) {
        nameBox.textContent = `Helloo!! ${user.name}..`;
    }
}

if (window.location.pathname.includes("todo.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        loadTodos();
        showUserName();
    });
}

function logout() {
    localStorage.removeItem("user"); // clear login user data
    window.location.href = "login.html"; // redirect to login page
}

