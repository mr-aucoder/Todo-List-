const todoform = document.querySelector('form');
const todoinput = document.getElementById('todo-input');
const todolistUL = document.getElementById('todo-list');

let alltodos = getTodos();
updateTodoList();

// Event listener for the form submission
todoform.addEventListener('submit', function (e) {
    e.preventDefault();
    addTodo();
});

// Function to add a new todo item
function addTodo() {
    const todoText = todoinput.value.trim(); 
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        };

        // Push the todoObject instead of just the text
        alltodos.push(todoObject);
        updateTodoList();
        savetodos();
        todoinput.value = "";
    }
}

// Function to update the todo list
function updateTodoList() {
    todolistUL.innerHTML = "";
    alltodos.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex);
        todolistUL.append(todoItem);
    });
}

// Function to create a todo item element
function createTodoItem(todo, todoIndex) {
        const todoId = "todo-" + todoIndex;
    const isChecked = todo.completed ? 'checked' : '';
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo";

    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}" ${isChecked}>
        <label for="${todoId}" class="custom-checkbox">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label for="${todoId}" class="todo-text">
            ${todoText}
        </label>
        <button class="delete-button">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>
        </button>
    `;

    // Delete button functionality
        const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        deleteTodoItem(todoIndex);
    });

    // Checkbox functionality
        const checkbox = todoLI.querySelector("input[type='checkbox']");
        checkbox.addEventListener("change", () => {
        alltodos[todoIndex].completed = checkbox.checked;
        savetodos();
        updateTodoList(); // Re-render to apply completed state
    });

    return todoLI;
}

// Function to delete a todo item
function deleteTodoItem(todoIndex) {
    alltodos = alltodos.filter((_, i) => i !== todoIndex);
    savetodos();
    updateTodoList();
}

// Function to save todos to local storage
function savetodos() {
    const todosJson = JSON.stringify(alltodos);
    localStorage.setItem("todos", todosJson);
}

// Function to retrieve todos from local storage
function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}
