
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const count = document.getElementById("count");

let todos = [];
 
addBtn.onclick = function () {
    if (input.value.trim() === "") return;

    todos.push({
        text: input.value,
        done: false
    });

    input.value = "";
    saveTodos();
    showTodos();
};
 
function showTodos() {
    taskList.innerHTML = "";

    todos.forEach(function (todo, index) {

        const task = document.createElement("div");
        task.className = "task";

        if (todo.done) {
            task.classList.add("completed");
        }

        task.innerHTML = `
            <input type="checkbox" ${todo.done ? "checked" : ""}>
            <span>${todo.text}</span>
            <button class="delete">✕</button>
        `;

        // Complete task
        task.querySelector("input").onclick = function () {
            todo.done = !todo.done;
            saveTodos();
            showTodos();
        };

        // Delete task
        task.querySelector(".delete").onclick = function () {
            todos.splice(index, 1);
            saveTodos();
            showTodos();
        };

        taskList.appendChild(task);
    });

    const completed = todos.filter(todo => todo.done).length;
    count.innerText = `${completed}/${todos.length} completed`;
}
 
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

 
todos = JSON.parse(localStorage.getItem("todos")) || [];

showTodos();
