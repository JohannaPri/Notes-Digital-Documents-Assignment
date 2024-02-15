//import deleteTodo from "./deleteTodo.js"
let noteList = document.getElementById("noteList");

export default function printTodos() {
    fetch("http://localhost:3000/notes")
    .then(res => res.json())
    .then(data => {
        console.log("notes", data);

        todoList.innerHTML = "";

        data.map(todo => {
            let li = document.createElement("li")
            li.innerText = todo.todo;

            li.addEventListener("click", () => {
                deleteTodo(todo.id)
            })

            todoList.appendChild(li);
        })
    })
}